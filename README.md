# README

1. [Welcome](#welcome)
2. [Notable Dependencies](#notable-dependencies)
3. [CSS Choices](#css-choices)
4. [JS Pursuits](#js-pursuits)
5. [Transitions With CSS & JS](#transitions-with-css-and-js)
6. [The End](#the-end)

## Welcome!  

**_fadetheme_** is a TINT theme which displays posts from its feed and eventually replaces each one with a straightforward fade effect developed in vanilla JavaScript.  The initial view is loaded with the first API query page of results, and the remaining pages of results are fetched asynchronously while the view starts replacing the image and caption pairs with new ones that were fetched after launch.  The layout is very flexible and adjusts the number of posts per row according to your screen size, so it is **suitable for both _web_ and _display_ themes**.  

You should be able to clone this project and run it right away after a `bundle install`.  Even though it's set up to use Postgresql, you won't need the database at this time, so as long as you can install the `pg` gem on your machine you should be good to go.  There's one more catch: it will complain if you try to load Rails without passing your api_token as an environement variable like so: 

`TINT_API_TOKEN=mylongstring4mykey2dostuff283u8rjfj3j rails s`

One of the interesting UX choices I faced was whether or not was whether to transition out items that were not currently located in the viewport of the screen.  Also, if someone is scrolling, do you count an image that's only 50% or 30% visible as in the viewport?  Would you start fading out an image that was only 5% visible, especially if it was unlikely the viewer had seen it?  In the end I went with it, but Verge makes that behavior easy to tweak.  For example, with Verge you can say the element has to be completely within the bounds of the top and bottom to be considered.  

## Notable Dependencies

* Ruby 2.4.1
* Rails ~> 5.1.3
* Verge 1.9.1
* Pegasus 0.3.5
* Thimble 1.1-beta 
* Faraday 0.13.1 


## CSS Choices

I've heard a lot about flexbox for a long time and remember trying some tutorials a year or two ago but never really got to use it on a real project.  The CSS framework I've probably used most over the years is Bootstrap, but it imposes a lot on your CSS so I've been trying to challenge myself to reach for other more minimal frameworks on smaller projects, especially since most browsers are up-to-date now and also because I've had less use for Bootstrap's JS plugins lately.  At first I was going with the minimal [Skeleton CSS framework](http://getskeleton.com/) since I've used it on responsive sites before and it would've looked fine, but it would've taken a bit more code in Rails or maybe on the client to rearrange column classes on divs in rows (both Skeleton classes) to get the exact look and feel I wanted, so I just went with the also lightweight [Thimble CSS framework](http://thimblecss.com/) since it looked like flexbox was going to easily give me the vibe I was going for.  Although I tried their rows and cells and even their cards, in the end I didn't even use any of Thimble's layout components since I was able to figure out a raw flexbox solution that felt better, so at this point I suppose Thimble's most obvious contribution is the typography.  :)  

Odd Behavior:  with some responsive layouts utilizing media queries, the portrait and landscape adjustment seems pretty much instant, but not with my flexbox solution in this project--sometimes there's a lag of a couple of seconds after resizing or turning (actually, I just noticed that [my full-page background image webpage](http://stephenhuey.com/) that I've had up for several years is slightly glitchy too and you have to either scroll with your thumb a bit or reload).  It's not bad--and actually, my layout wasn't designed for people who want to keep turning their phones.  **I imagined my theme being displayed on a giant screen at Times Square or a lobby somewhere** (so there'd be no scrolling, and they'd probably just see 6 boxes that change out regularly), but it always works well for embedding in any place where viewers might be scrolling with their thumb or their mouse and they want to move down the page to see more.  

## JS Pursuits 

**Why not jQuery?** Without a doubt the JS library I've depended on for the greater number of years has been jQuery.  I have plenty of nightmares lingering from web dev in the days before Microsoft finally put a team back on IE (the euphoria from reading that [momentous blog post](https://blogs.msdn.microsoft.com/ie/2004/07/21/welcome-to-the-ie-team-blog/) and [the next one](https://blogs.msdn.microsoft.com/ie/2004/07/23/overwhelming-response/) is nearly as palpable today as it was for me in my office back in 2004).  Exaggerating?  Nah, not really. :P  

**Why not a modern full-featured framework?** In recent years, I have at times used Angular and [Aurelia](http://aurelia.io/) and I've enjoyed transpilers launching my JavaScript version ahead.  I didn't try to bring in one on this project so I'm not using the latest JS capabilities (I didn't notice what I was doing at one point and even had to downgrade some arrow functions after seeing the error messages).  Even without the latest JS versions' capabilities, JS is farther along and much better supported than it was when we first started depending on jQuery, so that's why I went ahead and tackled this project with jQuery or any JS framework.  The scope felt small enough to use a small collection of functions in a couple of files, but if the scope began to expand I'd seriously consider just bringing in a modern JS framework.  Aurelia has recently done some seriously heavy lifting for me but I rather enjoying writing this without the extra help this time!

**Why Pegasus?** There are plenty of choices of tiny libraries available if the only AJAX you need to do is fetch some data from your own server, and I could've written it in long form without any library but would've just ended up with more boilerplate than what [Pegasus](http://typicode.github.io/pegasus/) gave me.  **One thing to note** is that my client-side script using Pegasus asking for each of the next page of results from my Rails server which in turn uses Faraday to get the next page from TINT.  So the Pegasus function is calling each page one at a time until the API says there are no more results (or rather, my Rails server tells the client that).  _This could easily be tweaked to load the posts more lazily_.  It's likely some users wouldn't even stay on the page to see all of the posts, so those extra API requests would be wasted if this was widely deployed.  

**Why Verge?**  I remember writing some code like this in 2011 and a few lines would probably do the job well enough but [Verge](https://github.com/ryanve/verge) is _well-researched_ so they probably know something I don't.  :D   And they also have a grab bag of functions and I wasn't sure which one to go with (I hadn't decided on what the requirements should be).  

**Why setInterval?** I'm a fan of the much more lightweight [heartbeats](https://www.npmjs.com/package/heartbeats) but that's more dependable on the server in something like Node.js and hopefully it won't be too long before it performs consistently in browsers.  Besides, I'm only coordinating a couple of different things.  

## Transitions With CSS And JS

I didn't see any TINT themes that did something like this and I've always enjoyed soothing displays of elements fading in and out.  You most often see the showing and hiding of HTML elements by setting the `display` property to `none` or something else.  In my case I wanted the element, while invisible, to still take up space on the page, so I almost started out setting the `visibility` attribute but didn't need it since I could just send the `opacity` down to 0 and then back up to 1 after the image & test had been replaced.  The duration is specified in CSS so the UX/product person can play with the feel of it a bit more easily.  JS is just used to kick it off after a suitable element has been selected for removal based on some criteria (must be in the viewport, or if the transition is back to visible then it can be in or outside of the viewport but it must one of the currently invisible items).  



## The End 

Thanks for a fun project.  Here's the menu again in case you need it down here:

1. [Welcome](#welcome)
2. [Notable Dependencies](#notable-dependencies)
3. [CSS Choices](#css-choices)
4. [JS Pursuits](#js-pursuits)
5. [Transitions With CSS & JS](#transitions-with-css-and-js)
6. [The End](#the-end)

That's all!  
