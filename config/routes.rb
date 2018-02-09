Rails.application.routes.draw do
  root to: 'static_views#index'
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  # resources :comics, only: [:new, :create]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :comics, only: [:index, :show, :create]
      resources :users, only: [:show]
      resources :shelves, only: [:create, :update]
    end
  end

  scope :auth do
    get 'is_signed_in', to: 'auth#is_signed_in?'
  end

  # get '*path', to: 'static_views#index'

end
