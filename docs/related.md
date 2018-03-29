---
title: Related Documents
name: related
date: 2018-01-18
tags: [ Related Documents, Templates ]
---
[% USE q = Qgoda %]
[% TAGS [@ @] %]
You can learn how Qgoda calculates which documents are related respectively similar on the [Qgoda website](http://www.qgoda.net/en/docs/tags/).  Displaying related documents is very simple:

See `_views/components/related.html`:

```html
[% USE q = Qgoda %]
[% IF !threshold %][% threshold = 3 %][% END %]
[% IF !count %][% count = 5 %][% END %]
[% docs = q.related(threshold, type = 'post').splice(0, count - 1) %]
[% IF docs.size %]
  <h2 class="related-h">Related</h2>
  <ul class="related-list">
    [% FOREACH doc IN docs %]
    <li><a href="[% doc.permalink %]">[% doc.title | html %]</a></li>
    [% END %]
  </ul>
[% END %]
```

The heart of it all is the call to `q.related()`:

```
[% docs = q.related(threshold, type = 'post').splice(0, count - 1) %]
```

The first argument is the threshhold for the relationship value.  That avoids that random documents are displayed, when nothing related can be found.

Following the threshold is the now well known list of additional filters.  The resulting list can then be cut to a maximum size (variable `count`).  The rest should be self-explanatory.

Now that all relevant features of this theme are covered, you may want to move on to [@ q.anchor(name = 'nodejs') @] if you want to learn how to add modern web development features to the theme.
