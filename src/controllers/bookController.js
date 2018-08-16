const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');

function bookController(bookService,nav){


    function getById(req, res) {
        const { id } = req.params;
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';
        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Connected correctly to server');
                const db = client.db(dbName);
                const col = await db.collection('books');
                const book = await col.findOne({ _id: new ObjectID(id) });

                book.details = await bookService.getBookById(book.bookId);
                res.render(
                    'bookView', {
                        nav,
                        title: 'library',
                        book
                    }
                );
            } catch (err) {
                debug(err.stack);
            }
        }());
    }

    function getIndex(req, res) {
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';
        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('connected correctly to server');
                const db = client.db(dbName);
                //add data to db
                const col = await db.collection('books');
                const books = await col.find().toArray();
                res.render(
                    'bookListView',
                    {
                        nav,
                        title: 'Library',
                        books
                    }
                );
            } catch (err) {
                debug(err.stack);
            }
            client.close();
        }());
    }

    function middleware(req,res,next){
        next();
    }

    return{
        getIndex,
        getById,
        middleware
    };
}

module.exports=bookController;