'use strict';

const express = require('express');
const morgan = require('morgan');
const PORT = 4000;
const {getSection, getBook, freeEbookSearch, getBookDetails, getAuthor, getCategory} = require("./apiHandlers")
const {getUsers, createUser, getUser, addBookToReadList, addReadBook, addBookToFavorites, getUserFromSearch, 
  addFollower, removeBookFromFavorites, removeBookFromReadList, removeReadBook, sendMessage, removeFollower, deleteUser} = require("./dbHandlers")

express()
  .use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('./server/assets'))
  .use(express.json({limit: "50mb"}))
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

  // Database endpoints
  
  .get("/api/users", getUsers)
  .get("/api/search/user/:search", getUserFromSearch)
  .get("/api/user/:userId", getUser)
  .post("/api/newuser", createUser)
  .post("/api/read/:userId", addReadBook)
  .patch("/api/nonread/:userId", removeReadBook)
  .post("/api/toread/:userId", addBookToReadList)
  .patch("/api/nontoread/:userId", removeBookFromReadList)
  .post("/api/favorites/:userId", addBookToFavorites)
  .patch("/api/nonfavorites/:userId", removeBookFromFavorites)
  .post("/api/addfollower/:userId", addFollower)
  .patch("/api/removefollower/:userId", removeFollower)
  .post("/api/message/:userId/:friendId", sendMessage)
  .delete("/api/deleteuser/:userId", deleteUser)

  // API endpoints
  .get(`/api/section/:section`, getSection)
  .get("/api/book/:bookId", getBookDetails)
  .get("/api/search/title/:search", getBook)
  .get("/api/search/author/:search", getAuthor)
  .get("/api/search/genre/:section", getCategory)
  .get("api/ebooksearch", freeEbookSearch)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
