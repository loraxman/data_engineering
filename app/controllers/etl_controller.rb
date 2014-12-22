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
end
