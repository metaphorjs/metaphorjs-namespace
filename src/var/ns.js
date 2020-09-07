require("../lib/Namespace");
const MetaphorJs = require('metaphorjs-shared/src/MetaphorJs');

/**
 * Already constructed private namespace 
 * with <code>MetaphorJs</code> object and its alias <code>mjs</code> 
 * registered at top level.
 * @var ns 
 */
module.exports = (function(){
    var ns = new MetaphorJs.lib.Namespace;
    ns.register("MetaphorJs", MetaphorJs);
    ns.register("mjs", MetaphorJs);
    return ns;
}());
