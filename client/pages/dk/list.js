const config = require('../../config.js')
const util = require('../../utils/util.js')
const moment = require('../../plugins/moment.min.js')
Page({
	data: {
		list: undefined,
		isLoading: false,
		noMoreData: false,
		page: 1,
	},

	onLoad() {
		wx.getShareInfo({
			shareTicket: 'true',
			success: function (res) { },
			fail: function (res) { },
			complete: function (res) { },
		})
		this.getData()
	},

	onReachBottom() {
		if (this.data.noMoreData) {
			return
		}
		this.setData({
			isLoading: true,
			page: this.data.page + 1
		})
		this.getData()
	},

	getData() {
		try {
			const _this = this
			wx.showLoading({
				title: '请稍后',
			})
			util.handleUUID()
				.then(res => util.pRequest(`${config.service.getDKsUrl}?uuid=${res}&num=10&page=${_this.data.page}`))
				.then(res => {
					// console.log(res)
					if (res.data.MESSAGE == 'SUCCESS') {
						let list = res.data.DAKA
						if (list.length == 0) {
							_this.setData({
								noMoreData: true,
								isLoading: false,
							})
							wx.hideLoading()
							return
						}
						list.forEach(item => {
							item.displayctime = moment(item.ctime).format('YYYY年MM月DD日 HH:mm')
							const diff = moment().diff(item.ctime)
							const str = diff < 60000 ? '刚刚' : moment(item.ctime).fromNow()
							item.displayctime = str + ' ' + item.displayctime
							item.displayduration = {
								hours: moment.duration(item.duration).hours(),
								minutes: moment.duration(item.duration).minutes(),
								seconds: moment.duration(item.duration).seconds(),
							}
						})
						if (_this.data.list) {
							list = _this.data.list.concat(list)
						}
						_this.setData({
							list: list,
							isLoading: false,
						})
						// console.log(_this.data.list)
						wx.hideLoading()
					}

				})
		}
		catch (err) {
			wx.hideLoading()
			console.error(err)
		}
	},

	onClickItem(event){
		const index = event.currentTarget.dataset.index
		const param = `list[${index}].isSelected`
		this.setData({
			[param]:true
		})
	},

	onClickDelete(event) {
		const _this = this
		const id = event.currentTarget.dataset.id
		wx.showActionSheet({
			itemList: ['删除'],
			itemColor: 'red',
			success: function (res) {
				util.handleUUID()
					.then(res => util.pRequest(`${config.service.deleteDKUrl}?uuid=${res}&id=${id}`))
					.then(res => {
						if (res.data.MESSAGE == 'SUCCESS') {
							wx.showToast({
								title: '删除成功',
							})
							let list = _this.data.list.filter(item => item.id != id)
							_this.setData({ list })
						} else {
							console.error('删除失败!!')
						}
					})
			},
			fail: function (res) { },
			complete: function (res) { },
		})
	},

	onClickShare(event){
		console.log('share')
	},

	onShareAppMessage(messages) {
		wx.showShareMenu({
			withShareTicket: true,
			success: function (res) { },
			fail: function (res) { },
			complete: function (res) { },
		})
		const _this = this
		return {
			path: `/pages/dk/list?share=true`,
			success(res) { },
			fail(res) { },
		}
	},
})