const moment = require('../../plugins/moment.min.js')
const DkItem = require('../../models/dkitem.js')
const config = require('../../config.js')
const util = require('../../utils/util.js')
Page({
	data: {
		start: undefined,//开始时间
		duration: {
			hours: '00',
			minutes: '00',
			seconds: '00'
		},
		running: false,//是否正在计时
		showDialog: false,
		dkItem: new DkItem(),
		list: undefined
	},

	onLoad() {
		this.getData()
	},

	//点击“开始”亦或“结束”按钮
	onClickBtn() {
		if (!this.data.running) {
			//开始
			this.setData({
				running: true,
				start: moment()
			})
			this.interval = setInterval(() => {
				let duration = this.preciseDiff(this.data.start, moment(), true)
				duration.hours = duration.hours < 10 ? `0${duration.hours}` : duration.hours
				duration.minutes = duration.minutes < 10 ? `0${duration.minutes}` : duration.minutes
				duration.seconds = duration.seconds < 10 ? `0${duration.seconds}` : duration.seconds
				this.setData({ duration })
			}, 1000)
		} else {
			//结束
			clearInterval(this.interval)
			let duration = this.preciseDiff(this.data.start, moment(), true)
			console.log(`${duration.hours}小时${duration.minutes}分钟${duration.seconds}秒`)
			let dkItem = this.data.dkItem
			dkItem.duration = this.data.duration
			dkItem.tsDuration = moment().diff(this.data.start)
			dkItem.tsDate = moment().format('x')

			this.setData({
				running: false,
				duration: {
					hours: '00',
					minutes: '00',
					seconds: '00'
				},
				showDialog: true,
				dkItem: dkItem
			})
			// console.log('dkItem:', this.data.dkItem)
		}
	},

	//点击确定
	onConfirm() {
		const _this = this
		wx.showLoading({
			title: '请稍后',
		})
		try {
			util.handleUUID()
				.then(uuid => {
					const url = `${config.service.saveDKUrl}?uuid=${uuid}&type=1&record=${_this.data.dkItem.content}&ctime=${_this.data.dkItem.tsDate}&duration=${_this.data.dkItem.tsDuration}`
					// console.log('url:', url)
					util.pRequest(url, 'POST')
						.then(res => {
							if (res.data.MESSAGE == 'SUCCESS') {
								_this.setData({
									showDialog: false
								})
								wx.showToast({
									title: '保存成功',
								})
								_this.getData()
							} else {
								console.error('保存失败....')
							}

						})
				})
		} catch (err) {
			wx.hideLoading()
			console.error('出错啦：', err)
		}
	},

	onCancel() {
		this.setData({
			showDialog: false
		})
	},

	onInput(event) {
		const param = 'dkItem.content'
		this.setData({
			[param]: event.detail.value
		})
		// console.log(this.data.dkItem.content)
	},

	getData(){
		try {
			const _this = this
			wx.showLoading({
				title: '请稍后',
			})
			util.handleUUID()
				.then(res => util.pRequest(`${config.service.getDKsUrl}?uuid=${res}&num=5&page=1`))
				.then(res => {
					if (res.data.MESSAGE == 'SUCCESS') {
						// console.log(res)
						let list = res.data.DAKA
						list
							.forEach(item => {
								item.displayctime = moment(item.ctime).format('YYYY-MM-DD  HH:mm')
								item.displayduration = {
									hours: moment.duration(item.duration).hours(),
									minutes: moment.duration(item.duration).minutes(),
									seconds: moment.duration(item.duration).seconds(),
								}
							})
						_this.setData({ list })
						wx.hideLoading()
					}

				})
		}
		catch (err) {
			wx.hideLoading()
			console.error(err)
		}
	},

	//工具方法
	preciseDiff(m1, m2, returnValueObject) {
		var firstDateWasLater;

		m1.add(m2.utcOffset() - m1.utcOffset(), 'minutes'); // shift timezone of m1 to m2

		if (m1.isSame(m2)) {
			if (returnValueObject) {
				return this.buildValueObject(0, 0, 0, 0, 0, 0, false);
			} else {
				return STRINGS.nodiff;
			}
		}
		if (m1.isAfter(m2)) {
			var tmp = m1;
			m1 = m2;
			m2 = tmp;
			firstDateWasLater = true;
		} else {
			firstDateWasLater = false;
		}

		var yDiff = m2.year() - m1.year();
		var mDiff = m2.month() - m1.month();
		var dDiff = m2.date() - m1.date();
		var hourDiff = m2.hour() - m1.hour();
		var minDiff = m2.minute() - m1.minute();
		var secDiff = m2.second() - m1.second();

		if (secDiff < 0) {
			secDiff = 60 + secDiff;
			minDiff--;
		}
		if (minDiff < 0) {
			minDiff = 60 + minDiff;
			hourDiff--;
		}
		if (hourDiff < 0) {
			hourDiff = 24 + hourDiff;
			dDiff--;
		}
		if (dDiff < 0) {
			var daysInLastFullMonth = moment(m2.year() + '-' + (m2.month() + 1), "YYYY-MM").subtract(1, 'M').daysInMonth();
			if (daysInLastFullMonth < m1.date()) { // 31/01 -> 2/03
				dDiff = daysInLastFullMonth + dDiff + (m1.date() - daysInLastFullMonth);
			} else {
				dDiff = daysInLastFullMonth + dDiff;
			}
			mDiff--;
		}
		if (mDiff < 0) {
			mDiff = 12 + mDiff;
			yDiff--;
		}

		if (returnValueObject) {
			return this.buildValueObject(yDiff, mDiff, dDiff, hourDiff, minDiff, secDiff, firstDateWasLater);
		} else {
			return buildStringFromValues(yDiff, mDiff, dDiff, hourDiff, minDiff, secDiff);
		}


	},
	//工具方法
	buildValueObject(yDiff, mDiff, dDiff, hourDiff, minDiff, secDiff, firstDateWasLater) {
		return {
			"years": yDiff,
			"months": mDiff,
			"days": dDiff,
			"hours": hourDiff,
			"minutes": minDiff,
			"seconds": secDiff,
			"firstDateWasLater": firstDateWasLater
		}
	}

})