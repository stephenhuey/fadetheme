class PersonalizeController < ApplicationController
  #respond_to :js, only: :feed

  TITLE_TRUNCATE_LENGTH = 47

  def index
    response = Faraday.get 'https://api.tintup.com/v1/feed/hueydemo?api_token=05511baf4de385e6582942fa38aa3928b3bfadc8&source=instagram'
    json = JSON.parse response.body
    more = json["has_next_page"]
    session[:finished] = !more
    session[:next_page] = json["next_page"]
    @title_truncate_length = TITLE_TRUNCATE_LENGTH
    @items = json["data"]
  end

  def feed
    puts "\n\n finished? #{session[:finished]} and next page: #{session[:next_page]}\n\n}"
    items = nil
    unless session[:finished]
      puts "\n\nAccessing feed and next page is #{session[:next_page]}\n\n"
      response = Faraday.get session[:next_page]
      json = JSON.parse response.body
      more = json["has_next_page"]
      session[:finished] = !more
      session[:next_page] = json["next_page"]
      items = json["data"]
      items.each do |item|
        item['title'] = (item['title']).truncate(TITLE_TRUNCATE_LENGTH)
      end
    end
    puts "\n\nEnd of feed and items are #{items.inspect}\n\n"

    # respond_with(items)

    respond_to do |format|
      format.json { render json: items }
    end
  end
end
