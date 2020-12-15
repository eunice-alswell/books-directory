const {Router} = require('express')

const router = Router()

const {
    createAuthor,
    loginauthor,
    getAuthorByBook,
    getAuthorById,
    UpdateAuthor,
    deleteAuthor
} = require('../controllers/authorController')


//route for creating and account
router.post('/api/author',createAuthor)
//route for login
router.post('/api/loginUser',loginauthor)

//route for updating an account details
router.put('/api/update',UpdateAuthor)

router.get('/api/author/:authorId',getAuthorById)

router.get('/api/author/:authorId/books',getAuthorByBook)
router.get('/api/author/delete',deleteAuthor)




module.exports = router