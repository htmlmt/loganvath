class PagesController < ApplicationController
  def home
    
  end
  
  def concerts
    render :layout => 'concerts'
  end
  
  def news
    render :layout => 'news'
  end
  
  def merch
    render :layout => 'merch'
  end
  
  def contact
    render :layout => 'contact'
  end
end