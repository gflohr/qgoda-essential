---
title: Installation
name: installation
date: 2018-04-03
tags: [ General, Installation ]
---
[% USE q = Qgoda %]
You can install and update this theme with Qgoda itself.  Depending on your
needs, you can specify to what degree Qgoda should overwrite existing files.

## Prerequisites

### Qgoda

You probably already have [installed Qgoda](http://www.qgoda.net/en/docs/installation/), if not follow the [instructions on the Qgoda website](http://www.qgoda.net/en/docs/installation/).

### Hoedown

You also need a [Markdown](https://daringfireball.net/projects/markdown/syntax) processor.  The [default Markdown processor](http://search.cpan.org/~bobtfish/Text-Markdown/) that is installed with Qgoda has a number of limitations, among them that it does not render *fenced code blocks* like the following correctly:

`````markdown
```css
/* Specify a default font family and style.  */
body {
    font-family: Arial, Helvetica, Sans-Serif;
    font-weight: normal;
}
```
`````

In order to support these Markdown extensions you have to install Hoedown in one of these ways:

```shell
$ cpan install Text::Markdown::Hoedown
$ cpanm install Text::Markdown::Hoedown
```

You may have to precede the command with `sudo` if you do not have sufficient privileges to install Perl modules.  If none of the above succeeds, please see https://www.cpan.org/modules/INSTALL.html for more information.

If you do not plan to use fenced code blocks, you may still prefer Hoedown over the regular Markdown processor because of better performance.

### NPM

[NPM](https://www.npmjs.com/) is the [NodeJS](https://nodejs.org/en/) package manager.  Your vendor will most probably offer a pre-built binary for `npm` which usually gets installed with `node`.  Otherwise, see https://www.npmjs.com/get-npm for more information.

## Initial Installation

You can install the theme directly from the internet with this command:

```shell
$ mkdir SOME_DIRECTORY
$ cd SOME_DIRECTORY
$ qgoda init [% config.theme_repo %]
```

This will download the theme files and initialize the site.  This may take a couple of minutes because it will also do a local install of tools from the NodeJS eco system.

## Upgrading

This theme is rather a starting point for own site layouts, then a theme.  You will therefore have little reason to ever upgrade the theme.  But if you feel like it, you can do so by invoking `qgoda init` again:

```shell
$ cd SOME_DIRECTORY
$ qgoda init [% config.theme_repo %]
```

This will overwrite all existing view templates with new versions.

You can also go a little bit further than that:

```shell
$ cd SOME_DIRECTORY
$ qgoda init --force [% config.theme_repo %]
```

This will also overwrite the [configuration]([% q.llinkPost(name = 'configuration') %]) file `_config.yaml`.  More precisely, it will merge the new upstream version into your local configuration.

Finally, you can also specify `--force` twice:

```shell
$ cd SOME_DIRECTORY
$ qgoda init --force --force [% config.theme_repo %]
```

This will now also *precious* files.  Only Markdown files that ship with this theme are considered "precious".

Try `qgoda init --help` for even more options.
