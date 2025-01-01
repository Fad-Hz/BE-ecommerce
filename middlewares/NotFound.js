export default function notFound(req, res, next) {
    const error = new Error(`path tidak ditemukan - ${req.originalUrl}`)
    res.status(404)
    next(error)
}