
var undf = undefined;
var strUndef = "undefined";
var toString = Object.prototype.toString;



var varType = function(){

    var types = {
        '[object String]': 0,
        '[object Number]': 1,
        '[object Boolean]': 2,
        '[object Object]': 3,
        '[object Function]': 4,
        '[object Array]': 5,
        '[object RegExp]': 9,
        '[object Date]': 10
    };


    /**
        'string': 0,
        'number': 1,
        'boolean': 2,
        'object': 3,
        'function': 4,
        'array': 5,
        'null': 6,
        'undefined': 7,
        'NaN': 8,
        'regexp': 9,
        'date': 10
    */

    return function(val) {

        if (!val) {
            if (val === null) {
                return 6;
            }
            if (val === undf) {
                return 7;
            }
        }

        var num = types[toString.call(val)];

        if (num === undf) {
            return -1;
        }

        if (num == 1 && isNaN(val)) {
            num = 8;
        }

        return num;
    };

}();


var isObject = function(value) {
    var vt = varType(value);
    return value !== null && typeof value == "object" && (vt > 2 || vt == -1);
};


"use strict";

/**
 * @param {Object} root optional; usually window or global
 * @param {String} rootName optional. If you want custom object to be root and
 * this object itself if the first level of namespace:<br>
 * <pre><code class="language-javascript">
 * var ns = MetaphorJs.lib.Namespace(window);
 * ns.register("My.Test", something); // -> window.My.Test
 * var privateNs = {};
 * var ns = new MetaphorJs.lib.Namespace(privateNs, "privateNs");
 * ns.register("privateNs.Test", something); // -> privateNs.Test
 * </code></pre>
 * @constructor
 */
var Namespace   = function(root, rootName) {

    var cache   = {},
        self    = this;

    if (!root) {
        if (typeof global != strUndef) {
            root    = global;
        }
        else {
            root    = window;
        }
    }

    var parseNs     = function(ns) {

        var tmp     = ns.split("."),
            i,
            last    = tmp.pop(),
            parent  = tmp.join("."),
            len     = tmp.length,
            name,
            current = root;


        if (cache[parent]) {
            return [cache[parent], last, ns];
        }

        if (len > 0) {
            for (i = 0; i < len; i++) {

                name    = tmp[i];

                if (rootName && i == 0) {
                    if (name == rootName) {
                        current = root;
                        continue;
                    }
                    else {
                        ns = rootName + "." + ns;
                    }
                }

                if (current[name] === undf) {
                    current[name]   = {};
                }

                current = current[name];
            }
        }
        else {
            if (rootName) {
                ns = rootName + "." + ns;
            }
        }

        return [current, last, ns];
    };

    /**
     * Get namespace/cache object
     * @function MetaphorJs.ns.get
     * @param {string} ns
     * @param {bool} cacheOnly
     * @returns {object} constructor
     */
    var get       = function(ns, cacheOnly) {

        if (cache[ns] !== undf) {
            return cache[ns];
        }

        if (rootName && cache[rootName + "." + ns] !== undf) {
            return cache[rootName + "." + ns];
        }

        if (cacheOnly) {
            return undf;
        }

        var tmp     = ns.split("."),
            i,
            len     = tmp.length,
            name,
            current = root;

        for (i = 0; i < len; i++) {

            name    = tmp[i];

            if (rootName && i == 0) {
                if (name == rootName) {
                    current = root;
                    continue;
                }
            }

            if (current[name] === undf) {
                return undf;
            }

            current = current[name];
        }

        if (current) {
            cache[ns] = current;
        }

        return current;
    };

    /**
     * Register class constructor
     * @function MetaphorJs.ns.register
     * @param {string} ns
     * @param {*} value
     */
    var register    = function(ns, value) {

        var parse   = parseNs(ns),
            parent  = parse[0],
            name    = parse[1];

        if (isObject(parent) && parent[name] === undf) {

            parent[name]        = value;
            cache[parse[2]]     = value;
        }

        return value;
    };

    /**
     * Class exists
     * @function MetaphorJs.ns.exists
     * @param {string} ns
     * @returns boolean
     */
    var exists      = function(ns) {
        return cache[ns] !== undf;
    };

    /**
     * Add constructor to cache
     * @function MetaphorJs.ns.add
     * @param {string} ns
     * @param {*} value
     */
    var add = function(ns, value) {
        if (rootName && ns.indexOf(rootName) !== 0) {
            ns = rootName + "." + ns;
        }
        if (cache[ns] === undf) {
            cache[ns] = value;
        }
        return value;
    };

    var remove = function(ns) {
        delete cache[ns];
    };

    self.register   = register;
    self.exists     = exists;
    self.get        = get;
    self.add        = add;
    self.remove     = remove;
};

Namespace.prototype = {
    register: null,
    exists: null,
    get: null,
    add: null,
    remove: null
};


module.exports = Namespace;
