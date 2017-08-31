class TintApi

  # a lightweight Struct for returned results with handy methods
  class FeedResults < Struct.new(:finished?, :next_page, :data)
  end

  def TintApi.feed_me(url = TINT_API_URL) # if a paging URL is not passed, assume we need the original query URL
    response = Faraday.get url # could add error handling in the future 
    json = JSON.parse response.body
    has_next_page = json["has_next_page"]
    next_page = json["next_page"] if has_next_page

    #results = Object.new

    #def results.finished?
    #  !has_next_page
    #end

    #def results.next_page
    #  json["next_page"] if has_next_page
    #end

    #results


    return FeedResults.new(!has_next_page, next_page, json["data"])
  end

end