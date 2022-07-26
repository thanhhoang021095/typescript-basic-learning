function generateError(message: string, code: number):void {
    throw {
        message,
        errorCode: code
    }
}

generateError('Internal Server Error', 500)