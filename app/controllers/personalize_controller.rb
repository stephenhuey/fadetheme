class PersonalizeController < ApplicationController
  #respond_to :js, only: :feed

  def index
    response = Faraday.get 'https://api.tintup.com/v1/feed/hueydemo?api_token=05511baf4de385e6582942fa38aa3928b3bfadc8'
    json = JSON.parse response.body
    more = json["has_next_page"]
    session[:finished] = !more
    session[:next_page] = json["next_page"]
    @items = json["data"]
  end

  def feed
    items = nil
    unless session[:finished]
      puts "\n\nAccessing feed and next page is #{session[:next_page]}\n\n"
      response = Faraday.get session[:next_page]
      json = JSON.parse response.body
      more = json["has_next_page"]
      session[:finished] = !more
      session[:next_page] = json["next_page"]
      items = json["data"]
    end
    puts "\n\nEnd of feed and items are #{items.inspect}\n\n"

    # respond_with(items)

    respond_to do |format|
      format.json { render json: items }
    end
  end
end
