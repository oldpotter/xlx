// components/dklist/dklist.js
const moment = require('../../plugins/moment.min.js')
const DkItem = require('../../models/dkitem.js')
const config = require('../../config.js')
const util = require('../../utils/util.js')
const app = getApp()
Component({
	properties: {
		url: String,
		num: {
			type: Number,
			value: 10,
		},
		page: {
			type: Number,
			value: 1,
			observer: '_onPageChange'
		},
		toReload: {
			type: Number,
			observer: '_reload'
		},
		userInfo:Object,
	},

	data: {
		listData: undefined,
		isLoading: false,
		noMoreData: false,
	},

	methods: {
		_reload() {
			// console.log('reload')
			this.setData({
				listData: []
			})
			this._getData()
		},

		_onPageChange(){
			if(this.data.listData){
				this._getData()
			}
		},

		_getData() {
			// console.log('getData')
			wx.showLoading({
				title: '请稍后',
			})
			wx.showNavigationBarLoading()
			const _this = this
			this.setData({
				isLoading: true
			})
			try {
				util.handleUUID(this.data.userInfo)
					.then(uuid => util.pRequest(`${this.data.url}?uuid=${uuid}&num=${this.data.num}&page=${this.data.page}`))
					.then(res => {
						wx.hideLoading()
						_this.setData({
							isLoading: false
						})
						if (res.data.MESSAGE == 'SUCCESS') {
							if (res.data.DAKA.length == 0) {
								_this.setData({
									noMoreData: true
								})
								return
							}
							let listData = res.data.DAKA
							listData
								.forEach(item => {
									const diff = moment().diff(item.ctime)
									item.displayctime = diff < 60000 ? '刚刚' : moment(item.ctime).fromNow()
									item.displayduration = {
										hours: moment.duration(item.duration).hours(),
										minutes: moment.duration(item.duration).minutes(),
										seconds: moment.duration(item.duration).seconds(),
									}

								})
							if (_this.data.listData) {
								listData = _this.data.listData.concat(listData)
							}
							_this.setData({ listData })
						} else {
							wx.removeStorageSync('uuid')
							setTimeout(() => _this._getData(), 1000)
						}
						wx.hideNavigationBarLoading()
					})
			} catch (err) {
			}
		},

		onClickDkItem(event) {
			const index = event.detail.index
			if (index == this.selectedIndex) {
				return
			}
			let param = `listData[${index}].isSelected`
			this.setData({
				[param]: true
			})
			if (this.selectedIndex != undefined) {
				param = `listData[${this.selectedIndex}].isSelected`
				this.setData({
					[param]: false
				})
			}
			this.selectedIndex = index
			app.selectedDkId = this.data.listData[index].id
		},

		onClickDkDelete(event) {
			const _this = this
			const id = event.detail.id
			wx.showActionSheet({
				itemList: ['删除'],
				itemColor: '#FF0000',
				success: function (res) {
					util.handleUUID()
						.then(res => util.pRequest(`${config.service.deleteDKUrl}?uuid=${res}&id=${id}`))
						.then(res => {
							if (res.data.MESSAGE == 'SUCCESS') {
								wx.showToast({
									title: '删除成功',
								})
								let listData = _this.data.listData.filter(item => item.id != id)
								_this.setData({ listData })
								_this.selectedIndex = undefined
							} else {
								console.error('删除失败!!')
							}
						})
				},
				fail: function (res) { },
				complete: function (res) { },
			})
		},
	},
})
