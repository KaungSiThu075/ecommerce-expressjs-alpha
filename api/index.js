var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const {db}= require('../config/db');
const auth = require('../middleware/AuthMiddleware');
const superAdminStartUp = require('../middleware/CreatingSuperAdmin');

const indexRouter = require('../routes');
const superAdminRouter = require('../routes/superAdmin');
const usersRouter = require('../routes/users');
const productsRouter = require('../routes/products');
const userProfileRouter = require('../routes/userProfiles');
const favoriteProductsRouter = require('../routes/favoriteProducts');
const productReviewsRouter = require('../routes/productReviews');
const adminRouter = require('../routes/admin');
const orderRouter = require('../routes/order');
const categoryRouter = require('../routes/category');
const cartRouter = require('../routes/cart');


var index = express();
mongoose.set('strictQuery',true);

superAdminStartUp();

mongoose.connect(db)
    .then(console.log('mongo db connected'))
    .catch(err=>console.log('err ',err));



index.use(logger('dev'));
index.use('/image',express.static('public/images'))
index.use(express.json());
index.use(express.urlencoded({ extended: false }));
index.use(cookieParser());
index.use(express.static(path.join(__dirname, 'public')));
index.use(cors())

index.use('/', indexRouter);
index.use('/api/superAdmin',superAdminRouter);
index.use('/api/users', usersRouter);
index.use('/api/products',productsRouter);
index.use('/api/userProfile',auth.verifyUserToken,userProfileRouter);
index.use('/api/favoriteProducts',auth.verifyUserToken,favoriteProductsRouter);
index.use('/api/productReviews',productReviewsRouter);
index.use('/api/admin',adminRouter);
index.use('/api/orders',orderRouter);
index.use('/api/categories',categoryRouter);
index.use('/api/cart',auth.verifyUserToken,cartRouter);

// catch 404 and forward to error handler
index.use(function(req, res, next) {
  next(createError(404));
});

// error handler
index.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = index;
