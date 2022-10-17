const mongoose = require('mongoose')

const permSchema = mongoose.Schema(
	{
		department: {
			type: String,
			required: true,
		},
		managerId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Manager',
		},
		managerName: {
			type: String,
			required: true,
			ref: 'Manager',
		},
		solicitedDate: {
			type: Date,
			required: true,
		},
		worker: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Worker',
		},
		workerIdCard: {
			type: String,
			required: true,
			ref: 'Worker',
		},
		workerName: {
			type: String,
			required: true,
			ref: 'Worker',
		},
		workerPosition: {
			type: String,
			required: true,
			ref: 'Worker',
		},
		workerWorkHours: {
			type: String,
			required: true,
			ref: 'Worker',
		},
		requestedHours: {
			type: Array,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		isApproved: {
			type: Boolean,
			required: true,
			default: false,
		},
		approvedDate: {
			type: Date,
			required: false,
		},
	},
	{ timestamps: true }
)

const Perm = mongoose.model('Perm', permSchema)

module.exports = Perm
