const jwt = require('jsonwebtoken');
const cookieController = {};

cookieController.testRoute = (req, res, next) => {
  console.log(req.cookies);
  res.status(200).json(req.cookies);
};

cookieController.setUserCookie = async (req, res, next) => {
  if (!res.locals.user) {
    res.locals.loggedIn = false;
    return next();
  }
  try {
    const { _id, username } = res.locals.user;
    // create jwt with payload and store as cookie
    const token = jwt.sign({
      _id,
      username
    }, process.env.PRIVATE_KEY);

    await res.cookie('ssid', token, {httpOnly: true});
    res.locals.loggedIn = true;
    return next();
  } catch (err) {
    return next({
      log: 'cookieController.setUserCookie' + err,
      message: { err: 'cookieController.setUserCookie: ERROR: could not set user cookie'}
    });
  }
};

cookieController.verifyUser = async (req, res, next) => {
  // check and verify jwt in cookie
  try {
    console.log('VERIFYUSER: ', req.cookies);
    const token = req.cookies.ssid;
    if (!token) {
      res.locals.token = false;
      return next();
    }
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    res.locals.token = decoded;
    return next();
  } catch (err) {
    return next({
      log: 'cookieController.verifyUser' + err,
      message: { err: 'cookieController.verifyUser: ERROR: could not verify valid session'}
    });
  }
};

cookieController.deleteSession = async (req, res, next) => {
  // remove token from ssid cookie
  try {
    res.cookie('ssid', '', {
      maxAge: 0,
      overwrite: true
    });
    res.cookie('O_AUTH', '', {
      maxAge: 0,
      overwrite: true
    });
    res.locals.cookie = 'deleted';
    return next();
  } catch (err) {
    return next({
      log: 'cookieController.deleteSession' + err,
      message: { err: 'cookieController.deleteSession: ERROR: could not delete session'}
    });
  }
  
};

cookieController.setRoomCookie = async (req, res, next) => {
  try {
    console.log('setting cookie ', req.body.room);
    res.cookie('roomId', req.body.room, {httpOnly: true});
    return next();
  } catch (err) {
    return next({
      log: 'cookieController.setRoomCookie' + err,
      message: { err: 'cookieController.setRoomCookie: ERROR: could not set room cookie'}
    });
  }
};

cookieController.getRoomCookie = async (req, res, next) => {
  try {
    console.log('cookies: ', req.cookies);
    res.locals.roomId = req.cookies.roomId;
    return next();
  } catch (err) {
    return next({
      log: 'cookieController.getRoomCookie' + err,
      message: { err: 'cookieController.getRoomCookie: ERROR: could not retrieve room cookie'}
    });
  }
};

module.exports = cookieController;