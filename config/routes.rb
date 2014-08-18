Logan::Application.routes.draw do
  root :to => 'pages#home'
  get "/concerts" => 'pages#concerts', :as => :concerts
  get "/news" => 'pages#news', :as => :news
  get "/merch" => 'pages#merch', :as => :merch
  get "/contact" => 'pages#contact', :as => :contact
end
