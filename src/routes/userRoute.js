const {Router} = require('express')

const router = Router()

const {
    createUser,
    loginUser,
    UpdateUser
} = require('../controllers/userController')


//route for creating and account
router.post('/api/user/new',createUser)
//route for login
router.post('/api/user/loginUser',loginUser)

//route for updating an account details
router.put('/api/user/update',UpdateUser)



module.exports = router