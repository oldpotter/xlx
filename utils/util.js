const moment = require('../plugins/moment.min.js')
const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}

const getTimeFromNow = timestamp => {
	return moment(timestamp).fromNow()
}

const getFormatTime = timestamp => {
	return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
}

module.exports = {
	formatTime: formatTime,
	getTimeFromNow: getTimeFromNow,
	getFormatTime: getFormatTime
}
