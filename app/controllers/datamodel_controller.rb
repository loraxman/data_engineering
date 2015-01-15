class DatamodelController < ApplicationController
  layout "data_engineering"
  skip_before_filter  :verify_authenticity_token
  def index
  end
  
  def datamodel_display
    render
  end
  
  def datamodel_api_change
    model_code = params[:modelcode]
    File.open("/tmp/model.viz", 'w') { |file| file.write(model_code) }
    cmd = "dot -Tpng /tmp/model.viz -o #{Rails.root}/public/assets/images/claim.png"
    system(cmd)
    puts cmd
    render :text => "ok"
  end
  
  def datamodel_dump
    cmd = "pg_dump -dAsimov > /tmp/schema.sql"
    system(cmd)
    puts cmd
    schema = File.read("/tmp/schema.sql")
    render :text => schema
  end
  
  def graph_api
    Asimov.new.create_graph_for_db
    render :text => "ok"

  end
  
  def graph_display
    render
  end
end