require 'test_helper'

class PersonalizeControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get personalize_index_url
    assert_response :success
  end

end
