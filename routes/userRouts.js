let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    uuidv4 = require('uuid/v4'),
    router = express.Router();
const DIR = './public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype =="application/pdf") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
const EPaper = require('../models/EPaper');
//upload Youtube
router.post('/ePaperAdd', upload.single('profileImg'), (req, res, next) => {
    console.log(req.body)
    const url = req.protocol + '://' + req.get('host')
    const epaper = new EPaper({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        profileImg: url + '/public/' + req.file.filename,
        headline : req.body.headline,
        content : req.body.content,
    });
    user.save().then(result => {
        res.status(201).json({
            message: "User registered successfully!",
            userCreated: {
                _id: result._id,
                profileImg: result.profileImg,
                headline : req.body.headline,
                content : req.body.content,
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})




// User model
let User = require('../models/User');
router.post('/user-profile', upload.single('profileImg'), (req, res, next) => {
    console.log(req.body)
    const url = req.protocol + '://' + req.get('host')
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        profileImg: url + '/public/' + req.file.filename,
        headline : req.body.headline,
        content : req.body.content,
        category : req.body.category,
        youtubeVideoId : req.body.youtubeVideoId

    });
    user.save().then(result => {
        res.status(201).json({
            message: "User registered successfully!",
            userCreated: {
                _id: result._id,
                profileImg: result.profileImg,
                name : result.name,
                headline : req.body.headline,
                content : req.body.content,
                category : req.body.category,
                youtubeVideoId : req.body.youtubeVideoId

            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})
router.get("/", (req, res, next) => {
    User.find().sort({$natural:-1}).then(data => {
        // res.status(200).json({
        //     message: "User list retrieved successfully!",
        //     users: data
        // });
        res.status(200).send(data);
    });
});

router.get("/top1News", (req, res, next) => {
    User.find({ }).sort({$natural:-1}).limit(1).then(data => {
        res.status(200).send(data);
    });
});

router.get("/top1News", (req, res, next) => {
    User.find({ }).sort({$natural:-1}).limit(11).then(data => {
        data.shift();
        res.status(200).send(data);
    });
});

router.get("/keralaNews", (req, res, next) => {
    User.find({ category: 'kerala'}).sort({$natural:-1}).then(data => {
        res.status(200).send(data);
    });
});

router.get("/nationalNews", (req, res, next) => {
    User.find({ category: 'national'}).sort({$natural:-1}).then(data => {
        res.status(200).send(data);
    });
});

router.get("/internationalNews", (req, res, next) => {
    User.find({ category: 'international'}).sort({$natural:-1}).then(data => {
        res.status(200).send(data);
    });
});
router.get("/whatsappNews", (req, res, next) => {
    User.find({ category: 'whatsapp'}).sort({$natural:-1}).then(data => {
        res.status(200).send(data);
    });
});
router.get("/interviewNews", (req, res, next) => {
    User.find({ category: 'interview'}).sort({$natural:-1}).then(data => {
        res.status(200).send(data);
    });
});
router.get("/vellithiraNews", (req, res, next) => {
    User.find({ category: 'vellithira'}).sort({$natural:-1}).then(data => {
        res.status(200).send(data);
    });
});
router.get("/crimeNews", (req, res, next) => {
    User.find({ category: 'crime'}).sort({$natural:-1}).then(data => {
        res.status(200).send(data);
    });
});
router.get("/youtubeNews", (req, res, next) => {
    User.find({ category: 'youtube'}).sort({$natural:-1}).then(data => {
        res.status(200).send(data);
    });
});
module.exports = router;