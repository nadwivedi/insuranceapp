const Vehicle = require('../models/Vehicle')

const buildSearchFilter = (search) => {
  if (!search || !search.trim()) return {}

  const regex = new RegExp(search.trim(), 'i')
  return {
    $or: [
      { registrationNumber: regex },
      { ownerName: regex },
      { chassisNumber: regex },
      { engineNumber: regex },
      { mobileNumber: regex },
    ],
  }
}

const getVehicles = async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1)
    const limit = Math.max(Number(req.query.limit) || 20, 1)
    const search = req.query.search || ''
    const filter = buildSearchFilter(search)

    const totalRecords = await Vehicle.countDocuments(filter)
    const data = await Vehicle.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()

    res.json({
      success: true,
      data,
      pagination: {
        currentPage: page,
        totalPages: Math.max(Math.ceil(totalRecords / limit), 1),
        totalRecords,
        limit,
      },
    })
  } catch (error) {
    console.error('Error fetching vehicles:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch vehicles' })
  }
}

const getVehicleStatistics = async (_req, res) => {
  try {
    const total = await Vehicle.countDocuments()
    res.json({ success: true, data: { total } })
  } catch (error) {
    console.error('Error fetching vehicle statistics:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch vehicle statistics' })
  }
}

const searchVehicle = async (req, res) => {
  try {
    const searchInput = (req.params.searchInput || '').trim()
    if (!searchInput) {
      return res.status(400).json({ success: false, message: 'Search input is required' })
    }

    const regex = new RegExp(searchInput, 'i')
    const data = await Vehicle.find({ registrationNumber: regex }).sort({ createdAt: -1 }).limit(10).lean()

    res.json({ success: true, data })
  } catch (error) {
    console.error('Error searching vehicle:', error)
    res.status(500).json({ success: false, message: 'Failed to search vehicle' })
  }
}

const checkVehicleExists = async (req, res) => {
  try {
    const regNumber = (req.params.regNumber || '').trim().toUpperCase()
    const existingVehicle = await Vehicle.findOne({ registrationNumber: regNumber }).lean()

    res.json({
      success: true,
      exists: Boolean(existingVehicle),
      data: existingVehicle || null,
    })
  } catch (error) {
    console.error('Error checking vehicle:', error)
    res.status(500).json({ success: false, message: 'Failed to check vehicle' })
  }
}

const createVehicle = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      userId: req.body.userId || '000000000000000000000001',
      registrationNumber: (req.body.registrationNumber || req.body.vehicleNumber || '').trim().toUpperCase(),
    }

    if (!payload.registrationNumber || !payload.chassisNumber) {
      return res.status(400).json({ success: false, message: 'registrationNumber and chassisNumber are required' })
    }

    const vehicle = await Vehicle.create(payload)
    res.status(201).json({ success: true, data: vehicle })
  } catch (error) {
    console.error('Error creating vehicle:', error)
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Vehicle already exists' })
    }
    res.status(500).json({ success: false, message: 'Failed to create vehicle' })
  }
}

const updateVehicle = async (req, res) => {
  try {
    const payload = {
      ...req.body,
    }

    if (payload.registrationNumber || payload.vehicleNumber) {
      payload.registrationNumber = (payload.registrationNumber || payload.vehicleNumber || '').trim().toUpperCase()
    }

    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    }).lean()

    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' })
    }

    res.json({ success: true, data: vehicle })
  } catch (error) {
    console.error('Error updating vehicle:', error)
    res.status(500).json({ success: false, message: 'Failed to update vehicle' })
  }
}

const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id).lean()

    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' })
    }

    res.json({ success: true, message: 'Vehicle deleted successfully' })
  } catch (error) {
    console.error('Error deleting vehicle:', error)
    res.status(500).json({ success: false, message: 'Failed to delete vehicle' })
  }
}

module.exports = {
  getVehicles,
  getVehicleStatistics,
  searchVehicle,
  checkVehicleExists,
  createVehicle,
  updateVehicle,
  deleteVehicle,
}
