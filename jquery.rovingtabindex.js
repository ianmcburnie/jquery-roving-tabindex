/**
 * @file jQuery collection plugin that implements a roving keyboard tabindex on selected descendant roving items
 * @author Ian McBurnie <ianmcburnie@hotmail.com>
 * @version 0.7.0
 * @requires jquery
 * @requires @ebay/jquery-common-keydown
 */
(function($, window, document, undefined) {

    var pluginName = 'jquery-roving-tabindex';

    /**
    * @method "jQuery.fn.rovingTabindex"
    * @param {Object} rovingItems - descendant items that will receive roving tabindex state
    * @param {Object} [options]
    * @param {string} [options.axis] - set arrow key axis to x, y or both (default)
    * @param {boolean} [options.wrap] - keyboard focus wraps from last to first & vice versa
    * @param {string} [options.activeIndex] - specify the initial active item by index position
    * @param {string} [options.setFocus] - set focus when roving tab index changes (true)
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

            function updateFocus($el) {
                setTimeout(function() {
                    $el.focus();
                }, 0);
            }

            function prev(e) {
                var $target = $(e.target);
                var itemIdx = $target.data(pluginName).idx;
                var isFirstEl = (itemIdx === 0);
                var $roveToEl;

                if (isFirstEl) {
                    if (options.wrap === true) {
                        $roveToEl = $rovingItems.eq($rovingItems.length - 1);
                    }
                } else {
                    $roveToEl = $rovingItems.eq(itemIdx - 1);
                }

                if (options.setFocus === true) {
                    updateFocus($roveToEl);
                }
            }

            function next(e) {
                var $target = $(e.target);
                var itemIdx = $target.data(pluginName).idx;
                var isLastEl = (itemIdx === $rovingItems.length - 1);
                var $roveToEl;

                if (isLastEl) {
                    if (options.wrap === true) {
                        $roveToEl = $rovingItems.eq(0);
                    }
                } else {
                    $roveToEl = $rovingItems.eq(itemIdx + 1);
                }

                if (options.setFocus === true) {
                    updateFocus($roveToEl);
                }
            }

            // update roving tabindex state every time focus is changed
            $rovingItems.on('focus', function(e) {
                var $target = $(e.target);
                var $current = $widget.find('[tabindex=0]');

                if (!$target.is($current)) {
                    $current.attr('tabindex', '-1');
                    $target.attr('tabindex', '0');
                    $widget.trigger('rovingTabindexChange', $target);
                }
            });

            // store index position on each item and set initial tabindex state
            $rovingItems.each(function onEachMatchedDescendantEl(idx, itm) {
                $(itm).data(pluginName, {'idx': idx});
                $(itm).attr('tabindex', (options.activeIndex === idx) ? 0 : '-1');
            });

            // listen for common keydown events
            $rovingItems.commonKeyDown();

            // handle arrow keys
            if (options.axis === 'x') {
                $rovingItems.on('leftArrowKeyDown', prev);
                $rovingItems.on('rightArrowKeyDown', next);
            } else if (options.axis === 'y') {
                $rovingItems.on('upArrowKeyDown', prev);
                $rovingItems.on('downArrowKeyDown', next);
            } else {
                $rovingItems.on('leftArrowKeyDown upArrowKeyDown', prev);
                $rovingItems.on('rightArrowKeyDown downArrowKeyDown', next);
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
