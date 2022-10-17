const Perm = require('../models/permModel')
const asyncHandler = require('express-async-handler')

const getPerms = asyncHandler(async (req, res) => {
	const perms = await Perm.find()
	res.json(perms)
})

const createPerm = asyncHandler(async (req, res) => {
	const { department, workerWorkHours, requestedHours, description } = req.body

	if (!department || !workerWorkHours || !requestedHours || !description) {
		res.status(400)
		throw new Error('Please fill all the fields')
	} else {
		var createdDt = new Date()
		const perm = new Perm({
			managerId: req.user._id,
			managerName: req.user.name,
			department,
			solicitedDate: createdDt,
			worker: req.worker._id,
			workerIdCard: req.worker._id,
			workerName: req.worker.name,
			workerPosition: req.worker.position,
			workerWorkHours,
			requestedHours,
			description,
		})

		const createdPerm = await perm.save()

		res.status(201).json(createdPerm)
	}
})

const getPermById = asyncHandler(async (req, res) => {
	const perm = await Perm.findById(req.params.id)

	if (perm) {
		res.json(perm)
	} else {
		res.status(404).json({ message: 'Permission not found' })
	}
})

const UpdatePerm = asyncHandler(async (req, res) => {
	const { department, approvedDate } = req.body

	const perm = await Perm.findById(req.params.id)

	if (perm.managerId.toString() !== req.user._id.toString()) {
		res.status(401)
		throw new Error('You cannot perform this action')
	}
	if (perm) {
		perm.department = department
		perm.approvedDate = approvedDate
		const updatedPerm = await perm.save()
		res.json(updatedPerm)
	} else {
		res.status(404)
		throw new Error('Permission not found')
	}
})

const deletePerm = asyncHandler(async (req, res) => {
	const perm = await Perm.findById(req.params.id)
	if (perm.managerId.toString() !== req.user._id.toString()) {
		res.status(401)
		throw new Error('You cannot perform this action')
	}
	if (perm) {
		await perm.remove()
		res.json({ message: 'Permission removed' })
	} else {
		res.status(404)
		throw new Error('Permission not found')
	}
})

module.exports = { getPerms, createPerm, getPermById, UpdatePerm, deletePerm }
