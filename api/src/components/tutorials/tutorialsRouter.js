const express = require('express');

const router = express.Router();

const tutorials = [];
let id = 1;

router.get('/create', (req, res) => {
  res.json({
    code: 200,
    data: 'thisisthetoken2',
  });
});

router.post('/', (req, res) => {
  id += 1;
  tutorials.push(
    {
      id,
      ...req.body,
    },
  );
  res.json({
    code: 201,
    data: req.body,
  });
});

router.get('/', (req, res) => {
  res.json({
    code: 200,
    data: tutorials,
  });
});

router.get('/:id', (req, res) => {
  res.json({
    code: 200,
    data: tutorials.find((t) => t.id === parseInt(req.params.id, 10)),
  });
});

router.put('/:id', (req, res) => {
  res.json({
    code: 200,
    data: req.params.id,
  });
});

router.delete('/:id', (req, res) => {
  res.status(204).end();
});

module.exports = {
  tutorialsRouter: router,
};
