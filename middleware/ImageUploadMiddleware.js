const multer = require('multer')
const path = require('path')

const storage = multer.memoryStorage({
    filename:(req, file, cb) => {
        cb(null,file.originalname)
    }
})

const upload = multer({storage})

module.exports = upload;