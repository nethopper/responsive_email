# Responsive email base repo

This repository holds a basic responsive email template as well as a [gulp.js](http://gulpjs.com/) setup to make developing emails easier and quicker.

The `gulp watch` task looks for changes in all *.html files in the root folder. It inlines the CSS removing all `<link>` tags from the head, but leaving `<style>` tags. The inlined files go to the `inlined` folder.

It then creates a `inlined.zip` archive in the root, which holds all the contents of the `inlined` folder.
