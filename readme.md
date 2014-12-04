# Responsive email base repo

This repository holds a basic responsive email template as well as a [gulp.js](http://gulpjs.com/) setup to make developing emails easier and quicker.

The `gulp watch` task looks for changes in all \*.html files in the root folder and processes them to create compiled, inlined and minified final files. All the processed files are output to directiories under `build/`. It performs the following tasks:
1. compiles the Nunjucks templates
2. inlines the CSS
3. minifies the HTML
4. packages the result as a `.zip`.

### Nunjucks templates
[Nunjucks](http://mozilla.github.io/nunjucks/) templates are used to make developing emails more modular and the emails themselves more maintainable. They provide handy functionality, such as variables, macros and include. For more information [read the docs](http://mozilla.github.io/nunjucks/templating.html).

### CSS inlining
Many email clients do not play well with CSS in the `<head>` section of the email. Gmail, for example, removes all styles from the `<head>` section. Maintaining emails with styles in the element attributes is a source of great pain. The solution used here is to write all styles in the `<head>` and inline them before distribution. This is done automatically by the [gulp-inline-css](https://www.npmjs.org/package/gulp-inline-css) plugin. The `inline` gulp task removs all `<link>` tags from the head, but leaves `<style>` tags. The inlined files go to the `inlined` folder.

### Minifying HTML
Whitespace may cause issues in some email clients, most notably Outlook, such as blank lines between tables. The HTML is minified to get rid of whitespace between tags.

### Zip packaging
The final output is packaged as a zip file together with images, to be easy to upload to testing and other services.

## Snippets

### Mailchimp required footer
Contains the Mailchimp merge tags required by them and the CAN-SPAM Act in order for email to not be classified as spam. Mailchimp will append their own footer to your email if these tags are not present. For more information look [here](http://kb.mailchimp.com/campaigns/design/customize-the-footer).
