/**
 * Using the template engine render the values into the template
 */

module.exports = function (viewName) {

    return function (req, res) {
        res.render(viewName, res.tpl);
    };

};