Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  get "home/index"
  get "etl/index"
  get "etl/job_exec"
  get "etl/job_api_index"
  get "etl/job_api_exec"
  post "etl/job_api_schedule"
  get "etl/job_api_status"
  get "etl/job_api_status_details"
  get "etl/job_unittests"
  get 'etl/job_api_schedule_details'
  get 'etl/restart'
  get 'etl/restart_schedule'

  get "datamodel/datamodel_display"
  get "datamodel/datamodel_dump"

  post "datamodel/datamodel_api_change"
  post "datamodel/graph_api"
  get "datamodel/graph_display"
  get "asimov/execute"
  get "asimov/execute_api"
end
