// pages/tab1/yuan.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
		showIntro:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
		_onTap(){
			const showIntro = !this.data.showIntro
			this.setData({showIntro})
		}
  }
})
