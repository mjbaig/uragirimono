var o=function(){function o(){this.worker=null,this.process='console.log("hello")'}return o.prototype.init=function(){if(null==this.worker){var o="( () => {\n        while(true) {\n            "+this.process.toString()+"\n        }\n    })();";console.log(o);var n=new Blob([o],{type:"application/javascript"});new Worker(window.URL.createObjectURL(n))}},o}();export default o;
