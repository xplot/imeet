# Welcome to Invite!

   

###### Install

* Install Python 2.7.*

* Install [node.js](http://nodejs.org/)

* Run `npm install -g grunt-cli`. This will use npm from NodeJs to install [grunt-cli](http://gruntjs.com/getting-started#installing-the-cli).

* Navigate to invite/tools and run `npm install`. This will use the package.json to resolve the local grunt and its dependencies.

* Download and install [GoogleAppEngine (Python SDK)](https://cloud.google.com/appengine/downloads).

* Run the `Invite` instance with GoogleAppEngine.

Done!!! Go to localhost:8080


####### Conventions

* The URL dictates the name of the View, Template, etc. The only exception is the / (index) which could use a meaningful name.

* All javascript classes will have the type at the end of the word always. Ex. InviteHeaderView.

* You should strive for convention over configuration. Every javascript classes should define their properties as much as it can.
Ex. InviteHeaderView = SimpleView.extend({
        template: JST['invite_header.html'],
        el: '#invite-header',
        ....
    }
 here template and el are defined instead of passed as a parameter.

 * Every Backbone View should initialize the expected properties for the options object in the initialize method. This is a way
 to document what's going to be passed for the options object. Ex.
 InviteTitleView = Backbone.View.extend({

    initialize: function(options){
        this.options = options || {is_editable: false}; //we are specifying that options will have an is_editable property.
    },
    ....
   }

