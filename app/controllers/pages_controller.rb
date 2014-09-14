class PagesController < ApplicationController
  require 'nokogiri'
  require 'open-uri'
  require 'pry'
  
  def home
    
  end
  
  def concerts
    render :layout => 'concerts'
  end
  
  def news
    urls = %w[https://www.facebook.com/feeds/page.php?format=rss20&id=197251703626320]
    feeds = Feedjira::Feed.fetch_and_parse urls
    feed = feeds['https://www.facebook.com/feeds/page.php?format=rss20&id=197251703626320']
    @entries = feed.entries
    render :layout => 'news'
  end
  
  def merch
    @merch = Nokogiri::HTML(open('http://loganvath.bandcamp.com/merch'))
    render :layout => 'merch'
  end
  
  def contact
    render :layout => 'contact'
  end
end