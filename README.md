# Qgoda-essential

Minimalistic theme for Qgoda with a development web server, listings, and
paging

## Description

This theme contains a minimalistic setup to start a Qgoda project with.
It differs from the theme
[qgoda-minimal](https://github.com/gflohr/qgoda-minimal) in that it
also provides a development web server with automatic page reloading,
uses listings and paging.

## Requirements

### Qgoda

You need [qgoda](http://www.qgoda.net/).  See
http://www.qgoda.net/en/docs/installation/ for instructions.

### NPM

You also need the [node package manager NPM](https://www.npmjs.com/).

You can, of course, follow the
[official installation instructions](https://docs.npmjs.com/getting-started/installing-node)
for npm but chances are that your local package manager (Mac Ports/Homebrew
for Mac OS or rpm, apt-get, emerge, yum, ... for Linux) has npm available
as a pre-built package for you.

Please note that you currently cannot use yarn instead of npm.  You can
easily switch to yarn later but the installation of the package requires
npm.

## Usage

There is no need to clone this repository unless you want to extend it!

The theme can be used like this:

```shell
$ mkdir qgoda-served
$ cd qgoda-served
$ qgoda init gflohr/qgoda-served
... a lot of output ...
$ qgoda watch
```

This will install the theme in the newly created directory `qgoda-served`
and build the site in the directory `_site`.  It should also start a
web server listening on port 3000 and open the start page `_site/index.html`
in your default web browser.

Try `qgoda-dev init --help` for more information about installing Qgoda
themes.

## Documentation

Like all well-designed Qgoda themes, the example content that ships with
the theme (these are the `.md` markdown files) contains the documentation.
So just follow the usage instructions above, and read on. 
