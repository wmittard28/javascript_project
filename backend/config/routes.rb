Rails.application.routes.draw do
namespace :api do
  resources :items
  resources :expenses
 end
end
