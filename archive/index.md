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
