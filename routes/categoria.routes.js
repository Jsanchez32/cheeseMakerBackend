const { Router } = require('express');
const { check } = require('express-validator');

const { validateDocuments} = require('../middlewares/validate.documents.js');
const { validateJWT } = require('../middlewares/validate.jwt.js');
const { isAdminRole } = require('../middlewares/validate.role.js');
const { categoriExistsById,categoriExist } = require('../helpers/db.validators.js');

const { postCategoria,
      deleteCategoria,
      getCategoria,
      putCategoria,
      getById
      } = require('../controllers/categoria.controllers.js');


const router = Router();

/**
 * localhost/api/categorias
 */



router.get('/',getCategoria);

// Metodo get para traer por Id//
router.get('/:id',[
      check('id','No es un id valido').isMongoId(),
      check('id',).custom(categoriExistsById),
      validateDocuments
],getById);


// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [ 
   validateJWT, 
    check('nombre','El nombre es obligatorio').not().isEmpty(),

    //Valida si la categoria existe//
    check('nombre').custom(categoriExist),
    validateDocuments
], postCategoria );

// Eliminar categoria//
router.delete('/:id',[
      validateJWT,
      isAdminRole,
      check('id','No es un id valido').isMongoId(),
      check('id').custom(categoriExistsById),
      validateDocuments
],deleteCategoria)

// Actualizar categoria//
router.put('/:id',[
      check('id','No es un id valido').isMongoId(),
      check('id').custom(categoriExistsById),
      validateDocuments
],putCategoria);







module.exports = router;