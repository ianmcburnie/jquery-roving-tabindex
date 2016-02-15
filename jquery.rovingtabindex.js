/**
* @function jquery.rovingtabindex.js
* @version 0.6.0
* @author Ian McBurnie <ianmcburnie@hotmail.com>
* @description jQuery collection plugin that implements a roving keyboard tabindex on selected descendant rovingItems
* @summary http://www.w3.org/TR/wai-aria-practices/#kbd_general_within
* @requires jquery-common-keydown
* @param {Object} rovingItems - descendant items that will receive roving tabindex
* @param {Object} options
* @param {string} options.axis - x, y or both (default)
* @param {boolean} options.wrap - keyboard focus wraps from last to first & vice versa
* @param {string} options.activeIndex - specify the initial active item by index position
* @fires rovingTabindexChange
* @fires nextRovingTabindex
* @fires prevRovingTabindex
*/
(function ($, window, document, undefined) {

    var pluginName = 'jquery-roving-tabindex';

    $.fn.rovingTabindex = function rovingTabindex(rovingItems, options) {

        options = options || {};

        var wrap = options.wrap;
        var axis = options.axis;
        var activeIndex = options.activeIndex || 0;

        return this.each(function onEach() {

            var $widget = $(this);
            var $rovingItems = $widget.find(rovingItems);

            if ($rovingItems.size() > 0) {

                $rovingItems.eq(activeIndex).attr('tabindex', '0');

                $widget.on('prevRovingTabindex', function onPrev(e) {
                    var $this = $(e.target);
                    var itemIdx = $this.data(pluginName).idx;
                    var $prevEl = $rovingItems.eq(itemIdx - 1);
                    var hasPrevEl = ($prevEl.length === 1);
                    var $lastEl = $rovingItems.eq($rovingItems.length-1);
                    var $roveToEl = (hasPrevEl && itemIdx !== 0) ? $prevEl : (options.wrap !== false) ? $lastEl : $this;

                    $this.attr('tabindex', '-1');
                    $roveToEl.attr('tabindex', '0');
                    $widget.trigger("rovingTabindexChange", $roveToEl.get(0));
                });

                $widget.on('nextRovingTabindex', function onNext(e) {
                    var $this = $(e.target);
                    var itemIdx = $this.data(pluginName).idx;
                    var $nextEl = $rovingItems.eq(itemIdx + 1);
                    var hasNextEl = ($nextEl.length === 1);
                    var $firstEl = $rovingItems.eq(0);
                    var $roveToEl = (hasNextEl) ? $nextEl : (options.wrap !== false) ? $firstEl: $this;

                    $this.attr('tabindex', '-1');
                    $roveToEl.attr('tabindex', '0');
                    $widget.trigger("rovingTabindexChange", $roveToEl.get(0));
                });
            }

            $rovingItems.each(function(idx, itm) {
                var $itm = $(itm);

                // store index position on each item
                $itm.data(pluginName, {"idx": idx});

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
