# blog-8720

###About
这是一个**还在编写中**的使用Node.js+MongoDB+foundation5的个人博客

---
Demo: [http://test.ishell.me/](http://test.ishell.me/) 

博客使用了：

- Node.js
- Express
- MongoDB
- Foundation5
- Highlight.js

博客支持：
- [x] Markdown
- [x] 代码高亮
- [x] 访问统计
- [ ] 后台管理
- [ ] 更换主题

---

###Balabala...
blog8720采用Node.js编写，所以，顺其自然的使用了Express和MongoDB

Bootstrap看的太多了，所以选择了Foundation5，样式和布局也都是默认的

关于模版，网上很多人都推荐ejs，但是用了jade模版后感觉很棒，使用html2jade页可以很快的把html转成模版，可能更符合适合后端码农？就是不知道以后遇到很多divdivdivdivdivdivdivdivdivdivdiv...会怎样

js的});});});});});});实在恐怖，python程序员表示恐慌，所以选择了CoffeeScript，生成Javascript，所以，修改代码你需要grunt...

最初打算使用AngularJS编写，实现restFUL，但是前端知识有限，只能退而求其次，选择模版，如果有可能将会在以后重构博客

---

###Use
1， 确定你已成功安装node,npm,并启动了mongodb
2， 在博客目录中运行npm install
3， 修改settings.js中的设置，不要害怕，每一项都有说明的呢
5， node bin/www
6， 访问http://localhost:3000

OK，之后你想做什么就做什么吧

---

###ChangeLog

`2015-03-28` 完成基本框架，编写本说明文档
