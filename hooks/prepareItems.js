
module.exports = function(doc) {

    var item = doc.getItem("Cache");

    if (item) {
        item.addFlag("access", "private");
    }

};