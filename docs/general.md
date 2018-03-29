---
title: General Information
name: general-information
date: 2018-04-05
tags: [ General ]
---
[% USE q = Qgoda %]
This theme contains examples for most functionality of Qgoda and it also shows
some best practices for organizing a Qgoda powered site.  It does *not* contain
any fancy CSS styling or JavaScript.

The [Qgoda default theme](https://github.com/gflohr/qgoda-default) is a more
comprehensive example of a theme as it also contains a lot of boilerplate
JavaScript and CSS but at the cost of being a lot more opinionated.  But if
you can live with the decisions made for CSS framework and build system, then
[qgoda-default](https://github.com/gflohr/qgoda-default) is probably a better
starting point.

All those that prefer to roll their own version will find everything they
need here:

- a typical [site structure]([% q.llinkPost(name = 'site-structure') %])
- typical template structure
- page listings
- pagination
- smart inclusion of JavaScript and CSS

The documentation found in this project is *not* meant to be exhaustive documentation for Qgoda (see the [Qgoda web site](http://www.qgoda.net/en/docs/) for comprehensive documentation) but documents this particular theme only.  The information found here should enable you to modify the site layout to your particular needs and help you understand the general design principles behind Qgoda themes.

Note that the documentation contained here sometimes links to the actual documenation at http://www.qgoda.net/en/docs.  At the time of this writing, the product documentation is still incomplete, and some of these links may be broken!
