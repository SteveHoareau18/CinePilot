class GeneralToolsService {

    checkNoEmptyInput(input) {
        if (typeof input === 'string') {
            return input.trim().length > 0
        } else return false
    }

    checkValidEmail(input) {
        const reg = new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
        return reg.test(input)
    }
}

export default new GeneralToolsService()