function notFound(req, res) {
    res.status(404).json({
      message: 'not found'
    })
  }
  
  function errorHandling(err, req, res, next) {
    const status = err.status || 500
    res.status(status).json({
      message: err.message
    })
  }

  module.exports = {
      notFound,
      errorHandling,
  }