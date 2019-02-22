# Dashed Border Generator
A simple online tool for creating custom dashed or dotted borders.
It generates a small CSS that can be applied to any DOM elements.

The tool uses a trick with SVG image inside "background-image" property, 
and unlike the `border-style: dashed` property, 
can change distance between dashed lines, 
set custom pattern, add dash offset or even change a line cap.

## [View in Action](http://kovart.github.io/dashed-border-generator/)
![intro](./intro.png)

## Dependencies
* [VueJS](https://github.com/vuejs/vue)
* [Bootstrap 4](https://github.com/twbs/bootstrap)
* [vue-color](https://github.com/xiaokaike/vue-color)
* [mini-svg-data-uri](https://github.com/tigt/mini-svg-data-uri)

## License
[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2019-present, Artem Kovalchuk