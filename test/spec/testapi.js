(function () {
    'use strict';

    describe("mocking ajax", function() {
        describe("suite wide usage", function () {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(args) {
                if (this.readyState == this.DONE) {
                    console.log(this.responseText);
                }
            };
            xhr.open("GET", "/api/public/ad?version=2");
            xhr.send();
        });
    })

})();
