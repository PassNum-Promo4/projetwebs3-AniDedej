const express = require('express');
const router = express.Router();
const SharedContentCtrl = require('../controllers/sharedContent.controller');

/* GET sharedContents listing. */
router.get('/', SharedContentCtrl.getAll);

router.get('/:username', SharedContentCtrl.getByUsername);

router.post('/add/:username', SharedContentCtrl.AddByUsername);

router.put('/edit/:username', SharedContentCtrl.editByUsername);

router.delete('/remove/:_id', SharedContentCtrl.removeById);

/* GET sharedContents Comments listing. */
router.get('/comments/:id', SharedContentCtrl.getCommentsById);

router.post('/comments/add/:id', SharedContentCtrl.addCommentById);

module.exports = router;
