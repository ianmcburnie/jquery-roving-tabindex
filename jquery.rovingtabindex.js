/**
 * @file jQuery collection plugin that implements one dimensional roving keyboard tabindex on selected descendant roving items
 * @author Ian McBurnie <ianmcburnie@hotmail.com>
 * @version 0.8.1
 * @requires jquery
 * @requires jquery-common-keydown
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
    $.fn.rovingTabindex = function rovingTabindex(rovingItems, options) {
        options = $.extend({
            axis: 'both',
            wrap: true,
            activeIndex: 0,
            setFocus: true
        }, options);

        return this.each(function onEachMatchedEl() {
            var $widget = $(this);
            var $rovingItems = $widget.find(rovingItems);
            var numRovingItems = $rovingItems.length;
            var currentItemIndex = options.activeIndex;

            // ensure item index is not out of bounds
            // todo: ensure item index is an integer
            if (currentItemIndex >= numRovingItems) {
                currentItemIndex = 0;
            }

            function updateModel(roveToIndex) {
                var $roveFromEl = $rovingItems.eq(currentItemIndex);
                var $roveToEl = $rovingItems.eq(roveToIndex);

                $roveFromEl.removeAttr('tabindex');
                $roveToEl.attr('tabindex', '0');

                if (options.setFocus === true) {
                    // voiceover works better when setting focus after short timeout
                    setTimeout(function() {
                        $roveToEl.focus();
                    }, 0);
                }

                currentItemIndex = $roveToEl.data(pluginName).idx;
                $widget.trigger('rovingTabindexChange', $roveToEl);
            }

            function roveToPrevItem(e) {
                var isOnFirstEl = (currentItemIndex === 0);
                var roveToIndex;

                if (isOnFirstEl) {
                    if (options.wrap === true) {
                        roveToIndex = numRovingItems - 1;
                    }
                } else {
                    roveToIndex = currentItemIndex - 1;
                }

                updateModel(roveToIndex);
            }

            function roveToNextItem(e) {
                var isOnLastEl = (currentItemIndex === numRovingItems - 1);
                var roveToIndex;

                if (isOnLastEl) {
                    if (options.wrap === true) {
                        roveToIndex = 0;
                    }
                } else {
                    roveToIndex = currentItemIndex + 1;
                }

                updateModel(roveToIndex);
            }

            // listen for click events
            $rovingItems.on('click', function(e) {
                updateModel($(e.target).data(pluginName).idx);
            });

            // store index position on each item
            $rovingItems.each(function onEachMatchedDescendantEl(idx, itm) {
                $(itm).data(pluginName, {idx: idx});
            });

            // one item must be in tabindex
            $rovingItems.eq(currentItemIndex).attr('tabindex', '0');

            // listen for common keydown events
            $rovingItems.commonKeyDown();

            // handle arrow keys
            if (options.axis === 'x') {
                $rovingItems.on('leftArrowKeyDown', roveToPrevItem);
                $rovingItems.on('rightArrowKeyDown', roveToNextItem);
            } else if (options.axis === 'y') {
                $rovingItems.on('upArrowKeyDown', roveToPrevItem);
                $rovingItems.on('downArrowKeyDown', roveToNextItem);
            } else {
                $rovingItems.on('leftArrowKeyDown upArrowKeyDown', roveToPrevItem);
                $rovingItems.on('rightArrowKeyDown downArrowKeyDown', roveToNextItem);
            }
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
