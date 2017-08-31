class PersonalizeController < ApplicationController

  TITLE_TRUNCATE_LENGTH = 47

  # initial page load of personalized theme
  def index
    @items = get_tint_feed
  end

  # this is called via AJAX for additional pages of results beyond the first one
  def feed
    # if we have finished then there are more pages of results to be retrieved from the feed
    items = session[:finished_feeding] ? nil : get_tint_feed(session[:next_page])

    respond_to do |format|
      format.json { render json: items }
    end
  end

  private

  def get_tint_feed(url = nil)
    results = url.present? ? TintApi.feed_me(url) : TintApi.feed_me
    store_session_values(results)
    truncate_titles(results.data)
  end

  def store_session_values(results)
    session[:finished_feeding] = results.finished?
    session[:next_page] = results.next_page
  end

  def truncate_titles(items) # could be handled instead by a decorator
    items.each do |item|
      item['title'] = (item['title']).truncate(TITLE_TRUNCATE_LENGTH)
    end

    items
  end
end
