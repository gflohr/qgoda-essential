---
title: Templates
name: templates
date: 2018-03-01
tags: [ General, Templates ]
---
[% USE q = Qgoda %]
Qgoda templates are called "views" and are by default searched in the directory `_views`. Qgoda uses the [Template Toolkit](http://www.http://www.template-toolkit.org/) as its styling template engine.

[% TAGS [@ @] %]
<qgoda-toc/>

## Overall Structure

The default template `_views/default.html` looks pretty simple at first glance, but pretty weird at second:

```
[%- PROCESS functions/setup.tt -%]
[%- body = PROCESS partials/body.html %]
[%- head = PROCESS partials/head.html %]
[%- WRAPPER wrappers/html5.html %]
[%- head %]
[% body %]
[% END %]
```

## Rendering Order

It mostly includes code for the html body and for the html head and does some more fancy stuff.  Wait! First the body, then the head???

Yes, and that makes perfect sense!  Think about the best-known HTML element from the `<head>`, the `<title>` tag.  Normally, there is no way to fill the document title, while rendering the body because the head has already been rendered.

Or imagine that rendering a specific part of the body requires adding CSS files or snippets to the head.

You can avoid all these problems by first taking care of the body before you do the head:

```
[%- body = PROCESS partials/body.html %]
[%- head = PROCESS partials/head.html %]
```

But you do not render them into a page but into memory, into the variables `body` and `head`.  All that is left to do, is to spit them out in the opposite order:

```
[%- head %]
[% body %]
```

Problem solved!

## Doctype Wrappers

The rendering of the head and body as described above is actually a little bit more:

```
[%- WRAPPER wrappers/html5.html %]
[%- head %]
[% body %]
[% END %]
```

Wrappers are an extremely useful feature of the [Template Toolkit](http://www.template-toolkit.org/).  The wrapper file `_views/wrappers/html5.html` looks like this:

```html
<!doctype html>
<html lang="[% IF asset.lingua; asset.lingua; END %]" class="no-js">
[%- content %]
</html>
```

The variable `content` contains whatever you had put between `[% WRAPPER %]` and `[% END %]` before.  Like this, it is very easy for you to change the document type to XHTML, HTML4 or even to quirks mode by simply writing another wrapper.

## Template Setup

The first line includes the file `functions/setup.tt` that is used for executing Template Toolkit code that should affect all modules of the template:

```
[%- PROCESS functions/setup.tt -%]
```

See [% q.anchor(name = 'template-setup') %] for more information on what happens there.

## Multiple Templates

The default template that ships with this theme is so unspecific that you will find very little reason to write more templates, even if some parts of your site sport a completely different layout.  Instead you have to possibilities:

### Conditional Inclusion

You can include different modules based on document variables:

```
[% IF asset.type == 'start-page' %]
  [% INCLUDE partials/body/banner.html %]
[% ELSE %]
  [% INCLUDE partials/body/tag-cloud.html %]
[% END %]
```

### Dynamic Inclusion

The other possibility is to use a variable.  Say, you have a markdown document like this:

```yaml
---
title: The Holy Grail
aside: partials/body/aside/google_ads.html
---
The Holy Grail is the ...
```

You can then write something like this in your view template:

```html
<article>[% content %]</article>
[% aside = asset.aside %]
<aside>[% INCLUDE $aside %]</aside>
```

You may have noticed a little gotcha in line 2: You have to copy the document variable `asset.aside` into a top-level variable `aside` because the interpolation with `$dollar` variables only works for top-level variables in the Template Toolkit.

You can continue with [@ q.anchor(name = 'template-setup') @] from here.
