export function dateUnformat(dashedDate) {
    let dateArray = dashedDate.split('-')

    if (dateArray[1] === 0) {
        dateArray[1] = 12
    } else {
        dateArray[1] = dateArray[1] - 1
    }

    return new Date(...dateArray)
}

export function dateFormatter(date) {
    let month = '' + (date.getMonth() + 1)
    let day = '' + date.getDate()
    let year = date.getFullYear()

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export function constructDate(date) {
    switch(typeof date) {
        case 'string':
            return dateUnformat(date)
        case 'object':
            switch (date) {
                case null:
                    return null
                default:
                    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
            }
        default:
            return null
    }
}
            