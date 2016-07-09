# jquery-roving-tabindex

<p>
    <a href="https://travis-ci.org/ianmcburnie/jquery-roving-tabindex"><img src="https://api.travis-ci.org/ianmcburnie/jquery-roving-tabindex.svg?branch=master" alt="Build Status" /></a>
    <a href='https://coveralls.io/github/ianmcburnie/jquery-roving-tabindex?branch=master'><img src='https://coveralls.io/repos/ianmcburnie/jquery-roving-tabindex/badge.svg?branch=master&service=github' alt='Coverage Status' /></a>
    <a href="https://david-dm.org/ianmcburnie/jquery-roving-tabindex"><img src="https://david-dm.org/ianmcburnie/jquery-roving-tabindex.svg" alt="Dependency status" /></a>
    <a href="https://david-dm.org/ianmcburnie/jquery-roving-tabindex#info=devDependencies"><img src="https://david-dm.org/ianmcburnie/jquery-roving-tabindex/dev-status.svg" alt="devDependency status" /></a>
</p>

jQuery collection plugin that implements one-dimensional roving keyboard tabindex on the items of a widget.

NOTE: This plugin is not suitable for two-dimensional grid navigation.

```js
$(widget).rovingTabindex(rovingItems, [options]);
```

## Experimental

This plugin is still in an experimental state, until it reaches v1.0.0 you must consider all minor releases as breaking changes. Patch releases may introduce new features, but will be backwards compatible.

## Install

<strike>
```
npm install @ebay/jquery-roving-tabindex
```
</strike>

```js
npm install jquery-roving-tabindex
```

**NOTE: The @ebay package scope is no longer supported. In order to receive latest NPM updates, please use the non-scoped version of this package.**

## Example

HTML:

```html
<ul role="tablist">
    <li role="tab">Tab 1</li>
    <li role="tab">Tab 2</li>
    <li role="tab">Tab 3</li>
</ul>
```

Execute plugin:

```js
$('[role=tablist]').rovingTabindex('[role=tab]');
```

Output:

```html
<ul role="tablist">
    <li role="tab" tabindex="0">Tab 0</li>
    <li role="tab" tabindex="-1">Tab 1</li>
    <li role="tab" tabindex="-1">Tab 2</li>
</ul>
```

First down arrow key will update DOM to:

```html
<ul role="tablist">
    <li role="tab" tabindex="-1">Tab 0</li>
    <li role="tab" tabindex="0">Tab 1</li>
    <li role="tab" tabindex="-1">Tab 2</li>
</ul>
```

Next down arrow key will update DOM to:

```html
<ul role="tablist">
    <li role="tab" tabindex="-1">Tab 0</li>
    <li role="tab" tabindex="-1">Tab 1</li>
    <li role="tab" tabindex="0">Tab 2</li>
</ul>
```

Clicking a roving item with mouse or touch will also update the roving tab index.

To listen for roving tabindex changes:

```js
$('.tabs').on('rovingTabindexChange', function(e, newTabindexItem) {
    // do something
});
```

## Params

* rovingItems: selector that identifies the descendant collection that requires a roving tab index

## Options

* wrap: reaching end of collection will wrap back to beginning, and vice versa
* axis: x, y or both (default)
* activeIndex: index of the item that receives tabindex on init (default is 0)
* setFocus: by default, the plugin will set focus to the new roving tab index

## Events

* rovingTabindexChange : fired when collection's roving tabindex changes

## Dependencies

* [jquery](https://jquery.com/)
* [jquery-linear-navigation](https://github.com/ianmcburnie/jquery-linear-navigation)

## Development

Run `npm start` for test driven development. All tests are located in `test.js`.

Execute `npm run` to view all available CLI scripts:

* `npm start` test driven development: watches code and re-tests after any change
* `npm test` runs tests & generates reports (see reports section below)
* `npm run lintsyntax` lints code for syntax and style (reports errors to jshint.txt)
* `npm run lintstyle` lints code for syntax (reports errors to jscs.txt)
* `npm run lint` lints code for syntax and style
* `npm run fixstyle` attempts to auto fix style errors
* `npm run minify` builds minified version of code
* `npm run jsdoc` generates jsdocs
* `npm run build` minifies code and generates jsdocs
* `npm run clean` deletes all generated files

The following hooks exist, and do not need to be invoked manually:

* `npm prepublish` cleans, lints, tests and builds on every `npm publish` command
* `pre-commit` cleans, lints, tests and builds on every `git commit` command

## CI Build

https://travis-ci.org/ianmcburnie/jquery-roving-tabindex

## Code Coverage

https://coveralls.io/github/ianmcburnie/jquery-roving-tabindex?branch=master

## Test Reports

Local test reports are generated under `test_reports` folder.

## JSDocs

Local JSDocs are generated under `jsdoc` folder.
