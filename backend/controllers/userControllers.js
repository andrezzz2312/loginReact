const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password, role, pic, position, idCard } = req.body
	const userExists = await User.findOne({ email })
	if (userExists) {
		res.status(400)
		throw new Error('User Already Exists')
	}
	const user = await User.create({
		name,
		email,
		password,
		role,
		position,
		idCard,
		pic,
	})
	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			isAdmin: user.isAdmin,
			position: user.position,
			idCard: user.cedula,
			pic: user.pic,
			token: generateToken(user._id),
		})
	} else {
		res.status(400)
		throw new Error('Error Ocurred!')
	}
})

const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			isAdmin: user.isAdmin,
			position: user.position,
			cedula: user.cedula,
			pic: user.pic,
			token: generateToken(user._id),
		})
	} else {
		res.status(400)
		throw new Error('Invalid Email or Password!')
	}
})

module.exports = { registerUser, authUser }
