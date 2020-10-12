const multer = require('multer');
const ImageUpload = require('../base/imageUpload');
const fs = require('fs');
const { promisify } = require('util');
const { validateMessage } = require('../../../fixtures/messageStatus.json');

class MulterImageUpload extends ImageUpload {
    constructor() {
        super();
    }

    upload(req, res, next) {
        multer({
            storage: multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, `./uploads/${req.path.replace(/[^a-zA-Z -]/g, '')}`);
                },
                filename: function (req, file, cb) {
                    cb(null, new Date().toISOString() + file.originalname);
                }
            }),
            limits: {
                fileSize: 1024 * 1024 * 5,
                files: 1
            },
            fileFilter: (req, file, cb) => {
                if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                    return cb(new Error('Only Images are allowed !'), false);
                }

                cb(null, true);
            },

        }).single('Image')(req, res, function (err) {
            if (err instanceof multer.MulterError || err || req.file == null) {
                res.status(validateMessage.status).json({ message: validateMessage.message });
            } else {
                next();
            }
        });
    }

    remove = promisify(fs.unlink);
}

module.exports = MulterImageUpload;