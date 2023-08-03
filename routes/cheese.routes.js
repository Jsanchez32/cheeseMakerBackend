const {Router} = require('express');
const {check} = require('express-validator');
const {validateDocuments} = require('../middlewares/validate.documents.js');
const {validateJWT} = require('../middlewares/validate.jwt.js');
const {isAdminRole} = require('../middlewares/validate.role.js');
const {categoriExistsById,cheeseExistById,} = require('../helpers/db.validators.js');

const {getCheese,postCheese,deleteCheese,putCheese} = require('../controllers/cheese.controller.js');
const { isValidObjectId } = require('mongoose');

const router = Router();

router.get('/',getCheese);
router.post('/',[
    validateJWT,
    check('name','Name es requerido').not().isEmpty(),
    check('categoria').custom(categoriExistsById),
    validateDocuments
],postCheese);
router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id').custom(isValidObjectId),
    check('id').custom(cheeseExistById),
    validateDocuments
],deleteCheese);
router.put('/:id',[
    validateJWT,
    check('id').custom(cheeseExistById),
    validateDocuments
],putCheese);


module.exports = router;