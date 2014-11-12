var ns = MetaphorJs.lib.Namespace(window);
ns.register("My.Test", something); // -> window.My.Test
var privateNs = {};
ns = new MetaphorJs.lib.Namespace(privateNs, "privateNs");
ns.register("privateNs.Test", something); // -> privateNs.Test