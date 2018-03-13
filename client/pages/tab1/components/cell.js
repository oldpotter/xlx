
Component({
  /**
   * 组件的属性列表
   */
	properties: {
		color: String,
		title: String,
		items: Array
	},

  /**
   * 组件的初始数据
   */
	data: {
		showItems: false
	},

  /**
   * 组件的方法列表
   */
	methods: {
		_onClickTitle() {
			const showItems = !this.data.showItems
			this.setData({ showItems })
		},

		_onClickItem(event){
			const url = event.currentTarget.dataset.url
			// console.log(url)
			this.triggerEvent('onclickitem',url,{})
		}
	}
})
