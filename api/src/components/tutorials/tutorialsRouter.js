const express = require('express');
const {
  getToken, create, list, show, update, del, massDelete,
} = require('./tutorialsController');
const { tutorialCreationMiddleware } = require('../../middlewares/tutorialCreationMiddleware');
const { validationMiddleware } = require('../../middlewares/validationMiddleware');
const { tutorialSchema } = require('./tutorialsValidation');

const router = express.Router();

/**
 * Route to get a temp token for tutorials creation.
 */
router.get('/token', getToken);

/**
 * Route to create a new tutorial.
 */
router.post('/', tutorialCreationMiddleware, validationMiddleware(tutorialSchema), create);

/**
 * List all the available tutorials
 */
router.get('/', list);

/**
 * Shows a single tutorial given its id.
 */
router.get('/:id', show);

/**
 * Updates a tutorial
 */
router.put('/:id', validationMiddleware(tutorialSchema), update);

/**
 * Deletes all tutorials
 */
router.delete('/mass_delete', massDelete);

/**
 * Deletes a tutorial
 */
router.delete('/:id', del);

module.exports = {
  tutorialsRouter: router,
};
