// global namespace
var ns = MetaphorJs.Namespace();
ns.register("My.Test", something); // -> window.My.Test or global.My.Test
ns.add("My.CacheOnly.Key", 123);

// private namespace
var privateNs = {};
var pns = new MetaphorJs.Namespace(privateNs, "privateNs");
pns.register("privateNs.Test", something); // -> privateNs.Test

// access namespace
ns.get("My.Test"); // window.My.Test
pns.get("Test"); // privateNs.Test
pns.get("privateNs.Test"); // privateNs.Test

window.Something = {hello: "world"};
ns.get("Something.hello"); // "world"
ns.get("Something.hello", true); // get only from cache; returns null;
ns.get("My.CacheOnly.Key", true); // get only from cache; returns 123;
ns.get("My.CacheOnly.Key"); // 123

// in conjunction with class system
// see metaphorjs-class repository

var cs = new MetaphorJs.Class(ns); // global class system
var privateCs = new MetaphorJs.Class(pns); // hidden class system

cs.define({
    $class: "My.TestClass"
});
// window.My.TestClass or global.My.TestClass

privateCs.define({
    $class: "My.TestClass"
});
// privateNs.My.TestClass