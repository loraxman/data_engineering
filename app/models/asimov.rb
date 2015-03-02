class Asimov
  def self.run_scripts
    retstr = ""
    sqls = ["select pgasimov_drop_foreign_keys()", "select pgasimov_drop_business_keys();",
      
      "select pgasimov_drop_primary_keys();",
      
      "select pgasimov_create_primary_keys();",
      
      "select pgasimov_create_business_keys();",
      
     " select pgasimov_create_foreign_keys();",
      
     " select pgasimov_create_staging_tables();",
      
     " select pgasimov_create_current_normalized_views();",
      
    "  select pgasimov_create_historical_normalized_views();",
      
    "  select pgasimov_create_load_hub_procs();"]
    conn = PG.connect( dbname: 'HAL' )
    conn.set_notice_processor{|r| retstr += r}
      
    sqls.each do |sql| 
      conn.exec( sql ) do |result|
      result.each do |row|
        puts row
        end
      end
    end
    retstr.split("\n")
  end
  
  
 def graph_topic(topic,dbnamein)
   
   case topic
   when "physical"
     classifiers = "('l_','s_','h_')"
     modelname="physical"
   when "logical" 
     classifiers = "('vc','vh')"
     modelname="logical"
   when "all"
     classifiers = "ALL"
     modelname = 'all'
   end
   @tabs = {}
   @fkeys = {}
   conn = PG.connect( dbname: dbnamein )
   if classifiers == "ALL"
     tabsql = "select table_name from information_schema.tables where table_catalog = '#{dbnamein}' and table_schema = 'vault' and substring(table_name,1,2) != 'pg'  "
   else
     tabsql = "select table_name from information_schema.tables where table_catalog = '#{dbnamein}' and table_schema = 'vault' and substring(table_name,1,2)  IN #{classifiers} "
   end
   conn.exec( tabsql ) do |result|
   result.each do |row|
     @tabs [row['table_name']] = []
      end
   end
 
   @tabs.each do | tab,v | 
     puts tab
     
    colsql = "select column_name from information_schema.columns where table_catalog = '#{dbnamein}' and table_schema = 'vault' and table_name = '#{tab}' order by ordinal_position"
    puts colsql
    conn.exec( colsql ) do |result|
    result.each do |row|
      @tabs[tab] << row['column_name']
      end
    end
    @fkeys[tab] = []
    fksql = 
      "SELECT distinct
          
          ccu.table_name AS foreign_table_name
         
      FROM 
          information_schema.table_constraints AS tc 
          JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
          JOIN information_schema.constraint_column_usage AS ccu
            ON ccu.constraint_name = tc.constraint_name
      WHERE constraint_type = 'FOREIGN KEY' AND tc.table_name='#{tab}';"
    conn.exec( fksql ) do |result|
      puts fksql
    result.each do |row|
      puts row.inspect
      @fkeys[tab] << row['foreign_table_name']
      end
    end

   end
   

  av = ActionView::Base.new()
  av.view_paths = ActionController::Base.view_paths
  av.extend ApplicationHelper #or any other helpers your template may need
  body = av.render(:template => "asimov/graphviz.erb", :locals => {:tabs => @tabs,:fkeys=>@fkeys})
  t =  File.new("/tmp/model.viz","w")
  t.write body
  t.close()
  cmd = "dot -Tpng /tmp/model.viz -o #{Rails.root}/public/assets/images/#{modelname}.png"
  system(cmd)

 end
 
 def create_graph_for_db(dbname)
   graph_topic("physical",dbname)
   t = File.new("/tmp/model.viz")
   content = t.read
   t.close
   t = File.new("/tmp/phys.viz","w")
   t.write content
   t.close
   graph_topic("logical",dbname)
 end
 
 def create_graph_for_db2
   @tabs = {}
   @fkeys = {}
   conn = PG.connect( dbname: 'Asimov' )
   tabsql = "select table_name from information_schema.tables where table_catalog = 'Asimov' and table_schema = 'public' and substring(table_name,1,2) != ('pg') "
   conn.exec( tabsql ) do |result|
   result.each do |row|
     @tabs [row['table_name']] = []
      end
   end
 
   @tabs.each do | tab,v | 
     puts tab
     
    colsql = "select column_name from information_schema.columns where table_catalog = 'Asimov' and table_schema = 'public' and table_name = '#{tab}' order by ordinal_position"
    puts colsql
    conn.exec( colsql ) do |result|
    result.each do |row|
      @tabs[tab] << row['column_name']
      end
    end
    @fkeys[tab] = []
    fksql = 
      "SELECT
          tc.constraint_name, tc.table_name, kcu.column_name, 
          ccu.table_name AS foreign_table_name,
          ccu.column_name AS foreign_column_name 
      FROM 
          information_schema.table_constraints AS tc 
          JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
          JOIN information_schema.constraint_column_usage AS ccu
            ON ccu.constraint_name = tc.constraint_name
      WHERE constraint_type = 'FOREIGN KEY' AND tc.table_name='#{tab}';"
    conn.exec( fksql ) do |result|
      puts fksql
    result.each do |row|
      puts row.inspect
      @fkeys[tab] << row['foreign_table_name']
      end
    end

   end
   
   puts @tabs.inspect
   puts @fkeys.inspect
  av = ActionView::Base.new()
  av.view_paths = ActionController::Base.view_paths
  av.extend ApplicationHelper #or any other helpers your template may need
  body = av.render(:template => "asimov/graphviz.erb", :locals => {:tabs => @tabs,:fkeys=>@fkeys})
  t =  File.new("/tmp/model.viz","w")
  t.write body
  t.close()
  cmd = "dot -Tpng /tmp/model.viz -o #{Rails.root}/public/assets/images/dbgraph.png"
  system(cmd)

 end
 
 
end

