// Example JavaScript file for qgoda-essential.

// Remove the "no-js" class from the html attribute.
var html = document.getElementsByTagName('html').item(0);
if (html) {
    html.className = html.className.replace(/^no-js$/, '');

    // Or if support for really old browsers and IE9 is not an issue:
    //html.classList.remove('no-js');
}
