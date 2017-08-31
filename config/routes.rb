Rails.application.routes.draw do

  root 'personalize#index'

  get 'personalize/index'
  get 'feed', to: 'personalize#feed', as: :feed

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
