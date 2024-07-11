const express = require('express');
const { createForm, getTodaysForms, getPendingForms, getSavedForms, updateForm } = require('../controllers/formController');
const router = express.Router();

router.post('/dwm_form', createForm);
router.get('/dwm_forms/today', getTodaysForms);
router.get('/dwm_forms/pending', getPendingForms);
router.get('/dwm_forms/saved', getSavedForms);
router.put('/dwm_form/:id', updateForm);

module.exports = router;