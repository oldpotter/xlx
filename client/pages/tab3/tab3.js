const config = require('../../config.js')
Page({
	data: {
		list: ['修行平台、公众号', '乱炖', '元吾氏答疑音频']
	},

	onTap(event) {
		const index = event.currentTarget.id
		// console.log(`index:${index}`)
		if (index == 0) {
			const articleId = 'MrYr2u'
			wx.navigateTo({
				url: `../article/article?articleId=${articleId}`,
			})
		} else if (index == 1) {
			const url = config.service.getSubjectUrl
			wx.navigateTo({
				url: `../article-list/article-list?url=${url}&subjectid=${config.subjectid.ld}`,
			})
		} else if (index == 2) {
			const articleId = 'NzqU7b'
			wx.navigateTo({
				url: `../article/article?articleId=${articleId}`,
			})
		}
	},

	onShareAppMessage() {

	}

})