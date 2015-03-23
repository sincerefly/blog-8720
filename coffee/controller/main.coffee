settings = require '../../settings.js'

exports.HomePage= (req, res) ->
  articles = [
    {
      'title': 'Adobe四英雄拯救Mac世界的故事',
      'content': '许多年前，自从OS X女神从先代女神Mac OS 9那里接过了Mac世界的控制权，Mac世界就再次变得安静祥和繁荣昌盛。不过，不久之后，有一群来自远古的Adobe家族的人类，他们自称是叫做Photoshop，Dreameaver，Illustrator和Indesign，来到了OS X大陆，并在大陆北侧最大的贸易都市/Application城市定居。他们与这里其他的居民不同，从来不将自己的资源在OS X教会注册为.app，而是将所有的资源文件全部单独存放，让附近的邻居们颇有言辞。但后来，由于Adobe的这些勇士经常为Mac世界斩妖除魔，解决大陆的各种危机，因此OS X女神和Mac大陆的......'
    },
    {
      'title': '摘自《Unix编程艺术》故事两则',
      'content': '程序猿为什么会重新发明轮子？原因很多，从狭隘的技术原因到程序员心里状态，再到软件生产系统的经济学，方方面面都会导致如此行为，这种特有的顽疾正在肆虐。猪小兵是一个刚走出大学的程序员，拿到了一份正式工作。让我们假设他（或她）已经知道了代码重用的价值并且满怀青春激情地打算大干一把。小兵的第一个项目是碎团队编制一个大型应用。为了实例说明的方便，让我们认为那是一个帮助终端用户能够智能构造查询和浏览庞大数据库的GUI。项目经理已经组合了他们认为合适的工具和组件集，不仅包括开发语言，也包括许多程序库。'
    }
  ]
  data = {
    'blog_title': settings.blog_title,
    'blog_description': settings.blog_description,
    'articles': articles
  }
  return res.render 'index', data
