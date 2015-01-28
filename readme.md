# Responsive email base repo

This repository holds a basic responsive email template as well as a [gulp.js](http://gulpjs.com/) setup to make developing emails easier and quicker.

The `gulp watch` task looks for changes in all \*.html files in the root folder and processes them to create compiled, inlined and minified final files. All the processed files are output to directiories under `build/`. It performs the following tasks:
1. compiles the Nunjucks templates
2. inlines the CSS
3. minifies the HTML
4. packages the result as a `.zip`.

### Getting started

1. Clone the repo
2. Run `npm install` to install gulp and its required plugins
3. Run `gulp`
4. Start writing your email - the html files will be watched for changes and the email will be rebuilt on save.

### Nunjucks templates
[Nunjucks](http://mozilla.github.io/nunjucks/) templates are used to make developing emails more modular and the emails themselves more maintainable. They provide handy functionality, such as variables, macros and include. For more information [read the docs](http://mozilla.github.io/nunjucks/templating.html).

### CSS inlining
Many email clients do not play well with CSS in the `<head>` section of the email. Gmail, for example, removes all styles from the `<head>` section. Maintaining emails with styles in the element attributes is a source of great pain. The solution used here is to write all styles in the `<head>` and inline them before distribution. This is done automatically by the [gulp-inline-css](https://www.npmjs.org/package/gulp-inline-css) plugin. The `inline` gulp task removs all `<link>` tags from the head, but leaves `<style>` tags. The inlined files go to the `inlined` folder.

### Minifying HTML
Whitespace may cause issues in some email clients, most notably Outlook, such as blank lines between tables. The HTML is minified to get rid of whitespace between tags.

### Zip packaging
The final output is packaged as a zip file together with images, to be easy to upload to testing and other services.

## Snippets

### Header text on image
Centers short, header-type text on top of an image. The image is set as a background image, except in Outlook '07+, where the text must be part of the image file.

### Footer text on image
Implements an element which can contain responsive text on top of a background image. The assumption is that we would like to make sure that part of the image is not obscured, while the rest can be. If the text does not fit next to the important part of the image, it drops below it.

Supports clients which do not play well with background images, such as Outlook '07+. Where background-image is not supported, an image that contains the text should be used.

### Mailchimp required footer
Contains the Mailchimp merge tags required by them and the CAN-SPAM Act in order for email to not be classified as spam. Mailchimp will append their own footer to your email if these tags are not present. For more information look [here](http://kb.mailchimp.com/campaigns/design/customize-the-footer).
