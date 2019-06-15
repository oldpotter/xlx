const config = require('../../config.js')
Page({
	data: {
		// list: ['修行平台、公众号', '乱炖', '元吾氏答疑音频','元吾氏集录','元吾氏答疑']
		list: ['相关下载及公众号', '元吾氏集录', '元吾氏答疑']
	},

	onTap(event) {
		// console.log(event.currentTarget.dataset.text)
		const text = event.currentTarget.dataset.text
		// console.log(`index:${index}`)
		if (text == '相关下载及公众号') {
			const articleId = 'MrYr2u'
			wx.navigateTo({//相关平台
				url: `../article/article?articleId=${articleId}`,
			})
		} else if (text == '') {
			const url = config.service.getSubjectUrl
			wx.navigateTo({
				url: `../article-list/article-list?url=${url}&subjectid=${config.subjectid.ld}`,
			})
		} else if (text == '元吾氏答疑音频') {
			const articleId = 'NzqU7b'
			wx.navigateTo({//音频
				url: `../article/article?articleId=${articleId}`,
			})
		} else if (text =='元吾氏集录'){
			wx.navigateTo({
				url: '../tab1/tab1',//集录
				success: function(res) {},
				fail: function(res) {},
				complete: function(res) {},
			})
		} else if (text =='元吾氏答疑'){
			wx.navigateTo({
				url: '../tab2/tab2',//答疑
				success: function(res) {},
				fail: function(res) {},
				complete: function(res) {},
			})
		}
	},

	onShareAppMessage() {

	}

})