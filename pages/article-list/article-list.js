const List = require('../../views/list/index.js')

Page(Object.assign({}, List, {

	onLoad(options) {
		const url = `${options.url}?subjectid=${options.subjectid}&format=JSON`
		this.setOptions({ url: url })
		this.requestData(url)
	},


}))
