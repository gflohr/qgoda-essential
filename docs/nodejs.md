---
title: NodeJS
name: nodejs
date: 2018-01-01
tags: [ General, NodeJS, JavaScript, CSS, Helpers ]
---
This theme has focused on Qgoda features, and how to use them for generating web sites with very flexible structures.  For serious web development, you will want to improve the way JavaScript, CSS, and other resource are processed and handled.  Fortunately, it is very simple to integrate all kinds of tools from the [nodejs](https://nodejs.org/en/) eco system into your Qgoda site.

The first step should be editing `package.json`.  It currently contains only one script entry "server" for starting the development web server [Browsersync](https://browsersync.io/).  You should add the script(s) for your development environment:

```json
"scripts": {
    "preserver": "yarn install",
    "server": "browser-sync start --server _site --files _timestamp",
    "prebuild": "yarn install",
    "build": "webpack --progress --colors",
    "prestart": "yarn install",
    "start": "webpack --progress --colors",
    "test": "echo \"Error: no test specified\"; exit 1"
}
```

Note that Browsersync is instructed to only watch the file `_timestamp` for changes and reload pages in the connected browsers.  The file `_timestamp` will be updated by Qgoda only, after a site has been completely rebuilt.  Letting the web server only watch that timestamp file avoids annoying rebuild loops of the tools involved.

Running `yarn start` or `npm start` in another terminal window will now fire up webpack and let you bundle all your assets.  But it is easier to let Qgoda run this automatically.  Change [`_config.yaml`]([% q.link(name = 'configuration') %]) and add a second helper:

```yaml
helpers:
  yarn: yarn start
  browser-sync: yarn run server
```

Restart qgoda, and that's it.  Qgoda, webpack, and Browsersync all run in parallel, updating stuff only when needed.

If you don't feel like implementing everything from scratch, you may consider installing the theme [qgoda-default](https://github.com/gflohr/qgoda-default/) which contains a complete setup with [webpack](https://webpack.js.org/), [Browsersync](https://browsersync.io/), [Twitter Bootstrap](https://getbootstrap.com/), [PostCSS](http://postcss.org/), syntax highlighting with [PrismJS](http://prismjs.com/) and even CSS modules.