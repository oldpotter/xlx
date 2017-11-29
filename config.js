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
		
	},
	//https://www.xuelingxiu.com/lingxiusubject.do?subjectId=lingxiuluandun&format=JSON&page=1

	subjectid:{
		//元吾氏最新文章列表(&page=1)
		yuan:'yuanwushi',
		//灵修乱炖列表(&page=1)
		ld:'lingxiuluandun'
	}
}

module.exports = config