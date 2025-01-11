const routeNotFound = (req, res, next) => {
    const error = new Error('Route not found : ' + req.originalUrl);
    res.status(404).json({ message: error.message });
    next(error);
}

const errorHandler = (error, req, res, next) => {
    let status = res.statusCode !== 200 ? 500 : res.statusCode
    let message = error.message;

    if (err.name === "CastError" && err.kind === "ObjectId") {
        statusCode = 404;
        message = "Resource not found";
    }

    res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });

}

export { routeNotFound, errorHandler };