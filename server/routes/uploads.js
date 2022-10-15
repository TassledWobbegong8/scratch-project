const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadController = require('../controllers/uploadController');

// set multer diskStorage configs
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('MULTER STORAGE DESTINATION ', req);
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    console.log(file);
    const prefix = Date.now().toLocaleString() + '_';
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

router.post('/', upload.single('file'), uploadController.sendFile);

router.get('/:imageKey', uploadController.getUserFiles);


module.exports = router;