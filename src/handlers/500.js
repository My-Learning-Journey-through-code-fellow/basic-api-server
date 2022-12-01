'use strict';

module.exports = (error, req, res, next) => {
  let errorMessage = typeof (error) === 'string' ? error : error.message;
  res.status(500).send({
    error: 500,
    route: req.path,
    query: req.query,
    body: req.body,
    message: `SERVER ERROR ${errorMessage}`,
  });
};
