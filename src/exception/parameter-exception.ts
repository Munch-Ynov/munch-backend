export class ParameterException extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'ParameterException'
    }
}
