// components/dkitem/dkitem.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
		index:Number,
		//是否选中
		isSelected:Boolean,
		displayctime:String,
		displayduration:Object,
		displayfullctime:String,
		record:String,
		dkid:String,
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
		onClickDkItem(event){
			const index = event.currentTarget.dataset.index
			this.triggerEvent('onclickdkitem',{index},{})
		},
		
		onClickDkDelete(event){
			const id = event.currentTarget.dataset.dkid
			this.triggerEvent('onclickdkdelete', { id }, {})
		},
  }
})
