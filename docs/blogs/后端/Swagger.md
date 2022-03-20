---
title: Swagger
date: 2022-03-10
tags:
 - Swagger
categories:
 - 后端
---
# Swagger

## Swagger简介

### 前后端分离

Vue+SpringBoot

后端时代：前端只用管理静态页面；html==>后端。模板引擎JSP=>后端是主力



前后端分离时代：

- 后端：后端控制层、服务层、数据访问层
- 前端：前端控制层、视图层
  - 伪造后端数据，json。已经存在了，不需要后端，工程也能跑起来
- 前后端如何交互？===>API
- 前后端相对独立，松耦合；
- 前后端甚至可以部署在不同的服务器上；



产生一个问题：

- 前后端集成联调，前端人员和后端人员无法做到“及时协商，尽早解决”，导致问题集中爆发；

解决方案：

- 首先制定schema[计划提纲]，实时更新最新API，降低集成风险
- 早些年：指定word计划文档；
- 前后端分离：
  - 前后端测试接口：postman
  - 后端提供接口，需要实时更新最新的消息及改动！



### Swagger优点

- 号称世界上最流行的API框架；
- RestFul API 文档在线自动生成工具=>**API文档与API定义同步更新**
- 直接运行，可以在线测试API接口；
- 支持多种语言：java，php....



Swagger官网：https://editor.swagger.io/

## SpringBoot集成Swagger

1. 新建一个SpringBoot = Web项目（仅添加Web功能即可）
2. 导入相关依赖 **2.x版本使用以下的引用**

```xml
<dependency>
  <groupId>io.springfox</groupId>
  <artifactId>springfox-swagger2</artifactId>
  <version>3.0.0</version>
</dependency>

<dependency>
  <groupId>com.github.onsoul</groupId>
  <artifactId>springfox-swagger-ui</artifactId>
  <version>2.8.2</version>
</dependency>

```

**3.0版本使用以下引用**

```xml
<dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-boot-starter</artifactId>
            <version>3.0.0</version>
</dependency>
```



3.编写一个HelloController测试环境

```java
package com.hao.swagger.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @RequestMapping("/hello")
    public String hello(){
        return "hello";
    }
}

```

启动项目能正常显示

4.启动swagger

编写config包里的SwaggerConfig  

**2.x版本使用此配置**

```java
package com.hao.swagger.config;

import org.springframework.context.annotation.Configuration;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

}

```

3.0版本使用此配置

```java
package com.hao.swagger.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.oas.annotations.EnableOpenApi;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;

@Configuration
@EnableOpenApi //开启swagger3.0
//@EnableSwagger2 开启Swagger2.x
public class SwaggerConfig {
 
}

```



2.x版本启动项目访问：http://localhost:8080/swagger-ui.html，此时遇到了问题1（详见“遇到的问题部分”）

3.0版本启动项目访问：http://localhost:8080/swagger-ui/index.html 仍需在Application.properties文件中添加配置才能正常启动

```xml
spring.mvc.pathmatch.matching-strategy=ant_path_matcher
```

然后访问成功！
<img :src="$withBase('/assets/img/image-20220228113131425.png')">

## 配置Swagger基本信息

```java
package com.hao.swagger.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.oas.annotations.EnableOpenApi;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;

@Configuration
@EnableOpenApi //开启swagger3.0
//@EnableSwagger2 开启Swagger2.x
public class SwaggerConfig {
    //配置Docket的bean实例
    @Bean
    public Docket docket(){
        return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo());
    }

    //配置swagger信息=apiInfo
    private ApiInfo apiInfo(){
        //  作者信息
        Contact contact=new Contact("浩哥哥","https://daily.keylargo.top/","1348114176@qq.com");

        return new ApiInfo("SwaggerDemo",
                "Api Documentation",
                "1.0",
                "https://daily.keylargo.top/",
                contact,
                "Apache 2.0",
                "http://www.apache.org/licenses/LICENSE-2.0", new ArrayList());
    }
}

```

## Swagger配置扫描接口

```java
package com.hao.swagger.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.oas.annotations.EnableOpenApi;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;

@Configuration
@EnableOpenApi //开启swagger3.0
//@EnableSwagger2 开启Swagger2.x
public class SwaggerConfig {
    //配置Docket的bean实例
    @Bean
    public Docket docket(){
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                //RequestHandleSelectors 配置需要扫描接口的方式
                //basePackage 指定扫描的包
                //any() 扫描全部
                //none()不扫描
                //withClassAnnotation 扫描类上的注解
                //withMethodAnnotation 扫描方法上的注解，withMethodAnnotation("RequestMapping.class")扫描所有有RequestMapping注释的类

                .apis(RequestHandlerSelectors.basePackage("com.hao.swagger.controller"))
                // paths() 过滤什么路径
                // .paths(PathSelectors.ant("/hao/**"))
                .build();
    }

    //配置swagger信息=apiInfo
    private ApiInfo apiInfo(){
        //  作者信息
        Contact contact=new Contact("浩哥哥","https://daily.keylargo.top/","1348114176@qq.com");

        return new ApiInfo("SwaggerDemo",
                "Api Documentation",
                "1.0",
                "https://daily.keylargo.top/",
                contact,
                "Apache 2.0",
                "http://www.apache.org/licenses/LICENSE-2.0", new ArrayList());
    }
}

```

我只希望我的Swagger在生产环境中使用，在发布的时候不使用

- 判断是不是生产环境 flag=false
- 注入enable(flag)



配置API文档的分组

```java
.groupName("")
```



















































































































# 遇到的问题：

## 问题1：在设置了SwaggerConfig并启动后访问http://localhost:8080/swagger-ui.html失败！

![image-20220228104346652](E:/Typora图像文件/image-20220228104346652.png)

![image-20220228104418187](E:/Typora图像文件/image-20220228104418187.png)

解决方法：

1.添加jar包

因为swagger2是依赖于Google的guava，我本项目中引入的swagger2是最高版本，因此引入下面的guava.jar包，版本25.1-jre，否侧报错“Failed to start bean 'documentationPluginsBootstrapper"

```xml
<!--        Swagger所需依赖：guava-->
        <dependency>
            <groupId>com.google.guava</groupId>
            <artifactId>guava</artifactId>
            <version>25.1-jre</version>
        </dependency>
```

**还是报错！！！！**

继续查阅方法发现

SpringBoot更新至2.6.0，引发了这个bug。在配置文件里加一条

```properties
spring.mvc.pathmatch.matching-strategy=ant_path_matcher
```

添加后项目启动成功，http://localhost:8080/swagger-ui.html访问成功！但只能显示导航栏无法正常使用！！

**本项目使用的是最新版本的3.0.0，但看的教程是2.x的，3.0和2.x的引用方法和启动方法都不同！**

详细的已经放在配置Swagger处

