
const app = getApp()

Page({
	data: {
		num: undefined,
	},

	onShow() {
		this.setData({
			num: 4
		})
	},

	onClickCollectionList() {
		wx.navigateTo({
			url: './collectionlist',
		})
	},

	onClickReadingOptions() {
		wx.navigateTo({
			url: './options',
		})
	},

/*
	onTap(event) {
		const x = event.detail.x
		const y = event.detail.y
		const screenWidth = app.screenWidth
		const screenHeight = app.screenHeight
		let num = this.data.num

		if (num == 4 && x <= screenWidth / 4 && y <= screenHeight / 4) {//左上
			// console.log('左上')
			this.setData({
				num: 3
			})
			setTimeout(() => {
				this.setData({
					num: 4
				})
			}, 5 * 1000)
		} else if (num == 3 && x > screenWidth * 0.75 && x <= screenWidth && y > screenHeight * 0.75 && y <= screenHeight) {//右下
			// console.log('右下')
			this.setData({
				num: 2
			})
		} else if (num == 2 && x > screenWidth * 0.75 && x < screenWidth && y < screenHeight * 0.75) {//右上
			// console.log('右上')
			this.setData({
				num: 1
			})
		} else if (num == 1 && x <= screenWidth / 4 && y > screenHeight * 0.75 && y < screenHeight) {//左下
			wx.showToast({
				title: '打卡ring启用',
				duration: 3000,
				success: function (res) {
					// const url = 'https://kl-1255829748.cos.ap-shanghai.myqcloud.com/ring.mp3'
					const url = 'https://ys2wqql1.qcloud.la/ring.mp3'
					wx.downloadFile({
						url: url,
						header: {},
						success: function (res) {
							wx.saveFile({
								tempFilePath: res.tempFilePath,
								success: function (res) {
									wx.setStorageSync('usingRing', res.savedFilePath)
								},
								fail: function (res) { },
								complete: function (res) { },
							})


						},
						fail: function (res) { },
						complete: function (res) { },
					})

				},
			})
		} else {
			this.setData({
				num: 4
			})
		}
	}*/
})