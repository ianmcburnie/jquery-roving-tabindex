/**
 * @file jQuery collection plugin that implements one or two dimensional roving keyboard tabindex on selected descendant roving items
 * @author Ian McBurnie <ianmcburnie@hotmail.com>
 * @version 0.11.1
 * @requires jquery
 * @requires jquery-linear-navigation
 * @requires jquery-grid-navigation
 * @requires jquery-prevent-scroll-keys
 */
(function($, window, document, undefined) {
    var pluginName = 'jquery-roving-tabindex';

    /**
    * @method "jQuery.fn.rovingTabindex"
    * @param {Object} rovingItems - descendant items that will receive roving tabindex state
    * @param {Object} [options]
    * @param {string} [options.activeIndex] - specify the initial active item by index position (default: 0)
    * @param {boolean} [options.autoFocus] - set focus when roving tab index changes (default: true)
    * @param {boolean} [options.autoInit] - set initial tabindex when plugin executes (default: true)
    * @param {boolean} [options.autoReset] - reset tabindex state when focus leaves widget (default: false)
    * @param {string} [options.axis] - set arrow key axis to x, y or both (default: both)
    * @param {boolean} [options.autoWrap] - keyboard focus wraps from last to first & vice versa (default: true)
    * @fires rovingTabindexChange - when roving tabindex changes
    * @listens rovingTabindexItemsChange - when DOM has changed
    * @return {Object} chainable jQuery class
    */
    $.fn.rovingTabindex = function rovingTabindex(rovingItemsSelector, options) {
        options = $.extend({
            activeIndex: 0,
            autoFocus: true,
            autoInit: true,
            autoReset: false,
            autoWrap: false,
            axis: 'both',
            disableHomeAndEndKeys: false,
            isGrid: false
        }, options);

        return this.each(function onEachMatchedEl() {
            var $widget = $(this);
            var $rovingItems = $widget.find(rovingItemsSelector);
            var numRovingItems = $rovingItems.length;

            // Maintain tabindex attribute state
            function updateTabindex($fromEl, $toEl) {
                $fromEl.removeAttr('tabindex');
                $toEl.attr('tabindex', '0');
            }

            // call linearNavigation plugin. This plugin holds state.
            if (options.isGrid === true) {
                $widget.gridNavigation(rovingItemsSelector, options);
            } else {
                $widget.linearNavigation(rovingItemsSelector, options);
            }

            // use plugin to prevent arrow keys from scrolling page
            $widget.preventScrollKeys(rovingItemsSelector);

            // listen to linearNavigationChange event
            $widget.on('linearNavigationInit gridNavigationInit linearNavigationChange gridNavigationChange', function(e, data) {
                var fromIndex = data.fromIndex;
                var toIndex = data.toIndex;
                var $roveFromEl = $rovingItems.eq(fromIndex);
                var $roveToEl = $rovingItems.eq(toIndex);

                updateTabindex($roveFromEl, $roveToEl);

                if (e.type !== 'linearNavigationInit' && e.type !== 'gridNavigationInit') {
                    if (options.autoFocus === true) {
                        // voiceover works better when setting focus after short timeout
                        setTimeout(function() {
                            $rovingItems.eq(toIndex).focus();
                        }, 0);
                    }
                    $roveToEl.trigger('rovingTabindexChange', {fromIndex: fromIndex, toIndex: toIndex});
                }
            });

            // listen for change to roving tab index items
            $widget.on('rovingTabindexItemsChange', function(e) {
                // find the new items and update our cache
                $rovingItems = $widget.find(rovingItemsSelector);

                numRovingItems = $rovingItems.length;

                // update the state
                if (options.isGrid === true) {
                    $widget.trigger('gridNavigationItemsChange');
                } else {
                    $widget.trigger('linearNavigationItemsChange');
                }
            });
        });
    };
}(jQuery, window, document));

/**
* The jQuery plugin namespace.
* @external "jQuery.fn"
* @see {@link http://learn.jquery.com/plugins/|jQuery Plugins}
*/

/**
* rovingTabindexChange event
* @event rovingTabindexChange
* @type {object}
* @property {object} event - event object
* @property {object} data - event data
*/

/**
* rovingTabindexItemsChange event
* @event rovingTabindexItemsChange
* @type {object}
* @property {object} event - event object
* @property {object} data - event data
*/
