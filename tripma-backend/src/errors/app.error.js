class AppError extends Error {
    constructor(status, message) {
        super(message)
        this.status = status
        this.name = 'AppError'
    }
}

export default AppError