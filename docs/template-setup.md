---
title: Template Setup
name: template-setup
date: 2018-02-20
tags: [ Templates, Cache-Busting, CSS, JavaScript ]
---
[% USE q = Qgoda %]
[% TAGS [@ @] %]
Setting up some global logic that is available in all modules of the templates is usually a good idea.  You should always do that from the root of your template tree and use the `PROCESS` directive of the [Template Toolkit](http://www.http://www.template-toolkit.org/), and *not* `INCLUDE` for that.

<qgoda-toc/>

## Default Template

The first line of the [default template]([@ q.link(name = 'templates') @]) looked like this:

```tt2
[%- PROCESS functions/setup.tt -%]
...
```

Also note, that the directive uses `[%- ... -%]`, so that possible white space is removed.  Otherwise, you may end up with whitespace before the `DOCTYPE` declaration!

In contrast to the `INCLUDE` directive, `PROCESS` includes the file with a context switch.  All variables manipulated inside the include will have the same value in the calling template.

The setup template that ships with this theme is really simple:

```tt2
[%- global = config.global -%]
```

It just copies the content of `config.global` from the [configuration]([@ q.link(name = 'configuration') @]) file `_config.yaml` into a variable `global`.

The section from `_config.yaml` contains the following:

```yaml
global:
  scripts:
    - /assets/js/site.js
  styles:
    - /assets/css/styles.css
```

After that assignment, the variable `global` contains to arrays `scripts` and `styles` that are initialized with the main JavaScript file and the main Stylesheet for the site.

It is crucial that these arrays are not top-level variables but children of a top-level variable.  See http://www.template-toolkit.org/docs/manual/Directives.html#section_INCLUDE for an explanation (scroll down to "Technical Note").  Otherwise, changes made to it will be invisible.

## Adding Styles

In [@ q.anchor(name = 'templates') @] we have already learned that it is wise to calculate the contents of the HTML `<body>` before that of the HTML `<head>`.  That pays out now.   You can do any of the following in your body view templates:

```tt2
[% global.styles.push('/assets/css/carousel.css') %]
```

Or even:

```tt2
[% global.styles.push('<style>.important { font-weight: bold; }</style>') %]
```

You can, of course, also override the styles completely by assigning a new array to `global.styles`.

Now look into `_views/partials/head.html`:

```tt2
  <head>
    ...
    [% INCLUDE functions/scripts.tt %]
  </head>
```

The template code [`functions/styles.tt`](https://github.com/gflohr/qgoda-essential/blob/master/_views/functions/styles.tt) that spits out the styles takes care that all stylesheets are included in the correct order.  It also filters out possible duplicates.

## Adding JavaScript

This works in a very similar fashion to stylesheets:

```tt2
[% global.scripts.push('/assets/js/carousel.js') %]
```

Or even:

```tt2
[% global.scripts.push('<script>const answer = 42;</script>') %]
```

In `_views/partials/body.html`, all JavaScript codes is included just before the closing body tag:

```tt2
  <body>
    ...
    [% INCLUDE functions/scripts.tt %]
  </body>
```

Just like the template code for styles, the code for scripts in [`functions/scripts.tt`](https://github.com/gflohr/qgoda-essential/blob/master/_views/functions/scripts.tt) orders correctly and filters out duplicates.

Be aware though, that this mechanism does by no means replace a full-fledged module bundler like [browserify](http://browserify.org/) or [webpack](https://webpack.js.org/).  You are responsible yourself to include all scripts - inline and external - in the right order!

## Adding CSS and JavaScript From Inside Markdown

There is one gotcha! The view templates are used in the second pass of the content processing, when the output of the Markdown process is wrapped.  Consequently, there is no variable `global` while processing Markdown, and to make things worse, Template Toolkit does not even warn you about that.

There is a simple solution though.  Change `_views/functions/setup.tt` to read like this:

```tt2
[%- global = config.global -%]
[%- IF asset.scripts %][% global.scripts.push(assets.scripts) %][% END -%]
[%- IF asset.styles %][% global.scripts.styles(assets.styles) %][% END -%]
```

Now you can do the following in your Markdown documents:

```tt2
---
...
scripts: /assets/js/carousel.js
---
... Markdown following ...
[% asset.scripts.push('/assets/js/counter.js') %]
```

Now, when the HTML wrapper is rendered, the scripts are added to the global variables.  Adding CSS is done in the same way.

## Cache Busting

You may have noticed that the code that renders the links to the JavaScript and CSS files into the page, add a question mark followed by some decimal number to the links:

```html
<script src="/assets/js/site.js?1522333201" type="text/javascript"></script>
```

The number after the question mark is the unix timestamp of the file in question.  The parameter is completely ignored by the web server when serving the file but browsers will use it, when deciding whether to request the file again, or use a version from the cache.  This technique is known as *cache busting*.

You can use the same function anywhere yourself:

```tt2
[% USE q = Qgoda %]
<img src="[% q.bustCache('/assets/images/clock.svg') %]"
     alt="An analog clock">
```

You can move on to [@ q.anchor(name = 'listings') @] from here!
