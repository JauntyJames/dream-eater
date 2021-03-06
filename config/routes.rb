Rails.application.routes.draw do
  root to: 'static_views#index'
  devise_for :users, controllers: {
    omniauth_callbacks: "users/omniauth_callbacks"
  }
  namespace :api do
    namespace :v1 do
      resources :comics, except: :new do
        resources :comments, only: [:index, :create, :update, :destroy]
      end
      resources :users, only: :show
      resources :shelves, only: [:create, :update]
    end
  end

  scope :auth do
    resources :auth, only: :destroy
    get 'is_signed_in', to: 'auth#is_signed_in?'
  end

  get '*path', to: 'static_views#index'

end
