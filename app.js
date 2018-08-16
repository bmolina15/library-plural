const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session= require('express-session');


const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser());
app.use(session({secret:'library'}));
require('./src/config/passport.js')(app);
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
  { link: '/books', title: 'Book' },
  { link: '/authors', title: 'author' },
  {link: '/auth/logout', title:'logout'}
]

const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);


app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);


app.get('/', (req, res) => {
  res.render('index',
    {
      nav: [
        { link: '/books', title: 'Book' },
        { link: '/authors', title: 'author' }
      ],
      title: 'Library'
    }
  );
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
