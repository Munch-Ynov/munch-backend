class ParameterException extends Error {
    param: string

    constructor(param: string, message: string) {
        super(message)
        this.param = param
        this.name = 'ParameterException'
    }
}

export { ParameterException }
