require('dotenv').config();


const request = require('request-promise')
const {BOOKS_API_KEY} = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

//"https://www.googleapis.com/books/v1/volume?q"+search+`&key=${BOOKS_API_KEY}
const getSection =  async (req, res) => {
   //q=the+subject:science+fiction&filter=ebooks&
   const {section} = req.params;
try {
    return request(`https://www.googleapis.com/books/v1/volumes?q=subject:${section}&orderBy=newest&key=${BOOKS_API_KEY}`)
    .then((res) => JSON.parse(res))
    .then((data) => {
       
        return res.status(200).json({status: 200, data: data})
    })
}
catch (err) {
console.log(err.stack)
res.status(404).json({ status: 404, message: "Data not found." });
}
}
const getAuthor = async (req, res) => {
    const {search} = req.params;
    console.log(search)
    try {
        return request(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${search}&maxResults=40&key=${BOOKS_API_KEY}`)
        .then((res) => JSON.parse(res))
        .then((data) => {
       
            return res.status(200).json({status: 200, data: data})
        })
        
     }
    catch (err) {
        console.log(err.message)
        res.status(404).json({ status: 404, message: "Data not found." });
    }
    
}
const getCategory = async (req, res) => {
    const {section} = req.params;
    console.log(section)
    try {
        return request(`https://www.googleapis.com/books/v1/volumes?q=subject:${section}&maxResults=40&key=${BOOKS_API_KEY}`)
        .then((res) => JSON.parse(res))
        .then((data) => {
            console.log(data)
            return res.status(200).json({status: 200, data: data})
        })
        
     }
    catch (err) {
        console.log(err.message)
        res.status(404).json({ status: 404, message: "Data not found." });
    }
    
}
const getBook = async (req, res) => {
    const {search} = req.params;
   
    try {
        return request(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${BOOKS_API_KEY}`)
        .then((res) => JSON.parse(res))
        .then((data) => {
           // console.log(data)
            return res.status(200).json({status: 200, data: data})
        })
        
     }
    catch (err) {
        console.log(err.message)
        res.status(404).json({ status: 404, message: "Data not found." });
    }
    
}

const freeEbookSearch = async (req, res) => {
    const {ebookSearch} = req.query;
    console.log(ebookSearch)
    try {
        return request(`https://www.googleapis.com/books/v1/volumes?q=${ebookSearch}&filter=free-ebooks&key=${BOOKS_API_KEY}`)
        .then((res) => JSON.parse(res))
        .then((data) => {
           // console.log(data)
            return res.status(200).json({status: 200, data: data})
        })
    }
    catch (err) {
        console.log(err.message)
        res.status(404).json({ status: 404, message: "Data not found." });
    }
}

const getBookDetails = async (req, res) => {
const {bookId} = req.params;

try { 
    return request(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${BOOKS_API_KEY}`)
    .then((res) => JSON.parse(res))
    .then((data) => {
       
        return res.status(200).json({status: 200, data: data})
})}
catch (err) {
    console.log(err.message)
        res.status(404).json({ status: 404, message: "Data not found." });
}
}



module.exports = {getSection, getAuthor, getCategory, getBook, freeEbookSearch, getBookDetails};





// ?key=${booksAPIKey}