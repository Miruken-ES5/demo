﻿new function() {

    base2.package(this, {
        name:    "sampleApp",
        imports: "miruken,miruken.mvc",
        exports: "PartialOneController"
    });

    eval(this.imports);

    var disposed = 0;
    
    var PartialOneController = Controller.extend(Disposing, {
        constructor: function () {
            var viewTwo = {
                templateUrl:  'app/regions/partialTwo.html',
                controller:   'PartialTwoController as vm'
            };
            setTimeout(function () {
                ViewRegion(this.context).present(viewTwo);
            }.bind(this), 2000);
        },
        dispose: function () { ++disposed; },
        message: 'Hello',
        items: [1,2,3],
        get disposed() { return disposed; }
    });

    eval(this.exports);

}
