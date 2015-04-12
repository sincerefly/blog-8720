module.exports = {
  blog_title: '即或不然',
  blog_description: '不忘初心，方得始终',
  // 修改如下链接时务必注意结尾的'/'
  blog_host: 'http://192.168.0.103:3000/',

  // 博客后台管理key，此处保存的是md5 32位小写形式的
  // 你可以在http://md5jiami.51240.com对你的密码进行加密，然后填在这里
  // 这个md5的明文是'123456' (务必修改为一个强壮的密码,以避免他人获取登陆明文)
  login_key: 'e10adc3949ba59abbe56e057f20f883e',

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
