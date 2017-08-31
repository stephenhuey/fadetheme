require 'test_helper'

class JavascriptRequestTest < ActionDispatch::IntegrationTest
  test "should get feed" do
    get feed_url, as: :json
    assert_response :success
  end

end
