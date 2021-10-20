const joinClasses = (...classes: any) => {
    const classesArray = classes.map(x => {
        if (typeof x == "string" || x instanceof String) {
            return x
        } else if (x instanceof Array) {
            return joinClasses(...x);
        } else if (x instanceof Object) {
            return Object.entries(x).map(x => x[1] ? x[0] : null).filter(x => x).join(" ");
        } else {
            throw "Invalid Class Type Provided, Expected: String, Array Or Object";
        }
    })
    return classesArray.join(" ");
}

const numberArray = (maxNumber: number, startFrom: number) => {
    return Array.from({ length: maxNumber }, (_, i) => i + startFrom);
}

const modifyObjectValue = (key: string, objectToModify: Object) => {
    objectToModify = Object.assign({}, objectToModify);
    objectToModify[key] = !objectToModify[key]
    return objectToModify;
}

const makeStringTitle = (string: string) => {
    return string.charAt(0).toUpperCase() + (string).slice(1)
}

export { joinClasses, numberArray, modifyObjectValue, makeStringTitle };
