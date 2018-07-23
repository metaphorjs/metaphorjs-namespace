
var Namespace   = require("../src/lib/Namespace.js"),
    assert      = require("assert");

describe("Local ns", function(){

    var localNs     = {},
        ns          = new Namespace(localNs, "localNs");

    ns.register("localNs.a", true);
    ns.register("localNs.testOutside", 1);
    ns.register("without", 1);
    ns.register("deep.without", 1);
    ns.add("without2", 1);
    ns.add("deep2.without2", 1);

    it("should skip local namespace name", function(){
        assert.equal(true, ns.get("localNs.a"));
    });

    it("should create cache with local name", function(){
        assert.equal(1, ns.get("localNs.without", true));
        assert.equal(1, ns.get("localNs.deep.without", true));
    });
    it("should add cache with local name", function(){
        assert.equal(1, ns.get("localNs.without2", true));
        assert.equal(1, ns.get("localNs.deep2.without2", true));
    });

    it("should work with created cache the same with or without namespace name", function(){
        assert.equal(1, ns.get("localNs.without"));
        assert.equal(1, ns.get("without"));
        assert.equal(1, ns.get("localNs.deep.without"));
        assert.equal(1, ns.get("deep.without"));
    });
    it("should work with added cache the same with or without namespace name", function(){
        assert.equal(1, ns.get("localNs.without2"));
        assert.equal(1, ns.get("without2"));
        assert.equal(1, ns.get("localNs.deep2.without2", true));
        assert.equal(1, ns.get("deep2.without2", true));
    });


    it("should not pollute global space", function(){

        ns.register("localNs.testGlobal", 1);

        assert.strictEqual(undefined, global.localNs);
        assert.strictEqual(undefined, global.testGlobal);
    });
});

describe("Global ns", function(){

    var ns = new Namespace;

    it("should register global variables", function(){
        ns.register("MyTestVar", 1);
        assert.equal(1, global.MyTestVar);
    });
});


describe("ns.register", function(){

    var localNs     = {},
        ns          = new Namespace(localNs, "localNs");

    it("should not register twice", function(){

        ns.register("localNs.a", 1);
        ns.register("localNs.a", 2);

        assert.equal(1, ns.get("localNs.a"));
    });

    it("should accept any types of variables", function(){

        ns.register("localNs.intVar", 1);
        ns.register("localNs.intVarEmpty", 0);
        ns.register("localNs.strVar", "string");
        ns.register("localNs.strVarEmpty", "");
        ns.register("localNs.boolTrue", true);
        ns.register("localNs.boolFalse", false);
        ns.register("localNs.nullVar", null);
        ns.register("localNs.objecVar", {prop: "value"});
        ns.register("localNs.arrayVar", [1, 2, 3]);

        assert.equal(1, ns.get("localNs.intVar"));
        assert.equal(0, ns.get("localNs.intVarEmpty"));
        assert.equal("string", ns.get("localNs.strVar"));
        assert.equal("", ns.get("localNs.strVarEmpty"));
        assert.equal(true, ns.get("localNs.boolTrue"));
        assert.equal(false, ns.get("localNs.boolFalse"));
        assert.equal(null, ns.get("localNs.nullVar"));

        assert.equal("value", ns.get("localNs.objecVar").prop);
        assert.equal(1, ns.get("localNs.arrayVar")[0]);
    });

    it("should not overwrite scalar values", function() {
        ns.register("localNs.intVar.a", 1);
        assert.strictEqual(undefined, ns.get("localNs.intVar.a"));
    });

    it("should not mix local namespaces", function(){
        assert.strictEqual(undefined, ns.get("localNs.testOutside"));
    });

    it("should add object properties", function(){

        ns.register("localNs.lib.a", 1);
        ns.register("localNs.lib.b", 1);

        assert.equal("object", typeof ns.get("localNs.lib"));
        assert.equal(1, ns.get("localNs.lib.a"));
        assert.equal(1, ns.get("localNs.lib.b"));
    });


});
