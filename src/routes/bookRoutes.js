const express = require('express');
const bookService = require('../services/goodreadservice');
const bookController = require('../controllers/bookController');

const bookRouter = express.Router();

function router(nav) {
    const { getIndex, getById, middleware } = bookController(bookService, nav);
    bookRouter.use(middleware);

    bookRouter.route('/')
        .get(getIndex);

    bookRouter.route('/:id')
        .get(getById);
    return bookRouter;
}




module.exports = router;
