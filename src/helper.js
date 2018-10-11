const holiday = require('cn-holiday')
const dayjs = require('dayjs')

const getWorkdaysOfWeek = date => {
  const day = dayjs(date)
  return holiday.getWorkdaysBetween(day.startOf('week'), day.endOf('week'))
}

const isLastWorkdayOfWeek = (date) => {
  const day = dayjs(date)
  const lastWorkday = getWorkdaysOfWeek(day).pop()
  return lastWorkday === day.format('YYYY-MM-DD')
}

module.exports = {
  isLastWorkdayOfWeek: isLastWorkdayOfWeek,
  isWorkday: holiday.isWorkday,
}