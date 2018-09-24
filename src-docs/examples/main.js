
// npm and amd 
var Namespace = require("metaphorjs-namespace");

// Standalone (exposed to window/global):
// var Namespace = MetaphorJs.Namespace;

// Public namespace
var ns = new Namespace(window);
ns.register("My.Test", something); // -> window.My.Test
ns.add("My.CacheOnly.Key", 123);

// Private namespace
var privateNs = {};
var pns = new Namespace(privateNs);
pns.register("My.Test", something); // -> privateNs.My.Test

// Also private namespace.
// You can construct ns without passing root object.
// In this case, you will not have access to the root.
var pns2 = new Namespace();

// access namespace
ns.get("My.Test"); // window.My.Test
pns.get("My.Test"); // privateNs.My.Test

window.Something = {hello: "world"};
ns.get("Something.hello"); // "world"
ns.get("Something.hello", true); // get only from cache; returns null;
ns.get("My.CacheOnly.Key", true); // get only from cache; returns 123;
ns.get("My.CacheOnly.Key"); // 123

// in conjunction with class system
// see metaphorjs-class repository

var cls = classManagerFactory(ns); // global class system
var privateCls = classManagerFactory(pns); // hidden class system

cls({
    $class: "My.TestClass"
});
// window.My.TestClass

privateCls({
    $class: "My.TestClass"
});
// privateNs.My.TestClass