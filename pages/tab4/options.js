const app = getApp()
Page({
	data: {
		content: `一始無始一析三極無盡本天一一地一二人一三一積十矩無匱化三天二三地二三人二三大三合六生七八九運三四成環五七一妙衍萬往萬來用變不動本本心本太陽昂明人中天地一一終無終一。`,
		levels: ['小', '标准', '大', '极大'],
		level: undefined,
	},

	onShow(){
		this.setData({
			level:app.level
		})
	},

	onChange(event) {
		const value = event.detail.value
		// console.log(`value:${value}`)
		this.setData({
			level: value
		})
	},

	onUnload() {
		app.level = this.data.level
		wx.setStorageSync('level', app.level)
	}
})