/**
* rovingtabindex.js
* @author Ian McBurnie
*
* Implements a roving tabindex on a collection of elements.
* http://www.w3.org/TR/wai-aria-practices/#kbd_general_within
*
* Triggers 'rovingtabindex' event when tabindex changes
*
* @dependencies jquery.keyhandlers.js
*/

(function ( $ ) {

    $.fn.rovingtabindex = function rovingTabIndex(id, options) {

        var _idx = 0;

        options = options || {};

        return this.each(function onEach() {

            var $this = $(this);

            // store collection index pos in element dataset
            $this.attr('data-{0}'.replace('{0}', id), JSON.stringify({'rovingtabindex': _idx++}));

            $this.onLeftOrUpArrowKey(function onLeftOrUpArrowKey() {
                var itemIdx = $this.data(id).rovingtabindex,
                    $siblings = $('[data-{0}]'.replace('{0}', id)),
                    $prevEl = $siblings.eq(itemIdx - 1),
                    hasPrevEl = $prevEl.length === 1,
                    $lastEl = $siblings.eq($siblings.length-1),
                    $roveToEl = (hasPrevEl) ? $prevEl : $lastEl;

                $this.attr('tabindex', '-1');
                $roveToEl.attr('tabindex', '0');
                $this.trigger('rovingtabindex', $roveToEl);
            });

            $this.onRightOrDownArrowKey(function onRightOrDownArrowKey() {
                var itemIdx = $this.data(id).rovingtabindex,
                    $siblings = $('[data-{0}]'.replace('{0}', id)),
                    $nextEl = $siblings.eq(itemIdx + 1),
                    hasNextEl = $nextEl.length === 1,
                    $firstEl = $siblings.eq(0),
                    $roveToEl = (hasNextEl) ? $nextEl : $firstEl;

                $this.attr('tabindex', '-1');
                $roveToEl.attr('tabindex', '0');
                $this.trigger('rovingtabindex', $roveToEl);
            });
        });
    };

}( jQuery ));
