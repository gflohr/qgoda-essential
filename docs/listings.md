---
title: Listings
name: listings
date: 2018-02-05
tags: [ Listings, Pagination, Cloning, Templates ]
---
[% USE q = Qgoda %]
[% TAGS [@ @] %]
Listings of posts are explained in great detail on the [Qgoda website](http://www.qgoda.net/en/docs/listings/), so you should look there for starters.  Here, we will just cover the things that are special in this theme.

## General Syntax

Listings, in general, take one of the following forms in Qgoda:

```tt2
[% USE q = Qgoda %]
[% FOREACH post IN q.llistPosts.nsortBy('date').reverse() %]
  <h3>[% post.title | html %]</h3>
  ...
[% END %]
```

This will list all posts in the site that have the same language, and sort them by date in descending order.  By the way, `llistPosts()` is not a typo but the equivalent of this:

```tt2
[% q.listPosts(lingua = asset.lingua) %]
```

The leading "l" in `llistPosts` stands for `lingua`, and automatically adds a filter that only selects posts in the same language as the listing page itself.

And the invocation of `listPosts` is actually a synonym for this:

```tt2
[% q.list(lingua = asset.lingua type = 'post') %]
```

## Parametrizing Listings

When you look into the source code of [`_views/components/listing.html`](https://github.com/gflohr/qgoda-essential/blob/master/_views/components/listing.html) you will probably find that this is not for the faint of heart.  It looks like it would be a good idea to parametrize the listing so that it can be reused for different types of listings.  This is easy:

```tt2
[% posts = q.listPosts(filters).nsortBy('date').reverse() %]
```

Now the variable `filters` can contain arbitrary filters.  If you `INCLUDE` the component without filters, the default will be used, that lists *all* posts like show on the [start page]([% q.link(name = 'home') %]).

But you can also search for all posts from June 2015 like this:

```tt2
[% INCLUDE components/listing.html
           date.year = 2015
           date.month = '06' %]
```

Or search for all posts for the tag 'CSS':

```tt2
[% INCLUDE components/listing.html
           tags = ['icontains', 'CSS'] %]
```

## Combining Listings With Pagination

You will often distribute long listings over multiple pages.  This is called *pagination* and explained at http://www.qgoda.net/en/docs/pagination/.  The general principle is simple.  Instead of iterating directly ver the list, you feed the set of posts into the Qgoda plug-in function `paginate()`:

```tt2
[% start = asset.start || 0 %]
[% p = q.paginate(start = start, total = posts.size, per_page = 10) %]
[% USE Dumper %]
<pre>[% Dumper.dump_html(p) %]</pre>
```

The parameters `start` and `total` are mandatory. The parameter `per_page` defaults to 10 (and could be omitted here).  The method does really not do anything special or things that could not be done in regular Template Toolkit code.  It has the main advantage that all the necessary computations are done in Perl (and therefore faster).  If you dump the result of the function into the rendered page, it should be pretty obvious how to use it for generating a list of links to the individual pages.

But that is the trivial part of pagination.  We now must generate an unknown number of more listing pages.  The first page displays posts number 1 to 10, the second one number 11 to 20 and so on, and we do not know how many we need.

The solution used by Qgoda is embarrassingly simple: Qgoda documents have the ability to *reproduce*.  You can create an exact clone of the document currently being rendered but you can (and must!) inject a little bit of mutated DNA:

```tt2
[%- IF p.next_start -%]
  [%- q.clone(location = p.next_location start = p.next_start) -%]
[%- END -%]
```

The method `Qgoda.clone()` has one mandatory named argument, the `location` of the cloned document and `Qgoda.paginate()` was kind enough to return a suitable location in the variable `p.next_location` as well as the starting index of the next listing window in `p.next_start`.  Note that all parameters (`location`, `start`, ...) end up as asset variables (`asset.location`, `asset.start`, ...) in the clone document.

The effect of all this is that the listings duplicate themselves until they have covered the entire set of posts.  Simple, isn't it?

## Mixing TT2 Code With Markdown

Listings will very often be generated as part of Markdown documents.  That offers some very nasty pitfalls for you.  Read the [online documentation](http://www.qgoda.net/en/docs/mixing-markdown-with-template-code/) for all the gory details.

In brief: Markdown will occasionally throw in `<p>` elements, where the template processor left whitespace behind.  With Template Toolkit you can avoid that by using the whitespace consuming form of tags:

```tt2
[%- IF something -%]
blab
[%- END -%]
```

The form `[%- ... -%]` will eat up all adjacent whitespace and fix the problem.

You can continue with [@ q.anchor(name = 'archives') @] from here.
