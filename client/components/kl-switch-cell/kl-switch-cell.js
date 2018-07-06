// components/kl-switch-cell/kl-switch-cell.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    desc: String,
    checked: Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
		bindChange(event) {
			const {value} = event.detail
			this.triggerEvent('klswitchcell',{value},{})
    },
  }
})