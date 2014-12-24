class EtlController < ApplicationController
  layout "data_engineering"
  def index
    uri = URI.parse("#{Settings.etl_srv_url}/jobs")
    
    # Shortcut
    @jobs  = Net::HTTP.get_response(uri).body
    
    render 

  end
  
  def job_api_index
    uri = URI.parse("#{Settings.etl_srv_url}/jobs")
    
    # Shortcut
    @jobs  = Net::HTTP.get_response(uri).body
    render :text => @jobs
  end
  
  def job_api_status
    uri = URI.parse("#{Settings.celery_status}/api/tasks")
    
    # Shortcut
    @jobs  = Net::HTTP.get_response(uri).body
    render :text => @jobs
  end
  
  
  def job_api_exec
      uri = URI.parse("#{Settings.etl_srv_url}/jobs/execute?jobfile=#{params[:jobfile]}")
      
      # Shortcut
      Net::HTTP.get_response(uri).body
      
      render :text =>"OK"
  end
  
  def job_exec
    uri = URI.parse("#{Settings.etl_srv_url}/jobs")
    
    # Shortcut
    @jobs  = Net::HTTP.get_response(uri).body
    
    render 
  end
end
