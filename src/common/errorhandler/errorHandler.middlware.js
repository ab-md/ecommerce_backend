const notFound = (req, res, next) => {
    return res.status(404).json({
        status: 404,
        message: `Not found ${req.originalUrl}`
    });
}

const serverError = (err, req, res, next) => {
    let statusCode = err.status || err.statusCode || err.code || 500;
     if (typeof statusCode !== 'number') {
        statusCode = 500;
    }
    return res.status(statusCode).json({
        statusCode,
        error: err.message || err.stack || "Internal Server Error"
    })
}

export {
    notFound,
    serverError
}