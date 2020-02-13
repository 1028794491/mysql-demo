var express = require('express');
var router = express.Router();
var todolistDAO = require('../dao/todolistDAO');
var result = require('../model/result');

/* list */
router.get('/:pageNum', function (req, res) {
    var pageNum = req.params.pageNum;
    todolistDAO.pages(function (pagesNum) {
        var pages = 0;
        pages = pagesNum;
        todolistDAO.list(pageNum, function (list) {
            res.json(result.createResult(true, list, pages));
        });
    });
});

/* add */
router.post('/', function (req, res) {
    var params = req.body;
    todolistDAO.add(params, function (success) {
        var r = result.createResult(success, null);
        res.json(r);
    });
});

/* delete */
router.delete('/:id', function (req, res) {
    var id = req.params.id;
    todolistDAO.deleteById(id, function (success) {
        res.json(result.createResult(success, null));
    });
});

/* update */
router.put('/:id', function (req, res) {
    var params = req.body;
    params.id = req.params.id;
    todolistDAO.update(params, function (success) {
        var r = result.createResult(success, null);
        res.json(r);
    });
});

module.exports = router;
