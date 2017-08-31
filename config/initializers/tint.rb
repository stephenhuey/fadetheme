TINT_API_TOKEN = ENV['TINT_API_TOKEN'] || raise('No TINT_API_TOKEN provided to the environment!')

::TINT_API_URL = "https://api.tintup.com/v1/feed/hueydemo?api_token=#{TINT_API_TOKEN}&source=instagram"

# Could add variables to configure number of elements per page, per row in page, which sources are used, etc.

