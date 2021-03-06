const Board = require('../models/board');

function boardsIndex(req, res) {
  Board.find(req.query)
    .populate('user')
    .exec((err, boards) => {
      if(err) return res.status(500).json({ error: err});
      return res.json(boards);
    });
}

function boardsCreate(req, res) {
  req.body.user = req.user;
  Board.create(req.body, (err, board) => {
    if(err) return res.status(400).json({ error: err });
    return res.json(board);
  });
}

function boardsShow(req, res) {
  Board.findById(req.params.id)
    .populate('user')
    .exec((err, board) => {
      if(err) return res.status(500).json({ error: err });
      if(!board) return res.status(404).json({ error: 'Not found' });

      return res.json(board);
    });
}

function boardsUpdate(req, res) {
  Board.findById(req.params.id, (err, board) => {
    console.log(err);
    if(err) return res.status(500).json({ error: err });
    if(!board) return res.status(404).json({ error: 'Not found' });

    for(const key in req.body) {
      board[key] = req.body[key];
    }

    board.save((err, board) => {
      console.log(err);
      if(err) return res.status(400).json({ error: err });
      Board
        .populate(board, 'user')
        .then(
          (board) => {
            res.json(board);
          },
          (error) => {
            res.status(400).json({ error: error });
          }
      );
    });
  });
}

function boardsDelete(req, res) {
  Board.findById(req.params.id, (err, board) => {
    if(err) return res.status(500).json({ error: err });
    if(!board) return res.status(404).json({ error: 'Not found' });

    board.remove(err => {
      if(err) return res.status(500).json({ error: err });
      res.status(204).send();
    });
  });
}

function pinIndex(req, res) {
  Board.findById(req.params.id, (err, board) => {
    if(err) return res.status(500).json({ error: err });
    if(!board) return res.status(404).json({ error: 'Not found' });
    res.json(board.pins);
  });
}

function pinCreate(req, res) {

  Board.findById(req.params.id, (err, board) => {
    if(err) return res.status(500).json({ error: err });
    if(!board) return res.status(404).json({ error: 'Not found' });

    const pin = board.pins.create(req.body);
    board.pins.push(pin);
    board.save((err) => {
      if(err) return res.status(400).json({ error: err });
      res.json(pin);
    });
  });
}

function pinShow(req, res) {
  Board.findById(req.params.id, (err, board) => {
    if(err) return res.status(500).json({ error: err });
    if(!board) return res.status(404).json({ error: 'Not found' });

    const pin = board.pins.id(req.params.pinId);
    if(!pin) return res.status(404).json({ error: 'Not found' });
    res.json(pin);
  });
}

function pinUpdate(req, res) {
  Board.findById(req.params.id, (err, board) => {
    if(err) return res.status(500).json({ error: err });
    if(!board) return res.status(404).json({ error: 'Not found' });

    const pin = board.pins.id(req.params.pinId);
    if(!pin) return res.status(404).json({ error: 'Not found' });

    for(const key in req.body) {
      pin[key] = req.body[key];
    }

    board.save((err) => {
      if(err) return res.status(400).json({ error: err });
      res.json(pin);
    });
  });
}

function pinDelete(req, res) {
  Board.findById(req.params.id, (err, board) => {
    if(err) return res.status(500).json({ error: err });
    if(!board) return res.status(404).json({ error: 'Not found' });

    const pin = board.pins.id(req.params.pinId);
    if(!pin) return res.status(404).json({ error: 'Not found' });

    pin.remove();

    board.save((err) => {
      if(err) return res.status(400).json({ error: err });
      res.status(204).send();
    });
  });
}

module.exports = {
  index: boardsIndex,
  create: boardsCreate,
  show: boardsShow,
  update: boardsUpdate,
  delete: boardsDelete,
  pinIndex,
  pinCreate,
  pinShow,
  pinUpdate,
  pinDelete
};
