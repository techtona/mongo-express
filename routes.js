let router = require('express').Router();

let  mhsController = 
require('./controllers/mahasiswaController');

router.route('/mahasiswa')
    .get(mhsController.index)
    .post(mhsController.store);

// delete and update
router.route('/mahasiswa/:id')
    .get(mhsController.view)
    .put(mhsController.update)
    .delete(mhsController.destroy);

module.exports = router;