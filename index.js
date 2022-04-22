// Your code here
const createEmployeeRecord = (array) => {
    const recordObj = {
        firstName : array[0],
        familyName : array[1],
        title : array[2],
        payPerHour : array[3],
        timeInEvents : [],
        timeOutEvents : [],
    }
    return recordObj
}

const createEmployeeRecords = (arrays) => {
    return arrays.map(array => createEmployeeRecord(array))
}

const createTimeInEvent = (recordObj, datestamp) => {
    let [newDate, newHour] = datestamp.split(" ")
    recordObj.timeInEvents.push({
        type : 'TimeIn',
        hour : +newHour,
        date : newDate,
    })
    return recordObj
}

const createTimeOutEvent = (recordObj, datestamp) => {
    let [newDate, newHour] = datestamp.split(" ")
    recordObj.timeOutEvents.push({
        type : 'TimeOut',
        hour : +newHour,
        date : newDate,
    })
    return recordObj
}



const hoursWorkedOnDate = (recordObj, wantedDate) => {
    let inEvent = recordObj.timeInEvents.find(timeInEvent => timeInEvent.date === wantedDate)
    let outEvent = recordObj.timeOutEvents.find(timeOutEvent => timeOutEvent.date === wantedDate)
    const hoursWorked = +outEvent.hour - +inEvent.hour 
    return hoursWorked / 100
}

const wagesEarnedOnDate = (recordObj, wantedDate) => {
   return hoursWorkedOnDate(recordObj, wantedDate) * recordObj.payPerHour
}

const allWagesFor = (recordObj) => {
    const allWagesArray = []
    recordObj.timeInEvents.forEach(timeInEvent => {
        allWagesArray.push(wagesEarnedOnDate(recordObj, timeInEvent.date))
    })
    
    const allWages = allWagesArray.reduce((total, currentWagesEarned) => total + currentWagesEarned, 0)
    return allWages
}

const calculatePayroll = (array) => {
    const totalEmployeeWages = []
    array.forEach(recordObj => {
        totalEmployeeWages.push(allWagesFor(recordObj))
    })

    const totalPayroll = totalEmployeeWages.reduce((total, currentEmployeeWages) => total + currentEmployeeWages, 0)
    return totalPayroll
}