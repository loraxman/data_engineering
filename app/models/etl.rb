class Etl
  def self.schedule(yamlfile,crondays,cronhours,cronminute,cronrecurrs)
    r = Redis.new
    r.hset('taskhash', yamlfile, self.schedule_to_celery(yamlfile,crondays,cronhours,cronminute,cronrecurrs))
  end
  
  def self.schedule_to_celery(yamlfile,crondays,cronhours,cronminute,cronrecurrs)
    day_of_week=['sun','mon','tue','wed','thu','fri','sat']
    scheddays = day_of_week.map.with_index{|x,i| i if crondays[i]}.compact.join(',')
    if cronrecurrs
      crontab = cronhours.to_i==-1  ? "\"crontab(minute='*/#{cronminute}')\"" : "\"crontab(minute=#{cronminute},hour='*/#{cronhours}')\""
    else
      crontab = "\"crontab(minute=#{cronminute},hour=#{cronhours},day_of_week='#{scheddays}')\""
    end

    "{\"#{yamlfile}\": {\"task\": \"app.tasks.startjob\",\"schedule\": #{crontab},\"args\": \"('#{yamlfile}\',)\"}}"
 
  end
end