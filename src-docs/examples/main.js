// Public namespace
var ns = new MetaphorJs.Namespace(window);
ns.register("My.Test", something); // -> window.My.Test
ns.add("My.CacheOnly.Key", 123);

// private namespace
var privateNs = {};
var pns = new MetaphorJs.Namespace(privateNs);
pns.register("My.Test", something); // -> privateNs.My.Test

// Also private namespace.
// You construct ns without passing root object.
// You will not have access to the root.
var pns2 = new MetaphorJs.Namespace();

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