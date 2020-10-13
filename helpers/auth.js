var admin = require('firebase-admin');
var serviceAccount = require('../config/firebaseServiceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

exports.authCheck = async (req) => {
  try {
    const currentUser = await admin.auth().verifyIdToken(req.headers.authtoken);

    return currentUser;
  } catch (error) {
    throw new Error('Invalid or Expired Token');
  }
};

exports.authCheckMiddleware = (req, res, next) => {
  if (req.headers.authtoken) {
    admin
      .auth()
      .verifyIdToken(req.headers.authtoken)
      .then((result) => {
        next();
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    res.json({ error: 'Unauthorized' });
  }
};
