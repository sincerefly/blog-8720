module.exports = {
  blog_title: '即或不然',
  blog_description: '不忘初心，方得始终',
  // 修改如下链接时务必注意结尾的'/'
  blog_host: 'http://192.168.0.103:3000/',

  // 首页文章摘要的字符数
  index_abstract_str_len: 150,
  // 每页显示的文章数
  page_article_num: 10,
  // 修改为任意字符串(需要修改)
  cookieSecret: 'jihuoburan',
  // cookie name (需要修改)
  cookName: 'balabala',

  // mongodb数据库配置
  mongo: {
    host: '127.0.0.1',
    database: 'ishell'
  }
};
