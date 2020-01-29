export function tomorrow() {
    return {type: 'DATE_FORWARD', days: 1}
}

export function nextWeek() {
    return {type: 'DATE_FORWARD', days: 7}
}

export function yesterday() {
    return {type: 'DATE_BACKWARD', days: 1}
}

export function lastWeek() {
    return {type: 'DATE_BACKWARD', days: 7}
}

export function setNewDate(date) {
    return {type: 'SET_DATE', date: date}
}