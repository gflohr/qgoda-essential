---
title: Site Structure
name: site-structure
order: f
tags: [ General, Files and Directories ]
---
The files and directories in this Qgoda project follow a pretty standard
structure for a Qgoda site:

```shell
_config.yaml
_site
_views/
  components/
    archive/
      aside.html
    listing.html
    pagination.html
    taglist.html
    default.html
  functions/
    scripts.tt
    setup.tt
    styles.tt
  partials/
    body/
      aside.html
      footer.html
      header.html
      nav.html
      taglist.html
    body.html
    head.html
  wrappers/
archive/
assets/
docs/
tags/
```

## `_config.yaml`

