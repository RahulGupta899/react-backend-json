const express = require('express')
const router = express.Router()
const {
    signup,
    login,
    logout,
    forgotPassword,
    resetPassword,
    getLoggedInUserDetails,
    changePassword,
    updateUserInfo,
    adminAllUsers,
    managerAllUsers,
    adminGetSingleUser,
    adminSingleUserUpdate,
    adminDeleteSingleUser
} = require('../controllers/userController')


const {
    isLoggedIn,
    isAdmin,
    customRole,
    isManager
} = require('../middlewares/user')

router.route('/user/signup').post(signup)
router.route('/user/login').post(login)
router.route('/user/logout').get(logout)
router.route('/user/forgotPassword').post(forgotPassword)
router.route('/user/password/reset/:forgotToken').post(resetPassword)
router.route('/user/user-dashboard').get(isLoggedIn,getLoggedInUserDetails)
router.route('/user/change-password').post(isLoggedIn,changePassword)
router.route('/user/update-user-info').post(isLoggedIn,updateUserInfo)

router.route('/admin/all-users').get(isLoggedIn,isAdmin,adminAllUsers)
router.route('/admin/get-single-user/:id').get(isLoggedIn,isAdmin,adminGetSingleUser)
router.route('/admin/update-single-user/:id').put(isLoggedIn,isAdmin,adminSingleUserUpdate)
router.route('/admin/delete-single-user/:id').delete(isLoggedIn,isAdmin,adminDeleteSingleUser)

router.route('/manager/all-users').get(isLoggedIn,isManager,managerAllUsers)
// router.route('/admin/all-users').get(isLoggedIn,customRole('admin'),adminAllUsers)  // OR
module.exports = router