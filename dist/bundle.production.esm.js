var e=function(){function e(){this.channels=new Map}return e.prototype.createWorker=function(){this.process="\n            self.onmessage = function (message) {\n                self.postMessage(message.data);\n            }\n        ";var e="( () => {\n                "+this.process.toString()+"\n        })();",n=new Blob([e],{type:"application/javascript"}),t=new Worker(window.URL.createObjectURL(n));return t.onmessage=function(e){if(e){var n=e.data,t=this.channels.get(n.channelName).subscribers;t&&t.map((function(e){e.update(n)}))}}.bind(this),t},e.prototype.registerChannel=function(e){this.channels.get(e)||this.channels.set(e,{name:e,subscribers:[],worker:this.createWorker()})},e.prototype.destroyChannel=function(e){var n=this.channels.get(e);n||(n.worker.terminate(),this.channels.delete(e))},e.prototype.send=function(e){var n=e.channelName;n&&this.channels.get(n).worker.postMessage(e)},e.prototype.registerSubscriber=function(e,n){this.channels.get(e)&&this.channels.get(e).subscribers.push(n)},e}();export default e;
