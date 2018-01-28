Rails.application.routes.draw do
  get '/', to: 'static_views#index'
  devise_for :users
  resources :comics, only: [:new, :create]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :comics, only: [:index, :show]
    end
  end

  get '*path', to: 'static_views#index'

end
