describe("jquery.rovingtabindex.js", function() {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

    var $body = $('body');
    var dom = '<ul id="widget">'
                + '<li></li>'
                + '<li></li>'
                + '<li></li>'
            + '</ul>';
    var $collection;

    beforeAll(function() {
        $body.empty().append($(dom));
        $collection = $('#widget li');
    });

    it("should trigger rovingTabindexChange event on downarrow by default", function(done){
        $collection.rovingTabindex('foo');
        $collection.on('rovingTabindexChange', done);
        $collection.trigger('downArrowKeyDown');
    });

    it("should trigger rovingTabindexChange event on uparrow by default", function(done){
        $collection.rovingTabindex('foo');
        $collection.on('rovingTabindexChange', done);
        $collection.trigger('upArrowKeyDown');
    });

    it("should trigger rovingTabindexChange event on downarrow when options.axis=y", function(done){
        $collection.rovingTabindex('foo',{axis:"y"});
        $collection.on('rovingTabindexChange', done);
        $collection.trigger('downArrowKeyDown');
    });

    it("should trigger rovingTabindexChange event on uparrow when options.axis=y", function(done){
        $collection.rovingTabindex('foo',{axis:"y"});
        $collection.on('rovingTabindexChange', done);
        $collection.trigger('upArrowKeyDown');
    });

    it("should trigger rovingTabindexChange event on leftarrow when options.axis=x", function(done){
        $collection.rovingTabindex('foo',{axis:"x"});
        $collection.on('rovingTabindexChange', done);
        $collection.trigger('leftArrowKeyDown');
    });

    it("should trigger rovingTabindexChange event on rightarrow when options.axis=x", function(done){
        $collection.rovingTabindex('foo',{axis:"x"});
        $collection.on('rovingTabindexChange', done);
        $collection.trigger('rightArrowKeyDown');
    });

    it("should have correct rovingtabindex data", function(){
        $collection.rovingTabindex('foo');
        expect($collection.first().data().foo.rovingtabindex).toBe(0);
        expect($collection.last().data().foo.rovingtabindex).toBe(2);
    });
});
