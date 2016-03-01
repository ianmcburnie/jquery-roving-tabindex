/**
 * @file jQuery collection plugin that implements a roving keyboard tabindex on selected descendant roving items
 * @author Ian McBurnie <ianmcburnie@hotmail.com>
 * @requires jQuery
 * @requires @ebay/jquery-common-keydown
 * @version 0.6.1
 */

(function($, window, document, undefined) {

    var pluginName = 'jquery-roving-tabindex';

    /**
    * The jQuery plugin namespace.
    * @external "jQuery.fn"
    * @see {@link http://learn.jquery.com/plugins/|jQuery Plugins}
    */

    /**
    * jQuery collection plugin that implements a roving keyboard tabindex on selected descendant roving items
    * @class external:"jQuery.fn".rovingTabindex
    * @fires rovingTabindexChange - when roving tabindex changes
    * @param {Object} rovingItems - descendant items that will receive roving tabindex
    * @param {Object} [options]
    * @param {string} [options.axis] - set arrow key axis to x, y or both (default)
    * @param {boolean} [options.wrap] - keyboard focus wraps from last to first & vice versa
    * @param {string} [options.activeIndex] - specify the initial active item by index position
    * @return {jQuery} chainable jQuery class
    * @memberof jQuery.fn
    */

    /**
    * rovingTabindexChange event
    * @event rovingTabindexChange
    * @type {object}
    * @property {object} event - event object
    * @property {object} newRovingItem - new roving item element
    * @memberof jQuery.fn.rovingTabindex
    */

    $.fn.rovingTabindex = function rovingTabindex(rovingItems, options) {

        options = options || {};

        var wrap = options.wrap;
        var axis = options.axis;
        var activeIndex = options.activeIndex || 0;

        return this.each(function onEach() {

            var $widget = $(this);
            var $rovingItems = $widget.find(rovingItems);

            if ($rovingItems.length > 0) {

                $rovingItems.eq(activeIndex).attr('tabindex', '0');

                $widget.on('prevRovingTabindex', function onPrev(e) {
                    var $this = $(e.target);
                    var itemIdx = $this.data(pluginName).idx;
                    var $prevEl = $rovingItems.eq(itemIdx - 1);
                    var hasPrevEl = ($prevEl.length === 1);
                    var $lastEl = $rovingItems.eq($rovingItems.length - 1);
                    var $roveToEl = (hasPrevEl && itemIdx !== 0) ? $prevEl : (options.wrap !== false) ? $lastEl : $this;

                    $this.attr('tabindex', '-1');
                    $roveToEl.attr('tabindex', '0');
                    $widget.trigger('rovingTabindexChange', $roveToEl.get(0));
                });

                $widget.on('nextRovingTabindex', function onNext(e) {
                    var $this = $(e.target);
                    var itemIdx = $this.data(pluginName).idx;
                    var $nextEl = $rovingItems.eq(itemIdx + 1);
                    var hasNextEl = ($nextEl.length === 1);
                    var $firstEl = $rovingItems.eq(0);
                    var $roveToEl = (hasNextEl) ? $nextEl : (options.wrap !== false) ? $firstEl : $this;

                    $this.attr('tabindex', '-1');
                    $roveToEl.attr('tabindex', '0');
                    $widget.trigger('rovingTabindexChange', $roveToEl.get(0));
                });
            }

            $rovingItems.each(function(idx, itm) {
                var $itm = $(itm);

                // store index position on each item
                $itm.data(pluginName, {'idx': idx});

                // listen for common keydown events
                $itm.commonKeyDown();

                function triggerPrev() {
                    $itm.trigger('prevRovingTabindex');
                }

                function triggerNext() {
                    $itm.trigger('nextRovingTabindex');
                }

                if (axis === 'x') {
                    $itm.on('leftArrowKeyDown', triggerPrev);
                    $itm.on('rightArrowKeyDown', triggerNext);
                } else if (axis === 'y') {
                    $itm.on('downArrowKeyDown', triggerNext);
                    $itm.on('upArrowKeyDown', triggerPrev);
                } else {
                    $itm.on('leftArrowKeyDown upArrowKeyDown', triggerPrev);
                    $itm.on('rightArrowKeyDown downArrowKeyDown', triggerNext);
                }
            });
        });
    };

}(jQuery, window, document));
