const config = require('../../config.js')
Page({
	data: {
		list: ['修行平台、公众号', '乱炖']
	},

	onTap(event) {
		const index = event.currentTarget.id
		if (index == 0) {
			const articleId = 'MrYr2u'
			wx.navigateTo({
				url: `../article/article?articleId=${articleId}`,
			})
		} else {
			const url = config.service.getSubjectUrl
			wx.navigateTo({
				url: `../article-list/article-list?url=${url}&subjectid=${config.subjectid.ld}`,
			})
		}
	},

})