#MetaphorJs.Namespace

Namespace/cache library

```js
// npm and amd 
var Namespace = require("metaphorjs-namespace");

// Standalone (exposed to window/global):
// var Namespace = MetaphorJs.Namespace;

// Public namespace
var ns = new Namespace(window);
ns.register("My.Test", something); // -> window.My.Test

```