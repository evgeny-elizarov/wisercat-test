'use strict';
exports.save_filters = function(req, res) {
    console.log(req.body);
    res.json(req.body);
};

exports.get_filters = function(req, res) {
    res.json({
        filter: "Remote data",
        filterList: [
            {
                filter1: "",
                filter2: "",
                filter3: "test1",
                filter3Date: "",
            }
        ],
        radioFilter: ""
    });
};
