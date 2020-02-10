export function dateUnformat(dashedDate) {
    let dateArray = dashedDate.split('-')
    
    if (dateArray[dateArray.length - 1].length === 4) {
        dateArray.unshift(dateArray.pop())
    }

    if (dateArray[1] === 0) {
        dateArray[1] = 12
    } else {
        dateArray[1] = dateArray[1] - 1
    }

    if (dateArray.length > 3) {
        dateArray[2] = dateArray[2].split('T')
        dateArray = dateArray.flat().slice(0, 3)
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

export function formatUSA(date) {
   let dateArray = dateFormatter(date).split('-')
   dateArray.push(dateArray.shift())
   return dateArray.join('-')
}

export function unformatThenFormat(date) {
    return formatUSA(dateUnformat(date))
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

export function sortDueDates(array) {
    return array.sort((a, b) => b.due_date - a.due_date)
}
            