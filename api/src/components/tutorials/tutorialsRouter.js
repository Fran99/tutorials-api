const express = require('express');
const {
  getToken, create, list, show, update, del,
} = require('./tutorialsController');
const { tutorialCreation } = require('../../middlewares/tutorialCreationMiddleware');

const router = express.Router();

/**
 * Route to get a temp token for tutorials creation.
 */
router.get('/token', getToken);

/**
 * Route to create a new tutorial.
 */
router.post('/', tutorialCreation, create);

/**
 * List all the available tutorials
 */
router.get('/', list);

router.get('/:id', show);

router.put('/:id', update);

router.delete('/:id', del);

module.exports = {
  tutorialsRouter: router,
};
