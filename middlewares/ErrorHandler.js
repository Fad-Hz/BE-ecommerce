export default function errorHandler(err, req, res, next) {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message

    if (err.name === 'Validation Error') {
        message = Object.values(err.errors)
            .map(item => item.message)
            .join(',')
        statusCode = 400
    }

    res.status(statusCode).json({
        message,
        stack: err.stack
    })
}