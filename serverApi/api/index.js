import express from 'express'
const router = express.Router()

router.use('/bill', require('./billManager'))

module.exports = router