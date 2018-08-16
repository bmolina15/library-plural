const express = require('express');
const { MongoClient } = require('mongodb')
const debug = require('debug')('app:admingRoutes');
const adminRouter = express.Router();

const books = [
    {
        title: 'War and peace',
        genre: 'Historical fiction',
        author: 'Lev Nikolayevich Tolstoy',
        read: false
    },
    {
        title: 'Les Misérables',
        genre: 'Historical fiction',
        author: 'Victor Hugo',
        read: false
    },
    {
        title: 'The time machine',
        genre: 'Science fiction',
        author: 'H. G. Wells',
        read: false
    },
]

function router(nav) {

    adminRouter.route('/')
        .get((req, res) => {
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';
            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug('connected correctly to server');
                    const db = client.db(dbName);
                    //add data to db
                    const response = await db.collection('books').insertMany(books);
                    res.json(response);
                } catch (err) {
                    debug(err.stack);
                }
                client.close();
            }());

        });
    return adminRouter;
}

module.exports = router;