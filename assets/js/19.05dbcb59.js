(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{584:function(t,a,s){"use strict";s.r(a);var r=s(7),e=Object(r.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"springboot"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#springboot"}},[t._v("#")]),t._v(" SpringBoot")]),t._v(" "),s("h2",{attrs:{id:"typora快捷键"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#typora快捷键"}},[t._v("#")]),t._v(" Typora快捷键")]),t._v(" "),s("img",{attrs:{src:t.$withBase("/assets/img/image-20210910090850850.png")}}),t._v(" "),s("h2",{attrs:{id:"yaml"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#yaml"}},[t._v("#")]),t._v(" yaml")]),t._v(" "),s("img",{attrs:{src:t.$withBase("/assets/img/image-20210915211327057.png")}}),t._v(" "),s("img",{attrs:{src:t.$withBase("/assets/img/image-20210915211339368.png")}}),t._v(" "),s("p",[t._v("在pojo类中使用了注解@ConfigurationProperties，配置后会有提示，"),s("strong",[t._v("如果不配置会爆红，但并不影响运行！")])]),t._v(" "),s("h3",{attrs:{id:"random"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#random"}},[t._v("#")]),t._v(" ${random}")]),t._v(" "),s("p",[t._v("Spring Boot的属性配置文件中可以通过${random}来产生int值、long值、string字符串或者UUID，来支持属性的随机值。从配置文件中获取符合规则的随机数。")]),t._v(" "),s("img",{attrs:{src:t.$withBase("/assets/img/image-20210915212916108.png")}}),t._v(" "),s("p",[t._v("￥{person.hello:hello}意思是，如果person.hello存在，那么就以存在的person.hello为值，若不存在则使用默认值“hello”，默认值就是冒号后的值。")]),t._v(" "),s("h2",{attrs:{id:"jsr303校验"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#jsr303校验"}},[t._v("#")]),t._v(" JSR303校验")]),t._v(" "),s("p",[t._v("CSDN介绍网址：https://blog.csdn.net/weixin_44440642/article/details/106335653")]),t._v(" "),s("h2",{attrs:{id:"springboot自动装配原理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#springboot自动装配原理"}},[t._v("#")]),t._v(" SpringBoot自动装配原理")]),t._v(" "),s("p",[t._v("SpringBoot启动时，会加载大量的")]),t._v(" "),s("p",[t._v("每一个"),s("strong",[t._v("xxxAutoConfiguration")]),t._v("类都是容器中的一个组件，最后都加入到容器中自动配置")]),t._v(" "),s("p",[t._v("每一个自动配置的类可以进行自动配置功能；")]),t._v(" "),s("p",[t._v("一旦这个配置类生效，这个配置类就会给容器中添加各种组件，这些组建的属性是对从对应的properties类中获取，"),s("strong",[t._v("这些类的属性可以通过yaml配置文件更改")])]),t._v(" "),s("p",[t._v("所有在配置文件中能配置的属性都是在"),s("strong",[t._v("xxxProperties")]),t._v("类中封装了的")]),t._v(" "),s("p",[t._v("精髓：")]),t._v(" "),s("img",{attrs:{src:t.$withBase("/assets/img/image-20210916204730750.png")}}),t._v(" "),s("h2",{attrs:{id:"springboot-web开发"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#springboot-web开发"}},[t._v("#")]),t._v(" SpringBoot Web开发")]),t._v(" "),s("p",[t._v("jar:webapp!")]),t._v(" "),s("p",[t._v("自动装配")]),t._v(" "),s("p",[t._v("1.创建应用，选择模块")]),t._v(" "),s("p",[t._v("SpringBoot帮我们配置了什么？能不能修改？能修改什么？能不能扩展？")]),t._v(" "),s("p",[t._v("xxxAutoConfiguration 向容器中自动配置组件")]),t._v(" "),s("p",[t._v("xxxProperties 自动配置类，装配配置文件中自定义的一些内容")]),t._v(" "),s("h3",{attrs:{id:"能得到静态资源的方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#能得到静态资源的方法"}},[t._v("#")]),t._v(" 能得到静态资源的方法")]),t._v(" "),s("h4",{attrs:{id:"_1-webjars"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-webjars"}},[t._v("#")]),t._v(" 1.webjars")]),t._v(" "),s("img",{attrs:{src:t.$withBase("/assets/img/image-20210916210603945.png")}}),t._v(" "),s("p",[t._v("进入www.webjars.org然后复制需要下载的jar的依赖")]),t._v(" "),s("p",[t._v("使用maven导入依赖")]),t._v(" "),s("p",[t._v("访问： localhost:8080/webjars/")]),t._v(" "),s("h4",{attrs:{id:"_2-public-static-resource"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-public-static-resource"}},[t._v("#")]),t._v(" 2.public,static,/**,resource")]),t._v(" "),s("p",[t._v("访问: localhost:8080/")]),t._v(" "),s("img",{attrs:{src:t.$withBase("/assets/img/image-20210916212017455.png")}}),t._v(" "),s("h3",{attrs:{id:"首页配置注意"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#首页配置注意"}},[t._v("#")]),t._v(" 首页配置注意")]),t._v(" "),s("div",{staticClass:"language-yaml line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-yaml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Spring")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n   "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("mvc")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n     "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("static-path-patter")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" /res/"),s("span",{pre:!0,attrs:{class:"token important"}},[t._v("**")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br")])]),s("p",[t._v("这个yaml代码可以改变静态资源访问前缀，但是会导致SpringBoot的welcome注入失败！！导致无法访问到templates下的index主页")]),t._v(" "),s("h3",{attrs:{id:"favicon-ico配置网页图标"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#favicon-ico配置网页图标"}},[t._v("#")]),t._v(" favicon.ico配置网页图标")]),t._v(" "),s("p",[t._v("1.找到要做成图标的图片")]),t._v(" "),s("p",[t._v("2.找到网站将jpg或png格式转化成favicon.ico（文件名固定），然后放在static的包下，重启后即可显示图标。")])])}),[],!1,null,null,null);a.default=e.exports}}]);