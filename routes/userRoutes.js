const { Router } = require('express');
const {
  setUsers,
  setUserData,
  getAllUserData
} = require('../controllers/users');

const router = Router();

router.post('/get-users', setUsers);
router.post('/set-user-data', setUserData);
router.get('/get-all-data', getAllUserData);

module.exports = router;
