# jquery-roving-tabindex

<p>
    <a href="https://travis-ci.org/ianmcburnie/jquery-roving-tabindex"><img src="https://api.travis-ci.org/ianmcburnie/jquery-roving-tabindex.svg?branch=master" alt="Build Status" /></a>
    <a href='https://coveralls.io/github/ianmcburnie/jquery-roving-tabindex?branch=master'><img src='https://coveralls.io/repos/ianmcburnie/jquery-roving-tabindex/badge.svg?branch=master&service=github' alt='Coverage Status' /></a>
    <a href="https://david-dm.org/ianmcburnie/jquery-roving-tabindex"><img src="https://david-dm.org/ianmcburnie/jquery-roving-tabindex.svg" alt="Dependency status" /></a>
    <a href="https://david-dm.org/ianmcburnie/jquery-roving-tabindex#info=devDependencies"><img src="https://david-dm.org/ianmcburnie/jquery-roving-tabindex/dev-status.svg" alt="devDependency status" /></a>
</p>

jQuery collection plugin that implements one or two dimensional roving keyboard tabindex on the items of a widget.


```js
$(widget).rovingTabindex(rovingItems, [options]);
```

## Experimental

This plugin is still in an experimental state, until it reaches v1.0.0 you must consider all minor releases as breaking changes. Patch releases may introduce new features, but will be backwards compatible.

## Install

```js
npm install jquery-roving-tabindex
```

## Example - One Dimensional

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
    <li role="tab">Tab 1</li>
    <li role="tab">Tab 2</li>
</ul>
```

First down arrow key will update DOM to:

```html
<ul role="tablist">
    <li role="tab">Tab 0</li>
    <li role="tab" tabindex="0">Tab 1</li>
    <li role="tab">Tab 2</li>
</ul>
```

Next down arrow key will update DOM to:

```html
<ul role="tablist">
    <li role="tab">Tab 0</li>
    <li role="tab" tabindex="-1">Tab 1</li>
    <li role="tab">Tab 2</li>
</ul>
```

To listen for roving tabindex changes:

```js
$('.widget').on('rovingTabindexChange', 'li', function(e, data) {
    // this = new roving tab li element
    // data = {fromIndex: n, toIndex: n}
});
```

## Example - Two Dimensional

HTML:

```html
<div class="widget">
    <table>
        <tbody>
            <tr><td>1</td><td>2</td><td>3</td></tr>
            <tr><td>4</td><td>5</td><td>6</td></tr>
            <tr><td>7</td><td>8</td><td>9</td></tr>
        </tbody>
    </table>
</div>
```

Execute plugin:

```js
$('.widget').rovingTabindex('td', {isGrid: true});
```

## Params

* rovingItems: selector that identifies the descendant collection that requires a roving tab index
* options.activeIndex: index of the item that receives tabindex on init (default: 0)
* options.autoFocus: specify whether to set focus to the new roving tab index item (default: true)
* options.isGrid: specify two-dimensional navigation (default: false)
* options.wrap: reaching end of collection will wrap back to beginning, and vice versa
* options.axis: x, y or both (default)

## Events

* rovingTabindexChange : fired when collection's roving tabindex changes
* rovingTabindexItemsChange : trigger when collection changes

## Dependencies

* [jquery](https://jquery.com/)
* [jquery-linear-navigation](https://github.com/ianmcburnie/jquery-linear-navigation)

## Development

Run `npm start` for test driven development. All tests are located in `test.js`.

Execute `npm run` to view all available CLI scripts:

* `npm start` starts local server and syncs browser on any code change
* `npm tdd` test driven development: watches code and re-tests after any change
* `npm test` runs tests & generates reports (see reports section below)
* `npm run lint` lints code for syntax and style
* `npm run fix` attempts to auto fix style errors
* `npm run build` minifies code and generates jsdocs

The following hooks exist, and do not need to be invoked manually:

* `npm prepublish` cleans, lints, tests and builds on every `npm publish` and `npm install` command
* `pre-commit` cleans, lints, tests and builds on every `git commit` command

## CI Build

https://travis-ci.org/ianmcburnie/jquery-roving-tabindex

## Code Coverage

https://coveralls.io/github/ianmcburnie/jquery-roving-tabindex?branch=master

## Test Reports

Local test reports are generated under `test_reports` folder.

## JSDocs

Local JSDocs are generated under `jsdoc` folder.
