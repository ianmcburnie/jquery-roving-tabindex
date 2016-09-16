/**
 * @file jQuery collection plugin that implements one dimensional roving keyboard tabindex on selected descendant roving items
 * @author Ian McBurnie <ianmcburnie@hotmail.com>
 * @version 0.9.1
 * @requires jquery
 */
(function($, window, document, undefined) {
    var pluginName = 'jquery-roving-tabindex';

    /**
    * @method "jQuery.fn.rovingTabindex"
    * @param {Object} rovingItems - descendant items that will receive roving tabindex state
    * @param {Object} [options]
    * @param {string} [options.axis] - set arrow key axis to x, y or both (default: both)
    * @param {boolean} [options.wrap] - keyboard focus wraps from last to first & vice versa (default: true)
    * @param {string} [options.activeIndex] - specify the initial active item by index position (default: 0)
    * @param {string} [options.setFocus] - set focus when roving tab index changes (default: true)
    * @fires rovingTabindexChange - when roving tabindex changes
    * @return {Object} chainable jQuery class
    */
    $.fn.rovingTabindex = function rovingTabindex(rovingItemsSelector, options) {
        options = $.extend({
            axis: 'both',
            wrap: true,
            activeIndex: 0,
            setFocus: true
        }, options);

        return this.each(function onEachMatchedEl() {
            var $widget = $(this);
            var $rovingItems = $widget.find(rovingItemsSelector);
            var numRovingItems = $rovingItems.length;

            // an update to rovingtabindex requires the fromIndex and toIndex
            function update(fromIndex, roveToIndex) {
                var $roveFromEl = $rovingItems.eq(fromIndex);
                var $roveToEl = $rovingItems.eq(roveToIndex);

                $roveFromEl.removeAttr('tabindex');
                $roveToEl.attr('tabindex', '0');

                if (options.setFocus === true) {
                    // voiceover works better when setting focus after short timeout
                    setTimeout(function() {
                        $roveToEl.focus();
                    }, 0);
                }

                $widget.trigger('rovingTabindexChange', $roveToEl);
            }

            // one item must be in tabindex
            $rovingItems.eq(options.activeIndex).attr('tabindex', '0');

            // call linearNavigation plugin. This plugin holds state.
            $widget.linearNavigation(rovingItemsSelector, options);

            // listen to linearNavigationChange event
            $widget.on('linearNavigationChange', function(e, data) {
                update(data.fromIndex, data.toIndex);
            });

            // listen for change to roving tab index items
            $widget.on('rovingTabIndexItemsChange', function(e) {
                // find the new items
                $rovingItems = $widget.find(rovingItemsSelector);

                // call the linearNavigation plugin again
                $widget.linearNavigation(rovingItemsSelector, options);
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
* @property {object} newRovingItem - new roving item element
*/
