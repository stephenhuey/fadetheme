class TintApi

  # this class acts as a wrapper for the Faraday gem and also provides some massaging of Tint API feed results

  class FeedResults < Struct.new(:finished?, :next_page, :data) # a lightweight Struct for returned results with handy methods
  end

  def TintApi.feed_me(url = TINT_API_URL) # if a paging URL is not passed, assume we need the original query URL
    response = Faraday.get url # could add error handling in the future
    json = JSON.parse response.body
    has_next_page = json["has_next_page"]
    next_page = json["next_page"] if has_next_page
    return FeedResults.new(!has_next_page, next_page, json["data"])
  end

end