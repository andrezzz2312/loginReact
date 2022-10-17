const express = require('express')
const {
	getPerms,
	createPerm,
	UpdatePerm,
	getPermById,
	deletePerm,
} = require('../controllers/permControllers')
const { protect } = require('../middlewares/authMiddleware')
// const {registerUser, authUser} = require('../controllers/userControllers')
const router = express.Router()

router.route('/').get(protect, getPerms)
router.route('/create').post(protect, createPerm)
router
	.route('/:id')
	.get(getPermById)
	.put(protect, UpdatePerm)
	.delete(protect, deletePerm)

module.exports = router
