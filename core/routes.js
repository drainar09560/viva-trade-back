const { Router } = require('express')
const router = Router()
const passport = require('passport')
const upload = require('../middleware/upload')

const storeController = require('../controllers/store.controller')

const homeController = require('../controllers/home.controller')
const authController = require('../controllers/auth.controller')
const typesController = require('../controllers/types.controller')
const manufController = require('../controllers/manufactured.controller')


router.post('/admin/auth', authController.auth)
router.post('/admin/registration', authController.registration)

router.get('/admin/types', typesController.getAll)
router.post('/admin/types', typesController.create)
router.delete('/admin/types', typesController.delete)
router.patch('/admin/types', typesController.update)

router.get('/admin/manuf', manufController.getAll)
router.post('/admin/manuf', manufController.create)
router.delete('/admin/manuf', manufController.delete)
router.patch('/admin/manuf', manufController.update)

router.post('/admin/products', upload.single('image'), storeController.create)
router.patch('/admin/products', upload.single('image'), storeController.update)

router.get('/', homeController.getFavorite)

router.get('/product', storeController.getByParams)

module.exports = router