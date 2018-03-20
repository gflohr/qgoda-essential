---
title: Qgoda Minimal
name: home
location: /index.html
---
This is an absolutely minimal project seed for [Qgoda](http://www.qgoda.net/).

See [https://github.com/[% config.theme_repo %]](https://github.com/[% config.thme_repo %])
for instructions how to use this theme.

## Structure

This theme installs only three files:

### `_config.yaml`

The Qgoda configuration.  You should edit it to your needs.

### `_views/default.html`

The default template for rendering.  Faithful to the name of the theme
it is also absolutely minimalistic.  See the source code!

### `index.md`

You are reading it.

## Updating

You can update an existing site to a newer version of the theme in two
ways:

```shell
$ qgoda init [% config.theme_repo %] 
```

or with

```shell
$ qgoda init --force [% config.theme_repo %]
```

The latter will overwrite the site configuration `_config.yaml` and
templates.

If you also want to overwrite markdown documents, give the option `--force`
twice:

```shell
$ qgoda init --force --force [% config.theme_repo %]
```
