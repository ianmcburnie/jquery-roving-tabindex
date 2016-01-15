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

    it("should trigger change.rovingTabindex event on downarrow.commonKeyDown by default", function(done){
        $collection.rovingTabindex('foo');
        $collection.on('rovingTabindexChange', done);
        $collection.trigger('downarrow.commonKeyDown');
    });

    it("should trigger change.rovingTabindex event on uparrow.commonKeyDown by default", function(done){
        $collection.rovingTabindex('foo');
        $collection.on('rovingTabindexChange', done);
        $collection.trigger('uparrow.commonKeyDown');
    });

    it("should trigger change.rovingTabindex event on downarrow.commonKeyDown when options.axis=y", function(done){
        $collection.rovingTabindex('foo',{axis:"y"});
        $collection.on('rovingTabindexChange', done);
        $collection.trigger('downarrow.commonKeyDown');
    });

    it("should trigger change.rovingTabindex event on uparrow.commonKeyDown when options.axis=y", function(done){
        $collection.rovingTabindex('foo',{axis:"y"});
        $collection.on('rovingTabindexChange', done);
        $collection.trigger('uparrow.commonKeyDown');
    });

    it("should trigger change.rovingTabindex event on leftarrow.commonKeyDown when options.axis=x", function(done){
        $collection.rovingTabindex('foo',{axis:"x"});
        $collection.on('rovingTabindexChange', done);
        $collection.trigger('leftarrow.commonKeyDown');
    });

    it("should trigger change.rovingTabindex event on rightarrow.commonKeyDown when options.axis=x", function(done){
        $collection.rovingTabindex('foo',{axis:"x"});
        $collection.on('rovingTabindexChange', done);
        $collection.trigger('rightarrow.commonKeyDown');
    });

    it("should have correct rovingtabindex data", function(){
        $collection.rovingTabindex('foo');
        expect($collection.first().data().foo.rovingtabindex).toBe(0);
        expect($collection.last().data().foo.rovingtabindex).toBe(2);
    });
});
