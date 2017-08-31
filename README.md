# README

[Dependencies](#notable-dependencies)

## Welcome!  

**_fadetheme_** is a TINT theme which displays posts from its feed and eventually replaces each one with a straightforward fade effect developed in vanilla JavaScript.  The initial view is loaded with the first API query page of results, and the remaining pages of results are fetched asynchronously while the view starts replacing the image and caption pairs with new ones that were fetched after launch.  The layout is very flexible and adjusts the number of posts per row according to your screen size.  

You should be able to clone this project and run it right away after a `bundle install`.  Even though it's set up to use Postgresql, you won't need the database at this time, so as long as you can install the `pg` gem on your machine you should be good to go.  There's one more catch: it will complain if you try to load Rails without passing your api_token as an environement variable like so: 

`TINT_API_TOKEN=mylongstring4mykey2dostuff283u8rjfj3j rails s`


## Notable Dependencies

* Ruby 2.4.1
* Rails ~> 5.1.3
* Verge 1.9.1
* Pegasus 0.3.5
* Thimble 1.1-beta 
* Faraday 0.13.1 



