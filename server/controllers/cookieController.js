const jwt = require('jsonwebtoken');
const cookieController = {};
// MOVE THIS TO THE ENV FILE
const privateKey = 'wobbegong';

cookieController.setUserCookie = async (req, res, next) => {
  try {
    const { _id, username } = res.locals.user;
    // create jwt with payload and store as cookie
    const token = jwt.sign({
      _id,
      username
    }, privateKey);

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
    const token = req.cookies.ssid;
    if (!token) {
      res.locals.token = false;
      return next();
    }
    const decoded = jwt.verify(token, privateKey);
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
    res.locals.cookie = 'deleted';
    return next();
  } catch (err) {
    return next({
      log: 'cookieController.deleteSession' + err,
      message: { err: 'cookieController.deleteSession: ERROR: could not delete session'}
    });
  }
  
};

module.exports = cookieController;