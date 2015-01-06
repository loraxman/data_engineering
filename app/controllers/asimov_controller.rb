class AsimovController < ApplicationController
  layout "data_engineering"
  def execute
  end
  
  def execute_api
    outs = {}
    outs['results'] = Asimov.run_scripts
    render :json => outs
  end
end