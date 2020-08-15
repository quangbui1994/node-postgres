const express = require('express');
const route = express.Router();
const tutorials = require('../controllers/tutorial.controller');

route.post('/', tutorials.create);
route.get('/:id', tutorials.findOne);
route.get('/', tutorials.findAll);
route.put('/:id', tutorials.update);
route.delete('/:id', tutorials.deleteOne);
route.delete('/', tutorials.deleteAll);
route.get('/published', tutorials.findAllPublished);

module.exports = route;