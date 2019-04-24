const express = require('express');
const router = express.Router();

const data = [
  {id: 1, title: 'Finalize project', order: 1, completed: false, createdOn: new Date()},
  {id: 2, title: 'Book ticket to London', order: 2, completed: false, createdOn: new Date()},
  {id: 3, title: 'Finish last article', order: 3, completed: false, createdOn: new Date()},
  {id: 4, title: 'Get a new t-shirt', order: 4, completed: false, createdOn: new Date()},
  {id: 5, title: 'Create dinner reservation', order: 5, completed: false, createdOn: new Date()},
];

router.get('/', function (req, res) {
  res.status(200).json(data);
});

router.get('/:id', function (req, res) {
  let found = data.find(function (item) {
    return item.id === parseInt(req.params.id);
  });

  if (found) {
    res.status(200).json(found);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', function (req, res) {
  let itemIds = data.map(item => item.id);
  let orderNums = data.map(item => item.order);

  let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
  let newOrderNum = orderNums.length > 0 ? Math.max.apply(Math, orderNums) + 1 : 1;

  let newItem = {
    id: newId,
    title: req.body.title,
    order: newOrderNum,
    completed: false,
    createdOn: new Date()
  };

  data.push(newItem);

  res.status(201).json(newItem);
});

router.put('/:id', function (req, res) {
  let found = data.find(function (item) {
    return item.id === parseInt(req.params.id);
  });

  if (found) {
    let updated = {
      id: found.id,
      title: req.body.title,
      order: req.body.order,
      completed: req.body.completed
    };

    let targetIndex = data.indexOf(found);

    data.splice(targetIndex, 1, updated);

    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

router.delete('/:id', function (req, res) {
  let found = data.find(function (item) {
    return item.id === parseInt(req.params.id);
  });

  if (found) {
    let targetIndex = data.indexOf(found);

    data.splice(targetIndex, 1);
  }

  res.sendStatus(204);
});

module.exports = router;
