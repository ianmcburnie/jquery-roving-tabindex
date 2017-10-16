/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

jasmine.DEFAULT_TIMEOUT_INTERVAL = 500;

// called by every test suite
function setupSuite(html, options) {
    // setup dom
    $('body').empty().html(html);

    // setup globals
    $widget = $('[role=menu]');
    $rovingItems = $widget.find('[role=menuitem]');

    onRovingTabindexChange = jasmine.createSpy('onRovingTabindexChange');

    // execute plugin on widget
    $widget.rovingTabindex('[role=menuitem]', options);

    // setup event handlers on widget
    $widget.on('rovingTabindexChange', '[role=menuitem]', onRovingTabindexChange);
}
