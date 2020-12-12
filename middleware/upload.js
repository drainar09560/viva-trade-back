const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cd(null, 'uploads/')
    }, 
    filename(req, file, cb) {
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        cb(null, `${date}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || 'image/jpeg') {
        cb(none, true)
    } else {
        cb(none, false)
    }
}

module.exports = multer({storage, fileFilter})