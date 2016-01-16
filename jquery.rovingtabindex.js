/**
* @function jquery.rovingtabindex.js
* @version 0.4.0
* @author Ian McBurnie <ianmcburnie@hotmail.com>
* @description jQuery collection plugin that implements a roving keyboard tabindex
* @summary http://www.w3.org/TR/wai-aria-practices/#kbd_general_within
* @requires jquery-common-keys
* @param {string} id
* @param {Object} options
* @param {string} options.axis
* @param {boolean} options.wrap
* @param {string} options.activeIndex
* @fires rovingTabindexChange
* @fires nextRovingTabindex
* @fires prevRovingTabindex
*/
(function ($, window, document, undefined) {

    $.fn.rovingTabindex = function rovingTabindex(id, options) {

        options = options || {};

        var wrap = options.wrap,
            axis = options.axis,
            activeIndex = options.activeIndex || 0,
            $collection = this;

        $(this).eq(activeIndex).attr('tabindex', '0');

        return this.each(function onEach(i) {

            var $this = $(this);

            $this.commonKeys();

            // store collection index pos in element dataset
            $this.eq(0).data(id, {"rovingtabindex": i++});

            if (axis === 'x') {
                $this.on('leftArrowKeyDown', function onLeftArrowKey() {
                    $this.trigger('prevRovingTabindex');
                });

                $this.on('rightArrowKeyDown', function onRightArrowKey() {
                    $this.trigger('nextRovingTabindex');
                });
            }
            else if (axis === 'y') {
                $this.on('downArrowKeyDown', function onDownArrowKey() {
                    $this.trigger('nextRovingTabindex');
                });

                $this.on('upArrowKeyDown', function onUpArrowKey() {
                    $this.trigger('prevRovingTabindex');
                });
            }
            else {
                $this.on('leftArrowKeyDown upArrowKeyDown', function onLeftOrUpArrowKey() {
                    $this.trigger('prevRovingTabindex');
                });

                $this.on('rightArrowKeyDown downArrowKeyDown', function onRightOrDownArrowKey() {
                    $this.trigger('nextRovingTabindex');
                });
            }

            $this.on('prevRovingTabindex', function onPrev(e) {
                var itemIdx = $this.data(id).rovingtabindex,
                    $prevEl = $collection.eq(itemIdx - 1),
                    hasPrevEl = $prevEl.length === 1,
                    $lastEl = $collection.eq($collection.length-1),
                    $roveToEl = (hasPrevEl && itemIdx !== 0) ? $prevEl : (options.wrap !== false) ? $lastEl : $this;

                $this.attr('tabindex', '-1');
                $roveToEl.attr('tabindex', '0');
                $this.trigger('rovingTabindexChange', $roveToEl);
            });

            $this.on('nextRovingTabindex', function onNext(e) {
                var itemIdx = $this.data(id).rovingtabindex,
                    $nextEl = $collection.eq(itemIdx + 1),
                    hasNextEl = $nextEl.length === 1,
                    $firstEl = $collection.eq(0),
                    $roveToEl = (hasNextEl) ? $nextEl : (options.wrap !== false) ? $firstEl: $this;

                $this.attr('tabindex', '-1');
                $roveToEl.attr('tabindex', '0');
                $this.trigger('rovingTabindexChange', $roveToEl);
            });

        });
    };

}(jQuery, window, document));
