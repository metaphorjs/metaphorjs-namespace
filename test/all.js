
var Namespace   = require("../dist/metaphorjs.namespace.npm.js"),
    assert      = require("assert");

describe("ns.register", function(){

    var localNs     = {},
        ns          = new Namespace(localNs);

    it("should not register twice", function(){
        ns.register("a", 1);
        ns.register("a", 2);
        assert.equal(1, ns.get("a"));
    });

    it("should accept any types of variables", function(){

        ns.register("intVar", 1);
        ns.register("intVarEmpty", 0);
        ns.register("strVar", "string");
        ns.register("strVarEmpty", "");
        ns.register("boolTrue", true);
        ns.register("boolFalse", false);
        ns.register("nullVar", null);
        ns.register("objecVar", {prop: "value"});
        ns.register("arrayVar", [1, 2, 3]);

        assert.equal(1, ns.get("intVar"));
        assert.equal(0, ns.get("intVarEmpty"));
        assert.equal("string", ns.get("strVar"));
        assert.equal("", ns.get("strVarEmpty"));
        assert.equal(true, ns.get("boolTrue"));
        assert.equal(false, ns.get("boolFalse"));
        assert.equal(null, ns.get("nullVar"));

        assert.equal("value", ns.get("objecVar").prop);
        assert.equal(1, ns.get("arrayVar")[0]);
    });

    it("should not overwrite scalar values", function() {
        ns.register("intVar.a", 1);
        assert.strictEqual(undefined, ns.get("intVar.a"));
    });

    it("should add object properties", function(){

        ns.register("lib.a", 1);
        ns.register("lib.b", 1);

        assert.equal("object", typeof ns.get("lib"));
        assert.equal(1, ns.get("lib.a"));
        assert.equal(1, ns.get("lib.b"));
    });


});
