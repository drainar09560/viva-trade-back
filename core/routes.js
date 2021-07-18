const { Router } = require('express')
const router = Router()
const passport = require('passport')
const upload = require('../middleware/upload')
const homeController = require('../controllers/home.controller')

const serviceController = require('../controllers/service.controller')

const authController = require('../controllers/auth.controller')
const galleryController = require('../controllers/gallery.controller')


router.post('/admin/auth', authController.auth)
router.post('/admin/registration', authController.registration)

router.get('/admin/gallery', galleryController.getAll)
router.post('/admin/gallery', upload.single('imageUrl'), galleryController.create)
router.delete('/admin/gallery', galleryController.delete)


router.get('/admin/services', serviceController.getAll)
router.post('/admin/services', upload.single('imageUrl'), serviceController.create)
router.patch('/admin/services', upload.single('imageUrl'), serviceController.update)
router.delete('/admin/services', serviceController.delete)

router.get('/home', homeController.getAll)

module.exports = router

