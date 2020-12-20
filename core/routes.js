const { Router } = require('express')
const router = Router()
const passport = require('passport')
const upload = require('../middleware/upload')

const storeController = require('../controllers/store.controller')

const authController = require('../controllers/auth.controller')
const typesController = require('../controllers/types.controller')
const manufController = require('../controllers/manufactured.controller')
const galleryController = require('../controllers/gallery.controller')


router.post('/admin/auth', authController.auth)
router.post('/admin/registration', authController.registration)

router.get('/admin/gallery', galleryController.getAll)
router.post('/admin/gallery', upload.single('image'), galleryController.create)
router.delete('/admin/gallery', upload.single('image'), galleryController.delete)

router.post('/admin/types', typesController.create)
router.delete('/admin/types', typesController.delete)
router.patch('/admin/types', typesController.update)

router.post('/admin/manuf', manufController.create)
router.delete('/admin/manuf', manufController.delete)
router.patch('/admin/manuf', manufController.update)

router.get('/admin/', storeController.getDataByAdmin)
router.post('/admin/products', upload.single('image'), storeController.create)
router.patch('/admin/products', upload.single('image'), storeController.update)
router.delete('/admin/products', upload.single('image'), storeController.delete)

router.post('/store', storeController.getByParams)

module.exports = router