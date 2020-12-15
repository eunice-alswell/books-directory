const {Router} = require('express')

const router = Router()

const {getbook,getbookById,addBook,deletebook} =require('../controllers/bookController')

router.get('/api/books',getbook)

router.get('/api/books/:bookId',getbookById)

router.post('/api/books',addBook)

router.delete('/api/books/:boookId',deletebook)



module.exports = router