# @ebay/jquery-roving-tabindex

<p>
    <a href="https://travis-ci.org/ianmcburnie/jquery-roving-tabindex"><img src="https://api.travis-ci.org/ianmcburnie/jquery-roving-tabindex.svg?branch=master" alt="Build Status" /></a>
    <a href='https://coveralls.io/github/ianmcburnie/jquery-roving-tabindex?branch=master'><img src='https://coveralls.io/repos/ianmcburnie/jquery-roving-tabindex/badge.svg?branch=master&service=github' alt='Coverage Status' /></a>
</p>

jQuery collection plugin that implements a roving keyboard tabindex

```js
$(collection).rovingTabindex(id, [options]);
```

## Experimental

This plugin is still in an experimental state, until it reaches v1.0.0 you must consider all minor releases as breaking changes. Patch releases may introduce new features, but will be backwards compatible.

## Install

```js
npm install @ebay/jquery-roving-tabindex
```

## Params

* id : a unique id, usually the id of the collection container element

## Options

* wrap: reaching end of collection will wrap back to beginning, and vice versa
* axis: x, y or both (default)
* activeIndex: index of the item that receives tabindex on init (default is 0)

## Events

* rovingTabindexChange : fired when collection's roving tabindex changes
* nextRovingTabindex : move tab index to next collection item
* prevRovingTabindex : move tab index to prev collection item

## Example

Input:

```html
<ul id="tabs_0" role="tablist">
    <li role="tab">Tab 1</li>
    <li role="tab">Tab 1</li>
    <li role="tab">Tab 1</li>
</ul>
```

```js
$('#tabs_0 > li').rovingTabindex('tabs_0');
```

Output:

```html
<ul id="tabs_0" role="tablist">
    <li role="tab" data-tabs_0="{"rovingtabindex":0}" tabindex="0">Tab 0</li>
    <li role="tab" data-tabs_0="{"rovingtabindex":1}">Tab 1</li>
    <li role="tab" data-tabs_0="{"rovingtabindex":2}">Tab 2</li>
</ul>
```


To listen for roving tabindex change:

```js
$('#tabs_0 > li').on('rovingTabindexChange', function(e, newTabindexItem) {});
```

## Dependencies

* [jquery](https://jquery.com/)
* [jquery-common-keydown](https://github.com/ianmcburnie/jquery-common-keydown)

## Development

Run `npm start` for test driven development. All tests are located in `test.js`.

Execute `npm run` to view all available CLI scripts:

* `npm start` test driven development: watches code and re-tests after any change
* `npm test` runs tests & generates reports (see reports section below)
* `npm run lint` lints code and reports to jshint.txt
* `npm run minify` builds minified version of code
* `npm run build` cleans, lints, tests and minifies (called on `npm prepublish` hook)
* `npm run clean` deletes all generated test reports and coverage files

## Reports

Each test run will generate the following reports:

* `/test_reports/coverage` contains Istanbul code coverage report
* `/test_reports/html` contains HTML test report
* `/test_reports/junit` contains JUnit test report

## CI Build

https://travis-ci.org/ianmcburnie/jquery-roving-tabindex

## Code Coverage

https://coveralls.io/github/ianmcburnie/jquery-roving-tabindex?branch=master
