// Your code here
function createEmployeeRecord(arr) {
    let obj = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return obj
}


function createEmployeeRecords(arr) {
    let newArr = []
    arr.forEach(element => {
        newArr.push(createEmployeeRecord(element))
    });
    return newArr
}

function createTimeInEvent(obj, dateStamp) {
    let [date, hour] = dateStamp.split(" ")

    obj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return obj
}

function createTimeOutEvent(obj, dateStamp) {
    let [date, hour] = dateStamp.split(" ")

    obj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return obj
}

function hoursWorkedOnDate(obj, dateStamp) {
    let inEvent = obj.timeInEvents.find(function (e) {
        return e.date === dateStamp
    })

    let outEvent = obj.timeOutEvents.find(function (e) {
        return e.date === dateStamp
    })

    return (outEvent.hour - inEvent.hour) / 100

}

function wagesEarnedOnDate(obj, dateStamp) {
    let save = hoursWorkedOnDate(obj, dateStamp)
    return save * obj.payPerHour
}

function allWagesFor(obj) {
    let dates = obj.timeInEvents.map(function (element) {
        return element.date
    })

    let pay = dates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate(obj, d)
    }, 0)


    return pay
}


function findEmployeeByFirstName(source, firstName) {
    return source.find(element => { return element.firstName === firstName })
}


function calculatePayroll(array) {
    return array.reduce(function (memo, rec) {
        return memo + allWagesFor(rec)
    }, 0)
}