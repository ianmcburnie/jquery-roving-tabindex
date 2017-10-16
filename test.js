/* eslint-disable no-undef */

data.forEach(function(data) {
    describe("when no arrow key has been pressed", function() {
        beforeAll(function() {
            setupSuite(data);
        });
        it("should have triggered onRovingTabindexChange 0 times", function() {
            expect(onRovingTabindexChange).toHaveBeenCalledTimes(0);
        });
        it("should have tabindex='0' on first item", function(done) {
            setTimeout(function() {
                expect($rovingItems.first().attr('tabindex')).toBe('0');
                done();
            }, 10);
        });
        it("should have {idx:0} as first item data", function() {
            expect($rovingItems.first().data('jquery-linear-navigation').idx).toBe(0);
        });
        it("should have {idx:(length - 1)} as last item data", function() {
            expect($rovingItems.last().data('jquery-linear-navigation').idx).toBe($rovingItems.length - 1);
        });
    });

    describe("when arrow down key has been pressed once", function() {
        beforeAll(function() {
            setupSuite(data);
            $rovingItems.first().trigger('upArrowKeyDown');
        });
        it("should have triggered onRovingTabindexChange 1 time", function() {
            expect(onRovingTabindexChange).toHaveBeenCalledTimes(1);
        });
    });

    describe("when arrow up key has been pressed once", function() {
        beforeAll(function() {
            setupSuite(data);
            $rovingItems.first().trigger('upArrowKeyDown');
        });
        it("should have triggered onRovingTabindexChange 1 time", function() {
            expect(onRovingTabindexChange).toHaveBeenCalledTimes(1);
        });
    });

    describe("when right and left arrow key have been pressed with axis set to y", function() {
        beforeAll(function() {
            setupSuite(data, { axis: 'y' });
            $rovingItems.trigger('rightArrowKeyDown');
            $rovingItems.trigger('leftArrowKeyDown');
        });
        it("should not have triggered rovingTabindexChange event", function() {
            expect(onRovingTabindexChange).not.toHaveBeenCalled();
        });
    });

    describe("when up and down arrow key have been pressed with axis set to x", function() {
        beforeAll(function() {
            setupSuite(data, { axis: 'x' });
            $rovingItems.trigger('downArrowKeyDown');
            $rovingItems.trigger('upArrowKeyDown');
        });
        it("should not have triggered rovingTabindexChange event", function() {
            expect(onRovingTabindexChange).not.toHaveBeenCalled();
        });
    });
});
