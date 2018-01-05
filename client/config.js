const host = "https://www.xuelingxiu.com"
const config = {
	service: {
		getArticlesUrl: ``,
		getArticleDetailUrl: `${host}/mpageshow.do`,
		//全部答疑分类列表
		getTagsUrl: `${host}/Mlingxiudayifenlei.do`,
		//获取一个分类的文章列表
		getArticlesOfTagUrl: `${host}/lingxiufenlei.do`,
		//搜索文章
		searchUrl: `${host}/lingxiusearch.do`,
		//获取文章
		getArticleUrl: `${host}/lingxiucache.do`,
		getSubjectUrl: `${host}/lingxiusubject.do`,
		//打卡提交
		//https://www.xuelingxiu.com/xiaochengxuLingxiuDakaadd.do?uuid=liyan&type=1&record=打卡感受&ctime=14505050505&duration=100
		saveDKUrl: `${host}/xiaochengxuLingxiuDakaadd.do`,
		//获取打卡
		//https://www.xuelingxiu.com/xiaochengxuLingxiuDakaget.do?uuid=liyan
		getDKsUrl: `${host}/xiaochengxuLingxiuDakaget.do`,
		//登录
		//https://www.xuelingxiu.com/xiaochengxuLingxiuLogin.do?jsCode=013O6gUF1G5c120bKrWF1etfUF1O6gUY
		loginUrl: `${host}/xiaochengxuLingxiuLogin.do`,
		//https://www.xuelingxiu.com/xiaochengxuLingxiuDakadel.do?uuid=5e9a03c8-246b-4a17-bba5-5456dbd71de5&id=13  //小程序删除打卡记录集
		deleteDKUrl: `${host}/xiaochengxuLingxiuDakadel.do`,
	},
	//https://www.xuelingxiu.com/lingxiusubject.do?subjectId=lingxiuluandun&format=JSON&page=1
	subjectid: {
		//元吾氏最新文章列表(&page=1)
		yuan: 'yuanwushi',
		//灵修乱炖列表(&page=1)
		ld: 'lingxiuluandun'
	}
}

module.exports = config