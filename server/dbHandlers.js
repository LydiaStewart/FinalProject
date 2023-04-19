require('dotenv').config();
const { MongoClient } = require("mongodb");
const {MONGO_URI} = process.env;
const { v4: uuidv4 } = require("uuid");
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const getUsers = async (req, res) => {
    const client = new MongoClient(MONGO_URI,options)

try {
    await client.connect()
    const db = client.db('pageTurner')
    const user = await db.collection('users').find().toArray();
    return res.status(200).json({status: 200, data : user})

}
catch (err) {
    console.log(err.stack)
    return res.status(404).json({status: 404, message: err.message, data: user})
}
finally {
    client.close()
}
} 

const getUserFromSearch = async (req, res) => {
    const client = new MongoClient(MONGO_URI,options)
    const {search} = req.params;
try {
    await client.connect()
    const db = client.db('pageTurner')
    const user = await db.collection('users').findOne({nickname: search})
    if (user === null) {
        return res.status(404).json({status: 404, data: []})
    }
    else {
        return res.status(200).json({status: 200, data : user})
    }
}
catch (err) {
    console.log(err.stack)
    return res.status(404).json({status: 404, message: err.message, data: user})
}
finally {
    client.close()
}
}

const getUser = async (req,res) => {
    const client = new MongoClient(MONGO_URI,options)
    const {userId} = req.params;
    console.log(userId)
try {
    await client.connect()
    const db = client.db('pageTurner')
    const user = await db.collection('users').findOne({_id: userId})
    return res.status(200).json({status: 200, data : user})

}
catch (err) {
    console.log(err.stack)
    return res.status(404).json({status: 404, message: err.message, data: user})
}
finally {
    client.close()
}
}

const createUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI,options)
    const userInfo = req.body;
    const user = { _id: userInfo.sub,
        email: userInfo.email, 
        email_verified: userInfo.email_verified,
        name: userInfo.name,
        nickname: userInfo.nickname,
        picture: userInfo.picture,
        sub: userInfo.sub,
        updated_at: userInfo.updated_at,
        readBooks: [],
        favoriteBooks: [],
        toRead: [],
        following: [],
        followedBy: [],
        inbox: [],
        homeSections: []
    }
try {
    await client.connect();
    const db = client.db('pageTurner')
    const users = await db.collection('users').findOne({email : userInfo.email})
    if (users !== null) {
        failed = true;
    }
    else {
        await db.collection('users').insertOne(user)
        console.log(user)
        return res.status(200).json({status: 200, data : user})
    }
    
}
catch (err) {
    console.log(err.stack)
    return res.status(400).json({status: 400, message: err.message, data: user})
}
finally {
    client.close()
}
}

const addFollower = async (req, res) => {
    const client = new MongoClient(MONGO_URI,options)
    const {userId} = req.params;
  //  const {newFollowId} = req.params;
    const query = {_id: userId}
    const newValues = {$push: {following: req.body}}
    const queryTwo = {_id: req.body._id}
    
console.log(req.body)
    try {
        await client.connect()
        const db = client.db('pageTurner')
       const currentUser = await db.collection('users').findOne(query)
       const newValuesTwo = {$push: {followedBy: currentUser}}
        await db.collection('users').updateOne(query, newValues)
        await db.collection('users').findOne(queryTwo)
        await db.collection('users').updateOne(queryTwo, newValuesTwo)
        return res.status(200).json({status: 200, data : req.body})
    
    }
    catch (err) {
        console.log(err.stack)
        return res.status(400).json({status: 400, message: err.message, data: req.body})
    }
    finally {
        client.close()
    }
}

const removeFollower = async (req, res) => {
    const client = new MongoClient(MONGO_URI,options)
    const {userId} = req.params;
    const query = {_id: userId}
    const newValues = {$pull: {followers: {_id: userId}}}
    const queryTwo = {_id: req.body._id}
    try {
        await client.connect()
        const db = client.db('pageTurner')
        const currentUser = await db.collection('users').findOne(query)
        const newValuesTwo = {$pull: {followedBy: {_id: currentUser._id}}}
        await db.collection('users').updateOne(query, newValues)
        await db.collection('users').findOne(queryTwo)
        await db.collection('users').updateOne(queryTwo, newValuesTwo)
        return res.status(200).json({status: 200, data : req.body})
    
    }
    catch (err) {
        console.log(err.stack)
        return res.status(400).json({status: 400, message: err.message, data: req.body})
    }
    finally {
        client.close()
    }
}

const addReadBook = async (req, res) => {
    const client = new MongoClient(MONGO_URI,options)
    const {userId} = req.params;
    const query = {_id: userId}
    const newValues = {$push: {readBooks: req.body}}
    try {
        await client.connect()
        const db = client.db('pageTurner')
        await db.collection('users').findOne(query)
        await db.collection('users').updateOne(query, newValues)
        return res.status(200).json({status: 200, data : req.body})
    
    }
    catch (err) {
        console.log(err.stack)
        return res.status(400).json({status: 400, message: err.message, data: req.body})
    }
    finally {
        client.close()
    }
}

const removeReadBook = async (req, res) => {
    const client = new MongoClient(MONGO_URI,options)
    const {userId} = req.params;
    const query = {_id: userId}
    const newValues = {$pull: {readBooks: {id: req.body.id}}}
    try {
        await client.connect()
        const db = client.db('pageTurner')
        await db.collection('users').findOne(query)
        await db.collection('users').updateOne(query, newValues)
        return res.status(200).json({status: 200, data : req.body})
    
    }
    catch (err) {
        console.log(err.stack)
        return res.status(400).json({status: 400, message: err.message, data: req.body})
    }
    finally {
        client.close()
    }
}

const addBookToReadList = async (req, res) => {
    const client = new MongoClient(MONGO_URI,options)
    const {userId} = req.params;
    const query = {_id: userId}
    const newValues = {$push: {toRead: req.body}}
    try {
        await client.connect()
        const db = client.db('pageTurner')
        await db.collection('users').findOne(query)
        await db.collection('users').updateOne(query, newValues)
        return res.status(200).json({status: 200, data : req.body})
    
    }
    catch (err) {
        console.log(err.stack)
        return res.status(400).json({status: 400, message: err.message, data: req.body})
    }
    finally {
        client.close()
    }
}

const removeBookFromReadList = async (req, res) => {
    const client = new MongoClient(MONGO_URI,options)
    const {userId} = req.params;
    const query = {_id: userId}
    const newValues = {$pull: {toRead: {id: req.body.id}}}
    try {
        await client.connect()
        const db = client.db('pageTurner')
        await db.collection('users').findOne(query)
        await db.collection('users').updateOne(query, newValues)
        return res.status(200).json({status: 200, data : req.body})
    
    }
    catch (err) {
        console.log(err.stack)
        return res.status(400).json({status: 400, message: err.message, data: req.body})
    }
    finally {
        client.close()
    }
}

const addBookToFavorites = async (req, res) => {
    const client = new MongoClient(MONGO_URI,options)
    const {userId} = req.params;
    const query = {_id: userId}
    const newValues = {$push: {favoriteBooks: req.body}}
    try {
        await client.connect()
        const db = client.db('pageTurner')
        await db.collection('users').findOne(query)
        await db.collection('users').updateOne(query, newValues)
        return res.status(200).json({status: 200, data : req.body})
    
    }
    catch (err) {
        console.log(err.stack)
        return res.status(400).json({status: 400, message: err.message, data: req.body})
    }
    finally {
        client.close()
    }
}

const removeBookFromFavorites = async (req, res) => {
    const client = new MongoClient(MONGO_URI,options)
    const {userId} = req.params;
    const query = {_id: userId}
    const newValues = {$pull: {favoriteBooks:  {id: req.body.id}}}
    try {
        await client.connect()
        const db = client.db('pageTurner')
        await db.collection('users').findOne(query)
       const deleteBook = await db.collection('users').updateOne(query, newValues)
       console.log(deleteBook)
        return res.status(200).json({status: 200, data : req.body})
    
    }
    catch (err) {
        console.log(err.stack)
        return res.status(400).json({status: 400, message: err.message, data: req.body})
    }
    finally {
        client.close()
    }
}

const sendMessage = async (req, res) => {
    const client = new MongoClient(MONGO_URI,options)
    const userId = req.params.userId;
    const query = {_id: userId}
    const friendId = req.params.friendId;
    const queryTwo = {_id: friendId}
    const newValues = {$push: {inbox: {sentBy: userId, sentTo: friendId, message: req.body.message}}}
   const newValuesTwo = {$push: {inbox: {sentBy: userId, sentTo: friendId, message: req.body.message}}}
   console.log(queryTwo)
   console.log(newValuesTwo)
    try {
        await client.connect()
        const db = client.db('pageTurner')
        await db.collection('users').findOne(query)
        await db.collection('users').updateOne(query, newValues)
        await db.collection('users').findOne(queryTwo)
        await db.collection('users').updateOne(queryTwo, newValuesTwo)
        return res.status(200).json({status: 200, data : req.body})
        
    }
    catch (err) {
        console.log(err.stack)
        return res.status(400).json({status: 400, message: err.message, data: req.body})
    }
    finally {
        client.close()
    }
}

const deleteUser = async (req,res) => {
    const client = new MongoClient(MONGO_URI,options)
    const {userId} = req.params;
    
try {
    await client.connect()
    const db = client.db('pageTurner')
    const user = await db.collection('users').deleteOne({_id: userId})
    return res.status(200).json({status: 200, message: "User has been removed."})

}
catch (err) {
    console.log(err.stack)
    return res.status(404).json({status: 404, message: err.message, data: user})
}
finally {
    client.close()
}
}

const setGenrePreferences = async (req, res) => {
    const client = new MongoClient(MONGO_URI,options)
    const {userId} = req.params;
    const query = {_id: userId}
    const newValues = {$push: {homeSections: req.body}}
    console.log(req.body)
    try {
        await client.connect()
        const db = client.db('pageTurner')
        await db.collection('users').findOne(query)
        await db.collection('users').updateOne(query, newValues)
        return res.status(200).json({status: 200, data : req.body})
    
    }
    catch (err) {
        console.log(err.stack)
        return res.status(400).json({status: 400, message: err.message, data: req.body})
    }
    finally {
        client.close()
    }
}

module.exports = {getUsers, createUser, getUser, addReadBook, addBookToReadList, addBookToFavorites, getUserFromSearch, 
    addFollower, removeBookFromFavorites, removeBookFromReadList, removeReadBook, sendMessage, removeFollower, deleteUser,
setGenrePreferences}