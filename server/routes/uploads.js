const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadController = require('../controllers/uploadController');
const usersController = require('../controllers/usersController');
const cookieController = require('../controllers/cookieController');
const roomsController = require('../controllers/roomsController');

// set multer diskStorage configs
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log('MULTER STORAGE DESTINATION ', req);
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    // console.log(file);
    const prefix = Date.now() + '_';
    cb(null, `${prefix}${file.originalname}`);
  }
});

//multer filter function to filter out video file types
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('video')) cb('No videos allowed', false);
  else cb(null, true);
};

//define upload function as multer object with storage set to storage configs
const upload = multer({ 
  storage: storage,
  fileFilter: multerFilter
});

// ROUTING START HERE ///
router.post('/', 
  (req, res, next) => {
    console.log('COOKIE BEFORE multer',req.cookies);
    return next();
  },
  upload.single('file'), 
  uploadController.sendFile, 
  cookieController.verifyUser, 
  usersController.getUser, 
  usersController.saveFile, 
  (req, res) => {
    res.status(200).json(res.locals.fileArray);
  });

router.get('/:fileKey', 
  uploadController.getUserFiles,
  cookieController.getRoomCookie,
  roomsController.setActiveFile,
  (req, res) => {
    res.status(200).json(res.locals.fileURL);
  });
//ensure getfilekey successful
//if so, get roomId via cookieController
//save filename is activeFile of current room

router.delete('/:fileKey',
  uploadController.deleteUserFiles,
  cookieController.verifyUser, 
  usersController.getUser,
  usersController.deleteFile,
  (req, res) => {
    res.status(200).json('successfully deleted file!')
  });


module.exports = router;