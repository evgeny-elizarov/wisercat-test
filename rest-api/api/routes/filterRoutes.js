'use strict';
module.exports = function(app) {
    var filterController = require('../controllers/filterController');

    // todoList Routes
    app.route('/filters')
        .get(filterController.get_filters)
        .post(filterController.save_filters);
};