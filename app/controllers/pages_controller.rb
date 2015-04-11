class PagesController < ApplicationController
  require 'nokogiri'
  require 'open-uri'
  require 'pry'
  
  def home 
    upcoming = Nokogiri::HTML(open('https://www.reverbnation.com/artist/artist_shows/1345034'))
    past = Nokogiri::HTML(open('https://www.reverbnation.com/artist/artist_shows/1345034?class=prev&past=true'))
    
    getConcerts(upcoming) 
    @upcoming_concerts = @concerts
    
    getConcerts(past)
    @past_concerts = @concerts
    
    urls = %w[https://www.facebook.com/feeds/page.php?format=rss20&id=197251703626320]
    feeds = Feedjira::Feed.fetch_and_parse urls
    feed = feeds['https://www.facebook.com/feeds/page.php?format=rss20&id=197251703626320']
    @entries = feed.entries
    
    @merch = Nokogiri::HTML(open('http://loganvath.bandcamp.com/merch'))
    
    @client = Soundcloud.new(:client_id => ENV["CLIENT_ID"], :client_secret => ENV["CLIENT_SECRET"], :username => ENV["SOUNDCLOUD_USERNAME"], :password => ENV["SOUNDCLOUD_PASSWORD"])

    playlist = @client.get('/resolve', :url => "https://soundcloud.com/michaeljamestodd/sets/logan-vath", :client_id => ENV["CLIENT_ID"])

    @ids = []

    playlist["tracks"].each do |track|
      @ids.push track["id"]
    end
  end
  
  def concerts
    @client = Soundcloud.new(:client_id => ENV["CLIENT_ID"], :client_secret => ENV["CLIENT_SECRET"], :username => ENV["SOUNDCLOUD_USERNAME"], :password => ENV["SOUNDCLOUD_PASSWORD"])

    playlist = @client.get('/resolve', :url => "https://soundcloud.com/michaeljamestodd/sets/logan-vath", :client_id => ENV["CLIENT_ID"])

    @ids = []

    playlist["tracks"].each do |track|
      @ids.push track["id"]
    end
    
    @concerts = Nokogiri::HTML(open('https://www.reverbnation.com/artist/artist_shows/1345034'))
    @past_concerts = Nokogiri::HTML(open('https://www.reverbnation.com/artist/artist_shows/1345034?class=prev&past=true'))
    @client = Soundcloud.new(:client_id => ENV["CLIENT_ID"], :client_secret => ENV["CLIENT_SECRET"], :username => ENV["SOUNDCLOUD_USERNAME"], :password => ENV["SOUNDCLOUD_PASSWORD"])

    playlist = @client.get('/resolve', :url => "https://soundcloud.com/michaeljamestodd/sets/logan-vath", :client_id => ENV["CLIENT_ID"])

    @ids = []

    playlist["tracks"].each do |track|
      @ids.push track["id"]
    end
    render :layout => 'concerts'
  end
  
  def news
    urls = %w[https://www.facebook.com/feeds/page.php?format=rss20&id=197251703626320]
    feeds = Feedjira::Feed.fetch_and_parse urls
    feed = feeds['https://www.facebook.com/feeds/page.php?format=rss20&id=197251703626320']
    @entries = feed.entries
    @client = Soundcloud.new(:client_id => ENV["CLIENT_ID"], :client_secret => ENV["CLIENT_SECRET"], :username => ENV["SOUNDCLOUD_USERNAME"], :password => ENV["SOUNDCLOUD_PASSWORD"])

    playlist = @client.get('/resolve', :url => "https://soundcloud.com/michaeljamestodd/sets/logan-vath", :client_id => ENV["CLIENT_ID"])

    @ids = []

    playlist["tracks"].each do |track|
      @ids.push track["id"]
    end
    render :layout => 'news'
  end
  
  def merch
    @merch = Nokogiri::HTML(open('http://loganvath.bandcamp.com/merch'))
    @client = Soundcloud.new(:client_id => ENV["CLIENT_ID"], :client_secret => ENV["CLIENT_SECRET"], :username => ENV["SOUNDCLOUD_USERNAME"], :password => ENV["SOUNDCLOUD_PASSWORD"])

    playlist = @client.get('/resolve', :url => "https://soundcloud.com/michaeljamestodd/sets/logan-vath", :client_id => ENV["CLIENT_ID"])

    @ids = []

    playlist["tracks"].each do |track|
      @ids.push track["id"]
    end
    render :layout => 'merch'
  end
  
  def contact
    @client = Soundcloud.new(:client_id => ENV["CLIENT_ID"], :client_secret => ENV["CLIENT_SECRET"], :username => ENV["SOUNDCLOUD_USERNAME"], :password => ENV["SOUNDCLOUD_PASSWORD"])

    playlist = @client.get('/resolve', :url => "https://soundcloud.com/michaeljamestodd/sets/logan-vath", :client_id => ENV["CLIENT_ID"])

    @ids = []

    playlist["tracks"].each do |track|
      @ids.push track["id"]
    end
    
    render :layout => 'contact'
  end
  
  private
    def getConcerts(type)
      @concerts = []
      
      type.css(".profile_backpage_shows_row").each do |concert|
        concert_details = Hash.new
        details_time = concert.css(".artist_shows_shows_details_time").text
        details_array = details_time.split("|")
        concert_details["city"] = details_array.first.rstrip
        concert_details["time"] = details_array.last.lstrip
        concert_details["date"] = concert.css('.other-month').text
        link = concert.css('.buttons_container').first
        concert_details["tickets_link"] = link.css(".standard_button").first.get_attribute("href")
        rel_url = concert.css(".profile_backpage_shows_details_name").first.get_attribute("href")
        rn_link = "https://www.reverbnation.com"
        show_link = rn_link + rel_url
        show_details = Nokogiri::HTML(open(show_link))
      
        if concert_details["tickets_link"] == "javascript:;"
          concert_details["tickets_link"] = show_link
        end
      
        concert_details["name"] = concert.css('.profile_backpage_shows_details_name').text
        concert_details["other_bands"] = show_details.css('.name').text
      
        unless concert_details["other_bands"] == "\n              Logan Vath Music\n            "
          concert_details["other_bands"].sub! "\n            \n              Logan Vath Music", ""
          concert_details["other_bands"].sub! "Logan Vath Music\n            \n", ""
          concert_details["other_bands"].gsub! "\n            \n", " and"
          concert_details["other_bands"].split.join(" ")
        end
        
        @concerts << concert_details
      end
    end
end