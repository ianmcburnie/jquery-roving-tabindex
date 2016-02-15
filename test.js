describe("jquery.rovingtabindex.js", function() {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 500;

    var $body = $('body');
    var dom = '<ul id="widget">'
                + '<li></li>'
                + '<li></li>'
                + '<li></li>'
            + '</ul>';
    var $widget;
    var rovingItemsSelector = '> li';
    var $rovingItems;

    beforeEach(function() {
        $body.empty().append($(dom));
        $widget = $('#widget');
        $rovingItems = $widget.find(rovingItemsSelector);
    });

    it("should trigger rovingTabindexChange event on downarrow by default", function(done) {
        $widget.rovingTabindex(rovingItemsSelector);
        $widget.on('rovingTabindexChange', done);
        $rovingItems.first().trigger('downArrowKeyDown');
    });

    it("should trigger rovingTabindexChange event on uparrow by default", function(done) {
        $widget.rovingTabindex(rovingItemsSelector);
        $widget.on('rovingTabindexChange', done);
        $rovingItems.first().trigger('upArrowKeyDown');
    });

    it("should trigger rovingTabindexChange event on downarrow when options.axis=y", function(done) {
        $widget.rovingTabindex(rovingItemsSelector,{axis:"y"});
        $widget.on('rovingTabindexChange', done);
        $rovingItems.first().trigger('downArrowKeyDown');
    });

    it("should trigger rovingTabindexChange event on uparrow when options.axis=y", function(done) {
        $widget.rovingTabindex(rovingItemsSelector,{axis:"y"});
        $widget.on('rovingTabindexChange', done);
        $rovingItems.first().trigger('upArrowKeyDown');
    });

    it("should trigger rovingTabindexChange event on leftarrow when options.axis=x", function(done) {
        $widget.rovingTabindex(rovingItemsSelector,{axis:"x"});
        $widget.on('rovingTabindexChange', done);
        $rovingItems.first().trigger('leftArrowKeyDown');
    });

    it("should trigger rovingTabindexChange event on rightarrow when options.axis=x", function(done) {
        $widget.rovingTabindex(rovingItemsSelector,{axis:"x"});
        $widget.on('rovingTabindexChange', done);
        $rovingItems.first().trigger('rightArrowKeyDown');
    });

    it("should have correct rovingtabindex data", function() {
        $widget.rovingTabindex(rovingItemsSelector);
        expect($rovingItems.first().data('jquery-roving-tabindex').idx).toBe(0);
        expect($rovingItems.last().data('jquery-roving-tabindex').idx).toBe(2);
    });
});
