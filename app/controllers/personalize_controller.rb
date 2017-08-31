class PersonalizeController < ApplicationController
  def index
    response = Faraday.get 'https://api.tintup.com/v1/feed/hueydemo?api_token=05511baf4de385e6582942fa38aa3928b3bfadc8'
    json = JSON.parse response.body
    @items = json["data"]
  end
end
