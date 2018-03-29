---
title: Archives
name: archives
date: 2018-01-28
tags: [ Archives, Listings, Pagination, Cloning, Virtual Pages, Templates ]
---
[% USE q = Qgoda %]
[% TAGS [@ @] %]
Archives of posts are explained in great detail on the [Qgoda website](http://www.qgoda.net/en/docs/archives/), so you should look there for starters.

Even without reading the detailed documentation, the source code of [`_views/components/archive/aside.html`](https://github.com/gflohr/qgoda-essential/blob/master/_views/components/archive/aside.html) should be pretty self-explanatory.  In case you haven't guessed so already: It generates the list of archive pages in the right column of this page.

The tricky part is again the generation of an unknown, arbitrary number of archive pages.  And again, it's the [cloning feature](http://www.qgoda.net/en/docs/cloning/) that comes to our rescue.  This is the source code of `archive/index.md`:

```yaml
---
virtual: 1
---
[% USE q = Qgoda %]

[% IF !asset.parent %]
  [% FOREACH year IN q.listPosts().vmap('date.year').unique() %]
    [% FOREACH imonth IN q.listPosts('date.year' = year).vmap('date.imonth').unique() %]
      [% location = q.sprintf("/archive/%04u/%02u/index.html", year, imonth) %]
      [% q.clone(location => location
                 plocation => location
                 title => q.sprintf("Posts from %04u/%02u", year, imonth) 
                 year => year imonth => imonth
                 start => 0) %]
    [% END %]
  [% END %]
[% ELSE %]
  [% filters = { 'date.year' = year 'date.imonth' = imonth } %]
  [% INCLUDE components/listing.html filters = filters %]
[% END %]
```

Just a little bit more messy than pagination ...

You can see that the document is a [virtual document](http://www.qgoda.net/en/docs/virtual-documents/).  It will be processed but not rendered (written to disk).

The variable `asset.parent` is set if the document is a clone of another document.  If it is not, we iterate over all months (for all years) in a nested loop, hard-code a location for the clone, and call clone with the necessary parameters to inject.

Iff the document has a parent, it is the product of a call to `q.clone()` above, and we generate a listing.  And if that listing happens to contain entries than fit on one page, these listings will also be paginated.

Note that each clone will have `start` reset to 0 so that the pagination restarts at the beginning.

Now move on to [@ q.anchor(name = 'tags') @] for learning how to deal with tags (or categories or whatever other taxonomy you like).