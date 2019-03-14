const Moment = require('moment');
require("twix");
const momenttz = require('moment-timezone');
const MomentRange = require('moment-range');
const { intersection } = require('lodash');
const moment = MomentRange.extendMoment(Moment);

module.exports = {
    isWorkPeriodActive,
    getCommonWorkHours
};

function isWorkPeriodActive({from, to, weekDays}, timezone) {
    if (!weekDays) return;

    const daysList = _getDaysArray(weekDays);

    return _dayInDaysList(daysList, timezone) && _timeInRange(from, to, timezone);
}

function getCommonWorkHours(user1, user2) {
    // Calculate of common working hours
    const momentsRangeSource = _getMomentsRangeFromUserWorkPeriod(
        user1.workPeriod.from,
        user1.workPeriod.to,
        user1.timezone
    );

    const momentsRangeCompare = _getMomentsRangeFromUserWorkPeriod(
        user2.workPeriod.from,
        user2.workPeriod.to,
        user2.timezone
    );

    const rangeSource = moment(momentsRangeSource.start).twix(momentsRangeSource.end);
    const rangeCompare = moment(momenttz.tz(moment(momentsRangeCompare.start), 'HH:mm', user1.timezone).format()).twix(moment(momenttz(moment(momentsRangeCompare.end), 'HH:mm', user1.timezone).format()));

    const commonHours = rangeSource.intersection(rangeCompare);

    // Calculate of common working days
    const daysSource = _getDaysArray(user1.workPeriod.weekDays);
    const daysCompare = _getDaysArray(user2.workPeriod.weekDays);
	console.log(daysSource, daysCompare);
    const intersectionWorkDays = intersection(daysSource, daysCompare);

    return {
        hours: commonHours.simpleFormat('HH:mm'),
        days: intersectionWorkDays
    }
}

const _timeInRange = (from, to, timezone) => {
    const startDate = moment(from, 'HH:mm').tz(timezone);
    const endDate = moment(to, 'HH:mm').tz(timezone);
    const currentTzTime = momenttz.tz(timezone);

    return currentTzTime.isBetween(startDate, endDate);
};

const _dayInDaysList = (weekDaysArray, timezone) => {
    const momentTz = momenttz.tz(timezone);
    const currentDayWithTz = momentTz.format('dd');

    return weekDaysArray.includes(currentDayWithTz);
};

const _getMomentsRangeFromUserWorkPeriod = (from, to, timezone) => {
    return {
        start: momenttz.tz(from, 'HH:mm', timezone).format(),
        end: momenttz.tz(to, 'HH:mm', timezone).format()
    }
};

const _getDaysArray = (days) => days.trim().split(', ');