Page({
	data:{
		url:null
	},

	onLoad(options){
		// this.props.url = options.url
		this.setData({
			url:options.url,
		})
	}
})