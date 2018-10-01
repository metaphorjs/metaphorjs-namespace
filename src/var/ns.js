
var Namespace   = require('../lib/Namespace.js'),
    MetaphorJs  = require('metaphorjs-shared/src/MetaphorJs.js');

/**
 * Already constructed private namespace 
 * with <code>MetaphorJs</code> object and its alias <code>mjs</code> 
 * registered at top level.
 * @var ns 
 */
module.exports  = (function(){
    var ns = new Namespace();
    ns.register("MetaphorJs", MetaphorJs);
    ns.register("mjs", MetaphorJs);
    return ns;
}());

