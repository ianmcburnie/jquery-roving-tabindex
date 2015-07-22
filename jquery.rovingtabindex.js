/**
* @function jquery.rovingtabindex.js
* @author Ian McBurnie <ianmcburnie@hotmail.com>
* @description Implements a roving tabindex on a collection of elements.
* @summary http://www.w3.org/TR/wai-aria-practices/#kbd_general_within
* @requires jquery.keyhandlers.js
* @param {string} id
* @param {Object} options
* @param {string} options.cursorDirection
* @fires rovingtabindex
*/
(function ($, window, document, undefined) {

    $.fn.rovingtabindex = function rovingTabIndex(id, options) {

        var _idx = 0,
            options = options || {},
            wrap = options.wrap,
            cursorDirection = options.cursorDirection || 'both';

        return this.each(function onEach(i) {

            var $this = $(this);

            // store collection index pos in element dataset
            $this.attr('data-{0}'.replace('{0}', id), JSON.stringify({'rovingtabindex': _idx++}));

            if (cursorDirection === 'horizontal') {
                $this.on('leftkeydown', function onLeftArrowKey() {
                    $this.trigger('prev');
                });

                $this.on('rightkeydown', function onRightArrowKey() {
                    $this.trigger('next');
                });
            }
            else if (cursorDirection === 'vertical') {
                $this.on('downkeydown', function onDownArrowKey() {
                    $this.trigger('next');
                });

                $this.on('upkeydown', function onUpArrowKey() {
                    $this.trigger('prev');
                });
            }
            else {
                $this.on('leftkeydown upkeydown', function onLeftOrUpArrowKey() {
                    $this.trigger('prev');
                });

                $this.on('rightkeydown downkeydown', function onRightOrDownArrowKey() {
                    $this.trigger('next');
                });
            }

            $this.on('prev', function onPrev(e) {
                var itemIdx = $this.data(id).rovingtabindex,
                    $siblings = $('[data-{0}]'.replace('{0}', id)),
                    $prevEl = $siblings.eq(itemIdx - 1),
                    hasPrevEl = $prevEl.length === 1,
                    $lastEl = $siblings.eq($siblings.length-1),
                    $roveToEl = (hasPrevEl && itemIdx !== 0) ? $prevEl : (options.wrap !== false) ? $lastEl : $this;

                $this.attr('tabindex', '-1');
                $roveToEl.attr('tabindex', '0');
                $this.trigger('rovingtabindex', $roveToEl);
            });

            $this.on('next', function onNext(e) {
                var itemIdx = $this.data(id).rovingtabindex,
                    $siblings = $('[data-{0}]'.replace('{0}', id)),
                    $nextEl = $siblings.eq(itemIdx + 1),
                    hasNextEl = $nextEl.length === 1,
                    $firstEl = $siblings.eq(0),
                    $roveToEl = (hasNextEl) ? $nextEl : (options.wrap !== false) ? $firstEl: $this;

                $this.attr('tabindex', '-1');
                $roveToEl.attr('tabindex', '0');
                $this.trigger('rovingtabindex', $roveToEl);
            });

        });
    };

}(jQuery, window, document));
