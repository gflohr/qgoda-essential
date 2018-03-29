---
title: Configuration
name: configuration
date: 2018-03-20
tags: [ General, Configuration ]
---
[% USE q = Qgoda %]
Qgoda's main configuration file is `_config.yaml`.  Note that you currently have to [restart Qgoda]([% q.linkPost(name = 'starting-qgoda') %]) in order to take changes to the configuration into effect.

The source of the configuration comes from the theme file [`_init.yaml`](https://github.com/gflohr/qgoda-essential/blob/master/_init.yaml) that does not get installed with the theme.  Instead, it is used for initializing `_config.yaml` or gets merged into an already existing `_config.yaml`.

## Defaults

You can set some default variables for documents from within `_config.yaml`:

```yaml
defaults:
  - files:
      - '*.md'
    values:
      author: Guido Flohr
      lingua: en-us
      organization: cantanea EOOD
      type: post
  - files:
      - index.md
      - index-*.md
    values:
      priority: -1
      type: page
```

This sets default values for the variables `author`, `lingua`, `organization`, and `type` for all files ending in `.md` (that are all markdown documents).

The variable `lingua` is universally used in Qgoda for holding a standard HTTP language identifier like `en-US` or `de-DE` or the like as set forth in [RFC5646](http://www.rfc-editor.org/rfc/rfc5646.txt).  Although this theme is a single-language theme, it is strongly recommended to set the language of the content contained.  This is not only good practice:
[% TAGS [@ @] %]

```html
<!doctype html>
<html lang="[% asset.lingua %]">
...
```

[@ TAGS [% %] @]
It also simplifies a future migration to a multi-language site, and you never know, do you?

The next rule for `index.md` and `index-*.md` overrides the value `type` for these documents, and also sets the rendering priority for these documents.  See [% q.anchor(name = 'listings') %] for an explanation of the variable `priority`.

You can find a detailed explanation for setting document defaults in `_config.yaml` at http://www.qgoda.net/en/docs/defaults.html.

## Markdown Processor Chain

As described in [[% q.xref('title', name = 'installation') %]]([% q.linkPost(name = 'installation') %]#hoedown), it is preferable to use the Hoedown markdown processor instead of the regular one.  This is achieved by re-configuring the processor chain for markdown files:

```yaml
processors:
  chains:
    markdown:
      modules:
      - TT2
      - Hoedown
```

That boils down to: Use the processor module `TT2` ([Template Toolkit](http://www.template-toolkit.org/)) and then the module `Hoedown` for processing markdown files.  See http://www.qgoda.net/en/docs/processor-chains/ for a more in-depth explanation of processor chains.

## Site Title

The configuration variable `title` is by convention used for giving a title to the entire site.  You will probably want to change that value.

## Helpers

[Helpers](http://www.qgoda.net/en/docs/) are programs that are started in parallel to Qgoda in watch mode.  This theme only uses one helper:

```yaml
helpers:
  browser-sync: npm run server
```

The helper with the symbolic name `browser-sync` will issue the command `npm run server` which starts a web server.  If you want to enhance the site design with more tools from the [NodeJS](https://nodejs.org/en/) eco system, for example [Webpack](https://webpack.js.org/)
, [Gulp](https://gulpjs.com/), or [Grunt](https://gruntjs.com/), you will probably want to extend that to:

```yaml
helpers:
  webpack: npm start
  browser-sync: npm run server
```
See [% q.anchor(name = 'nodejs') %] for more information.

## Template Globals

This section:

```yaml
global:
  scripts:
    - /assets/js/site.js
  styles:
    - /assets/css/styles.css
```

Please refer to [% q.anchor(name = 'template-setup') %] for more information.

## Other Configuration Variables

See http://www.qgoda.net/en/docs/configuration-variables/ for a complete list of configuration variables.
