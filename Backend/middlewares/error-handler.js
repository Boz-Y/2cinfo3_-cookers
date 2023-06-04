export function notFoundError(req, res, next) {
    const message = new Error("Not Found");
    message.status = 404;
    next(message);
};

export function errorHandler(err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message,
    });
};
