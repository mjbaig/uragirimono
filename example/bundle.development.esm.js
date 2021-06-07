var Uragirimono = /** @class */ (function () {
    function Uragirimono() {
        this.worker = null;
        this.process = "console.log(\"hello\")";
    }
    Uragirimono.prototype.init = function () {
        if (this.worker != null) {
            return;
        }
        var func = "( () => {\n        while(true) {\n            " + this.process.toString() + "\n        }\n    })();";
        console.log(func);
        var blob = new Blob([func], { type: 'application/javascript' });
        new Worker(window.URL.createObjectURL(blob));
    };
    return Uragirimono;
}());

export default Uragirimono;
