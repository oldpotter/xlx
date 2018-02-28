const app = getApp()
const List = require('../../views/list/index.js')
const config = require('../../config.js')
Page(Object.assign({}, List, {

	onLoad(options) {
		const url = `${config.service.getSubjectUrl}?subjectid=${config.subjectid.yuan}&format=JSON`
		this.setOptions({ url: url })
		this.requestData()
	},

	onClickSearchBar() {
		wx.navigateTo({
			url: '../search/search',
			success: function (res) { },
			fail: function (res) { },
			complete: function (res) { },
		})
	},

	onShareAppMessage() {

	}
}))