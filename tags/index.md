---
virtual: 1
---
[% USE q = Qgoda %]

[% IF !asset.parent %]
    [% FOREACH tag IN q.taxonomyValues('tags') %]
      [% location = q.sprintf("/tags/%s/index.html", tag.slugify) %]
      [% q.clone(location => location
                 plocation => location
                 title => '#' _ tag
                 tag => tag
                 start => 0) %]
    [% END %]
[% ELSE %]
  [% filters = { tags = ['icontains', tag] } %]
  [% INCLUDE components/listing.html filters = filters %]
[% END %]
