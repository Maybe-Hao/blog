---
title: Java基础知识
date: 2022-03-10
tags:
 - Java
categories:
 - 后端
---
# Java基础知识

## 查漏补缺
学习自：https://www.bilibili.com/video/BV1Kb411W75N?spm_id_from=333.788.top_right_bar_window_custom_collection.content.click
### JDK，JRE，JVM三者之间关系，以及JDK，JRE包含的主要结构有哪些？

JDK=JRE+Java+Java开发工具（javac.exe,java.exe,javadoc.exe)

JRE=JVM+Java核心类库

### 为什么要path配置环境变量？

希望在任何路径下都可以是使用javac就配置环境变量

### 标识符

Java对类和方法的命名就是标识符

1. 不可以使用数字开头
2. 标识符不能含有空格
3. 严格区分大小写

### 命名规范

包名:多单词组成时所有字母都小写:xxxyyyzzz

类名、接口名:多单词组成时，所有单词的首字母大写:XxxYyyZzz

变量名、方法名:多单词组成时，第一个单词首字母小写，第二个单词开始每个单词首字母大写: xxxYyyzzZ常量名:所有字母都大写。多单词时每个单词用下划线连接: Xxx_YYY_zzz

### 自动类型提升

当容量小的数据类型的变量与容量大的数据类型的变量做运算时，结果自动提升为容量大的数据类型

byte、char、short --> int --> long --> float --> double

byte char short三者进行运算时都会返回int

```java
char a;
byte b;
char c=a+b; //错误
byte c=a+b; //错误
int c=a+b; //正确
```

### Long和float

```java
long l=1123; //默认为int
//long l1=1231231231231231231 //整数过大超过int范围
long l1=12312313123131L; //long型参数必须带上L否则默认当成int
//float f1=12.3; 报错 float参数若不带上f就当成double类型
float f1=(float)12.3;
float f1=12.3f;
```

### 逻辑运算符

> &&和&

相同点1:&与&&的运算结果相同

相同点2:当符号左边是true时，二者都会执行符号右边的运算

不同点:当符号左边是false时，&继续执行符号右边的运算。&&不再执行符号右边的运算。

```java
int num1=10;
int num2=10;
boolean b1=false;
if(b1&(num1++>0))
    System.out.print("我在成都");
System.out.print(num1);//输出结果为11
if(b1&&(num2++>0))
    System.out.print("我在成都");
System.out.print(num2);//输出结果为10
```

> ||和|

相同点1:|与的运算结果相同I

相同点2:当符号左边是false时，二者都会执行符号右边的运算

不同点3:当符号左边是true时，|继续执行符号右边的运算，而||不再执行符号右边的运算

```java
//例子就不再说明了，逻辑和上面基本相同
```

### 位运算

> <<

21<<2：

21的二进制左移两位 相当于21*2^2=84

> 22>>1

在一定范围内，每向右移1位，相当于/2

22>>1=11

> ^异或（交换数据）

m=(m^n)^n

因此可以用来交换变量的值

```java
num1=num1^num2;
num2=num1^num2;
num1=num1^num2;
```

除此之外交换数据还可以

```java
num1=num1+num2;
num2=num1-num2;//把num1的值给了num2
num1=num1-num2;//num2已经等于num1了，减num2就相当于减了num1的值把num2的值给了num1
```

但这样相加的时候可能超出存储范围，所以不如用位运算。

### switch

switch(int n )可以

switch(String n)也可以

**switch(boolean n) 不可以！**

但switch不能限定范围！！

e\g
<img :src="$withBase('/assets/img/image-20220308113224961.png')">

### break label

```java
label:for(int i=1;i<=4;i++){
    for(int j=1;j<=10;j++){
        if(j%4==0){
            //break label;
            continue label;//123123123123
        }
        System.out.print(j);
    }
}
//break label当想结束指定标识符的一层循环结构
//continue label 结束指定表示的一层循环结构档次循环
```

### JVM规范

虚拟机栈，即栈结构，**存放局部变量**

**堆，我们new出来的结构（数组、对象）存在堆中，栈中存的是堆里的地址**

补充：对象的属性（非static），加载在堆空间

方法区：类的加载信息、常量池、静态域

### 属性（成员变量）和局部变量

> 相同点

1. 定义变量的格式，数据类型 变量名=变量值
2. 先声明再使用
3. 变量都有其对应的作用域

> 不同点

1. 在类中声明的位置不同

   属性：直接定义在类的一堆{}内

   局部变量：声明在方法内、方法形参、代码块、构造器形参、构造器内部的变量

2. 关于权限的修饰符不同

   属性：可以在声明属性时指明其权限、使用权限修饰符

   局部变量：不可使用权限修饰符。

3. 内存中存加载的地方不同

   属性：加载到堆空间中（非static）

   局部变量：加载到栈空间

4. 默认值不同

   属性：

   byte,short,int,long: 0

   float,double:0.0

   char:0

   boolean:false

   局部变量：没有默认初始值，必须设置初始值



### 匿名对象

我们创建对象，没有显示的赋给一个变量名。即匿名对象

匿名对象只能调一次

```java
new Phone().price =1999;
new Phone().showPrice();//0.0
```

### 值传递

如果参数是基本数据类型，此时实参赋给形参的是实参真实存储的数据值。

如果参数是引用数据类型，此时实参赋给形参的是实参存储数据的地址值。

### 封装

程序设计追求“高内聚，低耦合”

> 高内聚

类的内部数据操作细节自己完成，不允许外部干涉

> 低耦合

仅对外暴露少量的方法用于使用

> 封装的核心思想：把该隐藏的隐藏起来，该暴露的暴露出来。这就是封装性的设计思想

> 封装性的体现：

1. 将属性私有化，同时提供公共的方法获取和设置属性。
2. 不对外暴露的私有的方法
3. 单例模式

#### 权限修饰符

> 封装性的体现需要修饰符来配合

1. private
2. defaulte 缺省
3. protect
4. public
<img :src="$withBase('/assets/img/image-20220311004018128.png')">

**4种权限可以用来修饰类以及类的内部结构：属性、方法、构造器、内部类**

### 继承

#### 继承性的好处

1. 减少了代码的冗余
2. 提高了代码的复用性便于功能的扩展
3. 为之后多态性的使用,提供了前提



#### 重写

方法的声明 ：

权限修饰符 返回值类型 方法名（形参列表）{

​	方法体

}

##### **重写的规定**：

1. 子类中叫重写的方法，父类中叫被重写的方法
2. 子类重写的方法的方法名和参数列表与父类被重写的方法的方法名和形参列表相同
3. 子类重写的方法权限修饰符应该比父类的大
   1. 权限修饰符：public- > default -> protect -> priviate
   2. **子类不能重写父类的private方法！**
4. 返回值类型
   1. 父类被重写的方法返回类型是void，子类只能是void
   2. 父类被重写的方法的返回值类型是基本数据类型，则子类重写的方法的返回值类型必须是相同的基本数据类型
   3. 父类被重写方法是A类型，则子类重写方法返回值可以是A类型或A类型的子类型
5. 子类重写的方法跑出的异常类型不大于父类被重写的方法抛出的异常类型。



#### super

super调用构造器

若student继承于person

在student的构造器中

第一行必须得是super(),但通常我们不会写super(),如果不写的话将会默认调用父类的空参构造器

若父类没有空参构造器，子类构造器可能会报错

#### 获取父类对象

```java
子对象.getClass().getSuperclass()
```





### 多态

> 对象的多态性

父类的引用指向子类的对象

```java
Person p=new Man();
//(父类引用)   （子类对象）
```

Java引用变量有两个类型:**编译时类型**和**运行时类型**。编译时类型由声明该变量时使用的类型决定，运行时类型由实际赋给该变量的对象决定。简称:编译时，看左边;运行时，看右边。

<img :src="$withBase('/assets/img/image-20220311170705987.png')">

> 多态的使用:虚拟方法调用

有了对象的多态性以后，我们在编译期，只能调用父类中声明的方法，但在运行期，我们实际执行的是子类重写父类的方法。总结:编译，看左边;运行，看右边。

**对象的多态性只适用于方法不适用于属性！**

```java
Person p=new Man();
//Person.id=1 Man.id=2
//Person.Love(){System.out.print("吃的")}
//Man.Love(){System.out.print("喝的")}
System.out.print(id);//1
p.Love()//输出为 "喝的"
```



> 多态性的使用前提:类的继承关系和方法的重写



### *重载和重写

> 从编译和运行角度看

重载，是指允许存在多个同名方法，而这些方法的参数不同。编译器根据方法不同的参数表，对同名方法的名称做修饰。对于编译器而言，这些同名方法就成了不同的方法。**它们的调用地址在编译期就绑定了**。Java的重载是可以包括父类和子类的，即子类可以重载父类的同名不同参数的方法。

所以:对于重载而言，在方法调用之前，编译器就已经确定了所要调用的方法，这称为**“早绑定”**或**“静态绑定”**;

而对于多态，只有等到方法调用的那一刻，解释运行器才会确定所要调用的具体方法，这称为**“晚绑定”**或**“动态绑定”**。

引用一句Bruce Eckel的话:“**不要犯傻，如果它不是晚绑定，它就不是多态。**”



### final、finally、finalize

final： final关键字可以用来修饰引用、方法和类

1.  如果引用为基本数据类型，则该引用为常量，该值无法修改；
2.  如果引用为引用数据类型，比如对象、数组，则该对象、数组本身可以修改，但指向该对象或数组的地址的引用不能修改。
3.  如果引用时类的成员变量，则必须当场赋值，否则编译会报错。

fianlly：异常

try{

}catch{

}finally{

}

无论是否发生异常都会执行finally,在catch和try中使用return也会执行finally，finally返回的值会顶替catch、try中的返回，若想不执行可以使用System.exit(0);或者关机。

finalize：垃圾回收器



### 基本类型对象（面试题）

<img :src="$withBase('/assets/img/image-20220312102015204.png')">

第一个为false 是因为两个对象的地址值不同

第二个为true 是因为他们两个是自动装箱没有用new，是因为int 范围为 -128-127,我们用的是1，就从范围里直接找到1的地址，两个都是1的地址所以相同的

第三个为false，是因为int 范围为 -128-127，128超过了127，就只能new一个，就会导致两个地址值不同

> 总结

Integer内部定义了IntegerCache结构，工ntegerCache中定义了Integer[],保存了从-128~127范围的整数。

如果我们使用自动装箱的方式，给Integer赋值的范围在-128~127范围内时，可以直接使用数组中的元素，不用再去new了。

### Static

当我们编写一个类时，其实就是在描述其对象的属性和行为，而并没有产生实质上的对象，只有通过new关键字才会产生出对象，这时系统才会分配内存空间给对象，其方法才可以供外部调用。我们有时候希望无论是否产生了对象或无论产生了多少'对象的情况下，**某些特定的数据在内存空间里只有一份**，例如所有的中国人都有个国家名称，每一个中国人都共享这个国家名称，不必在每一个中国人的实例对象中都单独分配一个用于代表国家名称的变量。



#### 使用static修饰属性:静态变量(或类变量)

属性，按是否使用static修饰，又分为:静态属性Ms非静态属性(实例变量)

实例变量:我们创建了类的多个对象，每个对象都独立的拥有一套类中的非静态属性。当修改其中一个对象中的

非静态属性时,不会导致其他对象中同样的属性值的修改。

静态变量:我们创建了类的多个对象，多个对象共享同一个静态变量。当通过某一个对象修改静态变量时，会导致其他对象调用此静态变量时，是修改过了的。

static修饰属性的其他说明:

1. 静态变量随着类的加载而加载。
2. 可以通过"类.静态变量"的方式进行调用静态变量的加载要早于对象的创建。
3. 由于类只会加载—次，则静态变量在内存中也只会存在一份

static 放在方法区中->静态域

<img :src="$withBase('/assets/img/image-20220312104820521.png')">

**静态方法**

**静态方法只能调用静态方法或属性**

非静态方法中能调用非静态方法和静态方法



> static注意点:

**在静态的方法内,不能使用this关键字、super关键字**

关于静态属性和静态方法的使用，大家都从生命周期的角度去理解。



#### 如何确定一个属性是否为static的？

属性可以被多个对象共享，不会随着对象的不同而不同

#### 如何确定一个方法是否为static的？

操作静态属性的方法通常为static的

工具类中的方法习惯上声明为static的（没有必要造对象了（Math））



### 设计模式

#### 饿汉模式

一个对象只能有一个实例

<img :src="$withBase('/assets/img/image-20220312112202770.png')">

这样main函数中不管生成多少个Bank引用对象指的都是一个Bank对象

#### 懒汉模式



<img :src="$withBase('/assets/img/image-20220317100008877.png')">



<img :src="$withBase('/assets/img/image-20220317100024424.png')">

输出为true

如何区分懒汉式和饿汉式：

什么时候用什么时候创建是懒汉式，一开始就创建好事饿汉式

#### 两者的好处和坏处

饿汉式：

- 坏处：对象加载时间过长
- 好处：饿汉式是线程安全的

懒汉式：

- 好处：延迟对象的创建
- 坏处：不是线程安全的

### 代码块

就是一个中括号

代码块只能用static修饰，因此分为静态代码块和非静态代码块

<img :src="$withBase('/assets/img/image-20220317102333357.png')">
测试：将代码块放在Person类中，当加载类的时候就会执行代码块

代码块不能主动调用，自动执行。

<img :src="$withBase('/assets/img/image-20220317102757524.png')">



<img :src="$withBase('/assets/img/image-20220317102811630.png')">
**无关代码顺序，静态代码块要比非静态代码块先执行**

<img :src="$withBase('/assets/img/image-20220317103055313.png')">

<img :src="$withBase('/assets/img/image-20220317103127520.png')">


### 属性复制的先后顺序

对属性可以赋值的位置:

1. 默认初始化
2. 显式初始化
3. 在代码块中赋值
4. 构造器中初始化
5. 有了对象以后，可以通过"对象.属性"或"对象.方法"的方式，进行赋值

**先后顺序：**

**1 - 2 / 5 - 3 - 4** 





### final

1.  如果引用为基本数据类型，则该引用为常量，该值无法修改；
2.  如果引用为引用数据类型，比如对象、数组，则该对象、数组本身可以修改，但指向该对象或数组的地址的引用不能修改。
3.  如果引用时类的成员变量，则必须当场赋值，否则编译会报错
4.  修饰类：该类无法被继承
5.  修饰方法：该方法无法被重写
6.  修饰基本数据类型：无法被更改值。



### 抽象类与方法

随着继承层次中一个个新子类的定义，类变得越来越具体，而父类则更一般，更通用。类的设计应该保证父类和子类能够共享特征。有时将一个父类设计得非常抽象，以至于它没有具体的实例，这样的类叫做**抽象类**。



abstract可以修饰：类、方法

abstract不可以修饰：属性、构造器等结构

**abstract不可以修饰私有方法、静态方法、final方法、final的类**

abstract修饰的类就无法实例化了

```java
abstract class person{
    String name;
    int age;
}
public static void main(String args[]){
    person p=new person();//会报错！
}
```



包涵抽象方法的类，一定是个抽象类

继承抽象类的类，必须要重写被继承的方法里的**所有抽象**方法，否则就要把这个类也设置为抽象类



### 接口

一方面，有时必须从几个类中派生出一个子类，继承它们所有的属性和方法。但是，Java不支持多重继承。有了接口，就可以得到**多重继承**的效果。

另一方面，有时必须从几个类中抽取出一些共同的行为特征，而它们之间又没有is-a的关系，仅仅是具有相同的行为特征而已。例如:鼠标、键盘、打印机、扫播仪、摄像头、充电器、MP3机、手机、数码相机、移动硬盘等都支持USB连接。

接口就是规范，定义的是一组规则，体现了现实世界中“如果你是/要...则必须能...”的思想。**继承是一个"是不是"的关系，而接口实现则是"能不能"的关系。**

**接口的本质是契约，标准，规范**，就像我们的法律一样。制定好后大家都要遵守。



**接口和类是并列的两个结构**

**如何定义接口:定义接口中的成员**

​	 1.**JDK7**及以前:只能定义全局常量和抽象方法

​	>全局常量:public static final的.但是书写时，可以省略不写

​	>抽象方法:public abstract的

​	2.JDK8:除了定义全局常量和抽象方法之外，还可以定义静态方法、默认方法（略)

​	3.接口中不能定义构造器的!意味着接口不可以实例化

​	4.Java开发中，接口通过让类去实现(implements)的方式来使用．如果实现类覆盖了接口中的所有抽象方法，则此实现类就可以实例化如果实现类没有覆盖接中所有的抽象方法，则此实现类仍为一个抽象类

Java类可以实现多个接口 --->弥补了Java单继承性的局限性

格式:class AA extends BB implements cC,DD ,EE

接口与接口之间可以继承,而且可以多继承

CompareA是接口

s是实现类的对象

**JDK8：**

出了定义全局常量和抽象方法外，还可以定义静态方法，默认方法

<img :src="$withBase('/assets/img/image-20220317160704600.png')">



### 异常

1、异常体系结构

<img :src="$withBase('/assets/img/image-20220317162624879.png')">



### *多线程

创建多线程的方法有**4种**

#### 程序、线程和进程

#### 程序

程序是为了完成特定任务、用某种语言编写的一组指令的集合。即指一段静态的代码，静态对象。

#### 什么是进程？

**进程是程序的⼀次执行过程，是系统运行程序的基本单位，因此进程是动态的。系统运行一个程序即是⼀个进程从创建，运行到消亡的过程。**

在Java中，当我们启动main 函数时其实就是启动了一个JVM的进程，而main函数所在的线程就是这个进程中的一个线程，也称主线程。

如下图所示，在 windows中通过查看任务管理器的方式，我们就可以清楚看到window当前运行的进程(.exe文件的运行)。

<img :src="$withBase('/assets/img/image-20220307192922263.png')">

**程序是静态的，进程是动态的。**

进程作为资源分配的单位，系统在运行时会为每个进程分配不同的内存区域。

#### 什么是线程？

线程与进程相似，但线程是一个比进程更小的执行单位。一个进程在其执行的过程中可以产生多个线程。与进程不同的是同类的多个线程共享进程的堆和方法区资源，但每个线程有自己的程序计数器、虚拟机栈和本地方法栈，所以系统在产生一个线程，或是在各个线程之间作切换工作时，负担要比进程小得多，也正因为如此，线程也被称为轻量级进程。

一个Java程序的运行是main线程和多个其他线程同时运行。

#### 描述线程和进程的关系、区别、优缺点

<img :src="$withBase('/assets/img/image-20220307193916858.png')">

从上图可以看出:一个进程中可以有多个线程，**多个线程共享进程的堆和方法区** (JDK1.8之后的元空间)**资源**，但是**每个线程有自己的程序计数器、虚拟机栈和本地方法栈**。

**总结**︰**线程是进程划分成的更小的运行单位。线程和进程最大的不同在于基本上各进程是独立的，而各线程则不一定，因为同一进程中的线程极有可能会相互影响。线程执行开销小，但不利于资源的管理和保护;而进程正相反**



#### 并行和并发

**并发（Concurrent），在操作系统中，是指一个时间段中有几个程序都处于已启动运行到运行完毕之间，且这几个程序都是在同一个处理机上运行。**

**并行（Parallel），当系统有一个以上CPU时，当一个CPU执行一个进程时，另一个CPU可以执行另一个进程，两个进程互不抢占CPU资源，可以同时进行，这种方式我们称之为并行(Parallel)。**

**其实决定并行的因素不是CPU的数量，而是CPU的核心数量，比如一个CPU多个核也可以并行。**

知乎举例：

<img :src="$withBase('/assets/img/image-20220318162134845.png')">



#### 多线程优点

1. 提高应用程序的响应。对图形化界面更具有意义，增强用户体验
2. 提高计算系统CPU的利用率
3. 改善程序结构。将既长又复杂的进程分为多个线程，独立运行，有利于修改



什么时候要用到多线程

- 程序需要同时执行两个或多个任务

- 程序需要实现一些需要等待的任务时，如用户搜索、网络操作等
- 需要一些后台运行的程序时



#### 多线程的创建**Thread**

多线程的创建

##### **方式一:继承于Thread类**

​	1.创建一个继承于Thread类的子类

​	2.重写Thread类的run()

​	3.创建Thread类的子类的对象4.通过此对象调用start()

例子:遍历100以内的所有的偶数

```java
//创建一个继承于Thread类的子类
public class ThreadTest extends Thread{
    //重写run方法
    @Override
    public void run() {
        for(int i=0;i<100;i++){
            if(i%2==0) System.out.println(i);
        }
    }
}
class MythreadTest{
    public static void main(String[] args) {
        //创建Thread类的子类的对象
        ThreadTest mythreadTest = new ThreadTest();
        //调用start()方法
        mythreadTest.start();
		//我们不能直接调用run方法，调用run方法是main在执行，并没有创建新的进程
        //mythreadTest.run();
        
        //再次执行start方法会怎么样？
        //会报错！会抛出异常，不能让一个已经start的线程再次start
        //mythreadTest.start();
        for (int i = 0; i <100 ; i++) {
            if(i%2==0){
                System.out.println("********************Main***************************");
            }

        }
    }
}
```





```java
结果为：
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
0
2
4
6
8
10
12
14
16
18
20
22
24
26
28
30
32
34
36
38
40
42
44
46
48
50
52
54
56
58
60
62
64
66
68
70
72
74
76
78
80
82
84
86
88
90
92
94
96
98
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************
********************Main***************************

```

练习2：创建两个分线程，其中一个线程遍历100内偶数，另一个遍历奇数

```java
public class test02 {
    public static void main(String[] args) {
        myThread1 my1=new myThread1();
        myThread2 my2=new myThread2();
        my1.start();
        my2.start();
    }
}

class myThread1 extends Thread{
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            if(i%2==0) System.out.println("Thread.name="+Thread.currentThread().getName()+",我是偶数"+i);
        }
    }
}
class myThread2 extends Thread{
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            if(i%2!=0) System.out.println("Thread.name="+Thread.currentThread().getName()+",我是奇数"+i);
        }
    }
}


===================================================================================
结果：
Thread.name=Thread-1,我是奇数1
Thread.name=Thread-0,我是偶数0
Thread.name=Thread-1,我是奇数3
Thread.name=Thread-1,我是奇数5
Thread.name=Thread-0,我是偶数2
Thread.name=Thread-1,我是奇数7
Thread.name=Thread-1,我是奇数9
Thread.name=Thread-1,我是奇数11
Thread.name=Thread-1,我是奇数13
Thread.name=Thread-0,我是偶数4
Thread.name=Thread-0,我是偶数6
Thread.name=Thread-0,我是偶数8
Thread.name=Thread-0,我是偶数10
Thread.name=Thread-0,我是偶数12
Thread.name=Thread-1,我是奇数15
Thread.name=Thread-0,我是偶数14
。。。。。。
    
=======================================================================
通过创建匿名对象可以实现
public class test02 {
    public static void main(String[] args) {
        new Thread(){
            @Override
            public void run() {
                for (int i = 0; i < 100; i++) {
                    if(i%2==0) System.out.println("Thread.name="+Thread.currentThread().getName()+",我是偶数"+i);
                }
            }
        }.start();
        new Thread(){
            @Override
            public void run() {
                for (int i = 0; i < 100; i++) {
                    if(i%2!=0) System.out.println("Thread.name="+Thread.currentThread().getName()+",我是奇数"+i);
                }
            }
        }.start();
    }
}    
```

方法二：创建Thread类的子类的匿名对象

#### Thread常用接口

1. start():启动当前线程;调用当前线程的run()

2. run():通常需要重写Thread类中的此方法，将创建的线程要执行的操作声明在此方法中
3. currentThread():静态方法，返回执行当前代码的线程

4. getName():获取当前线程的名字

5. setName():设置当前线程的名字
6. yield():释放当前cpu的执行权
7. join():在线程a中调用线程b的join(),此时线程a就进入阻塞状态，直到线程b完全执行完以后，线程a才结束阻塞状态。
8. stop():已废除！当执行此方法时强行结束线程
9. sleep(long time):当执行此方法时会休息线程（阻塞），时间为time。

test：

<img :src="$withBase('/assets/img/image-20220318171802044.png')">

Thread.currenThread():指当前进程，这里是在main里所以是主线程。

join()方法:

<img :src="$withBase('/assets/img/image-20220318172422019.png')">





#### Java的调度方法

调度策略：时间片轮转调度

<img :src="$withBase('/assets/img/image-20220319004326358.png')">

Java的调度方法

- 通优先级线程组成先进先出队列
- 对高优先级，使用优先调度的抢占式策略。



线程的优先级等级：

- MAX_PRIORITY:10
- MIN_PRIORITY:1
- NORM_PRIORITY:5

涉及的方法：

- getPriority():返回线程优先值
- setPriority():改变线程的优先级

注意：

- 线程创建时继承父线程的优先级
- 低优先级只是获得调度的概率低，并非一定是要在高优先级线程后才被调用。



#499c54





































































## ArrayList和LinkedList

时间复杂度比较

<img :src="$withBase('/assets/img/image-20220307104401420.png')">



ArrayList扩容机制

————————————————
版权声明：本文为CSDN博主「烟雨星空」的原创文章，遵循CC 4.0 BY-SA版权协议.
原文链接：https://blog.csdn.net/qq_26542493/article/details/88873168

### ArrayList原理

一.ArrayList继承了AbstractList，实现了List接口，底层实现基于数组，因此可以认为是一个可变长度的数组。
二.在讲扩容机制之前，我们需要了解一下ArrayList中最主要的几个变量：

```java
//定义一个空数组以供使用
private static final Object[] EMPTY_ELEMENTDATA = {};
//也是一个空数组，跟上边的空数组不同之处在于，这个是在默认构造器时返回的，扩容时需要用到这个作判断，后面会讲到
private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};
//存放数组中的元素，注意此变量是transient修饰的，不参与序列化
transient Object[] elementData;
//数组的长度，此参数是数组中实际的参数，区别于elementData.length，后边会说到
private int size;
```

三.ArrayList有三个构造函数，不同的构造函数会影响后边的扩容机制判断
1.默认的无参构造

```java
public ArrayList() {
	this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
}
```

可以看到，调用此构造函数，返回了一个空的数组DEFAULTCAPACITY_EMPTY_ELEMENTDATA，此数组长度为0.
2.给定初始容量的构造函数

```java
public ArrayList(int initialCapacity) {
    if (initialCapacity > 0) {
        this.elementData = new Object[initialCapacity];
    } else if (initialCapacity == 0) {
        this.elementData = EMPTY_ELEMENTDATA;
    } else {
        throw new IllegalArgumentException("Illegal Capacity: "+
                                           initialCapacity);
    }
}
```

逻辑很简单，就是构造一个具有指定长度的空数组，当initialCapacity为0时，返回EMPTY_ELEMENTDATA

3.包含特定集合元素的构造函数

```java
public ArrayList(Collection<? extends E> c) {
    elementData = c.toArray();
    if ((size = elementData.length) != 0) {
        // c.toArray might (incorrectly) not return Object[] (see 6260652)
        if (elementData.getClass() != Object[].class)
            elementData = Arrays.copyOf(elementData, size, Object[].class);
    } else {
        // replace with empty array.
        this.elementData = EMPTY_ELEMENTDATA;
    }
}

```

### ArrayList扩容机制

```java
public boolean add(E e) {
    ensureCapacityInternal(size + 1);  // Increments modCount!!
    elementData[size++] = e;
    return true;
}
public void add(int index, E element) {
    rangeCheckForAdd(index);

   ensureCapacityInternal(size + 1);  // Increments modCount!!
    System.arraycopy(elementData, index, elementData, index + 1,size - index);
    elementData[index] = element;
    size++;
}
```

可以看到两个方法都调用了ensureCapacityInternal(size + 1)方法，把数组长度加1以确保能存下下一个数据

```java
private void ensureCapacityInternal(int minCapacity) {
    ensureExplicitCapacity(calculateCapacity(elementData, minCapacity));
}
```

此方法会先调用calculateCapacity方法，此时minCapacity为1，即size+1，因为初始时size为0

```java
private static int calculateCapacity(Object[] elementData, int minCapacity) {
    if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
        return Math.max(DEFAULT_CAPACITY, minCapacity);
    }
    return minCapacity;
}
```

**重点来了**

此方法会判断当前数组是否为DEFAULTCAPACITY_EMPTY_ELEMENTDATA，之前就强调了无参构造时才会返回这个数组。所以，若创建ArrayList时调用的是无参构造，此方法会返回DEFAULT_CAPACITY（值为10）和minCapacity的最大值，因此，最终会返回固定值10；若创建ArrayList时调用了有参构造，则此方法会返回1，注意这个
minCapacity变量只是第一次调用add方法时值为1，此后的调用需要根据实际的数组长度size+1。
然后调用ensureExplicitCapacity方法



## Map接口：

**HashMap** : JDK1.8之前 HashMap由数组+链表组成的，数组是 HashMap的主体，链表则是主要为了解决哈希冲突而存在的(“拉链法"解决冲突)。JDK1.8以后在解决哈希冲突时有了较大的变化，当链表长度大于阈值(默认为8)(将链表转换成红黑树前会判断，如果当前数组的长度小于64，那么会选择先进行数组扩容，而不是转换为红黑树)时，将链表转化为红黑树，以减少搜索时间。

**LinkedHashMap**: LinkedHashMap继承自HashMap ，所以它的底层仍然是基于拉链式散列结构即由数组和链表或红黑树组成。另外，LinkedHashMap在上面结构的基础上，增加了一条双向链表，使得上面的结构可以保持键值对的插入顺序。同时通过对链表进行相应的操作，实现了访问顺序相关逻辑。详细可以查看:《LinkedHashMap源码详细分析

**Hashtable** ： 数组+链表组成的，数组是 HashMap 的主体，链表则是主要为了解决哈希冲 突⽽存在的

**TreeMap** ： 红⿊树（⾃平衡的排序⼆叉树）

### 如何选用接口

主要根据集合的特点来选用，比如我们需要根据键值获取到元素值时就选用Map接口下的集合，需要排序时选择 TreeMap ,不需要排序时就选择HashMap ,需要保证线程安全就选用ConcurrentHashMap 。

当我们只需要存放元素值时，就选择实现Collection接口的集合，需要保证元素唯一时选择实现Set接口的集合比如 TreeSet 或 HashSet ，不需要就选择实现List 接口的比如ArrayList 或LinkedList ，然后再根据实现这些接口的集合的特点来选用。



### HashMap和Hashtable的区别

内容摘自：JavaGuide-v4.0

1. 线程是否安全： HashMap 是⾮线程安全的， HashTable 是线程安全的,因为 HashTable 内 部的⽅法基本都经过 synchronized 修饰。（如果你要保证线程安全的话就使⽤ ConcurrentHashMap 吧！）；
2. 效率： 因为线程安全的问题， HashMap 要⽐ HashTable 效率⾼⼀点。另外， HashTable 基本被淘汰，不要在代码中使⽤它； 
3. 对 Null key 和 Null value 的⽀持： HashMap 可以存储 null 的 key 和 value，但 null 作为 键只能有⼀个，null 作为值可以有多个；HashTable 不允许有 null 键和 null 值，否则会抛出 NullPointerException 。 
4. 初始容量⼤⼩和每次扩充容量⼤⼩的不同 ： ① 创建时如果不指定容量初始值， Hashtable 默认的初始⼤⼩为 11，之后每次扩充，容量变为原来的 2n+1。 **HashMap 默认的初始化大小为 16**。**之后每次扩充，容量变为原来的 2 倍**。② 创建时如果给定了容量初始值，那么 Hashtable 会直接使⽤你给定的⼤⼩，⽽ HashMap 会将其扩充为 2 的幂次⽅⼤⼩ （ HashMap 中的 tableSizeFor() ⽅法保证，下⾯给出了源代码）。也就是说 HashMap 总 是使⽤ 2 的幂作为哈希表的⼤⼩,后⾯会介绍到为什么是 2 的幂次⽅。 
5. 底层数据结构： JDK1.8 以后的 HashMap 在解决哈希冲突时有了较大的变化，当链表⻓度 大于阈值（默认为 8）（将链表转换成红⿊树前会判断，如果当前数组的⻓度⼩于 64，那么 会选择先进⾏数组扩容，⽽不是转换为红⿊树）时，将链表转化为红⿊树，以减少搜索时 间。Hashtable 没有这样的机制。

### HashMap原理

**哈希表的主干就是数组**

**比如我们要新增或查找某个元素，我们通过把当前元素的关键字 通过某个函数映射到数组中的某个位置，通过数组下标一次定位就可完成操作。**

![哈希表数据插入过程](https://img-blog.csdnimg.cn/2018110221063296.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvc2hpbWF4aWFvMQ==,size_16,color_FFFFFF,t_70)

**哈希冲突**

然而万事无完美，**如果两个不同的元素，通过哈希函数得出的实际存储地址相同怎么办**？也就是说，当我们对某个元素进行哈希运算，得到一个存储地址，然后要进行插入的时候，发现已经被其他元素占用了，其实这就是所谓的**哈希冲突**，也叫**哈希碰撞**。前面我们提到过，哈希函数的设计至关重要，好的哈希函数会尽可能地保证 计算简单和散列地址分布均匀,但是，我们需要清楚的是，数组是一块连续的固定长度的内存空间，再好的哈希函数也不能保证得到的存储地址绝对不发生冲突。那么哈希冲突如何解决呢？哈希冲突的解决方案有多种:开放定址法（发生冲突，继续寻找下一块未被占用的存储地址），再散列函数法，链地址法，而HashMap即是采用了**链地址法**，也就是**数组+链表**的方式。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181102221702492.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvc2hpbWF4aWFvMQ==,size_16,color_FFFFFF,t_70)

简单来说，**HashMap由数组+链表组成的**，数组是HashMap的主体，链表则是主要为了解决哈希冲突而存在的，如果定位到的数组位置不含链表（当前entry的next指向null）,那么查找，添加等操作很快，仅需一次寻址即可；如果定位到的数组包含链表，对于添加操作，其时间复杂度为O(n)，首先遍历链表，存在即覆盖，否则新增；对于查找操作来讲，仍需遍历链表，然后通过key对象的equals方法逐一比对查找。所以，性能考虑，**HashMap中的链表出现越少，性能才会越好。**

重要属性：

```java
/**实际存储的key-value键值对的个数*/
transient int size;

/**阈值，当table == {}时，该值为初始容量（初始容量默认为16）；当table被填充了，也就是为table分配内存空间后，
threshold一般为 capacity*loadFactory。HashMap在进行扩容时需要参考threshold，后面会详细谈到*/
int threshold;

/**负载因子，代表了table的填充度有多少，默认是0.75
加载因子存在的原因，还是因为减缓哈希冲突，如果初始桶为16，等到满16个元素才扩容，某些桶里可能就有不止一个元素了。
所以加载因子默认为0.75，也就是说大小为16的HashMap，到了第13个元素，就会扩容成32。
*/
final float loadFactor;

/**HashMap被改变的次数，由于HashMap非线程安全，在对HashMap进行迭代时，
如果期间其他线程的参与导致HashMap的结构发生变化了（比如put，remove等操作），
需要抛出异常ConcurrentModificationException*/
transient int modCount;
```

HashMap有4个构造器，其他构造器如果用户没有传入initialCapacity 和loadFactor这两个参数，会使用默认值

initialCapacity默认为16，loadFactory默认为0.75

```java
public HashMap(int initialCapacity, float loadFactor) {
　　　　　//此处对传入的初始容量进行校验，最大不能超过MAXIMUM_CAPACITY = 1<<30(230)
        if (initialCapacity < 0)
            throw new IllegalArgumentException("Illegal initial capacity: " +
                                               initialCapacity);
        if (initialCapacity > MAXIMUM_CAPACITY)
            initialCapacity = MAXIMUM_CAPACITY;
        if (loadFactor <= 0 || Float.isNaN(loadFactor))
            throw new IllegalArgumentException("Illegal load factor: " +
                                               loadFactor);

        this.loadFactor = loadFactor;
        threshold = initialCapacity;
　　　　　
        init();//init方法在HashMap中没有实际实现，不过在其子类如 linkedHashMap中就会有对应实现
    }
```

从上面这段代码我们可以看出，在常规构造器中，没有为数组table分配内存空间（有一个入参为指定Map的构造器例外），**而是在执行put操作的时候才真正构建table数组**

OK,接下来我们来看看put操作的实现

```java
public V put(K key, V value) {
        //如果table数组为空数组{}，进行数组填充（为table分配实际内存空间），入参为threshold，
        //此时threshold为initialCapacity 默认是1<<4(24=16)
        if (table == EMPTY_TABLE) {
            inflateTable(threshold);
        }
       //如果key为null，存储位置为table[0]或table[0]的冲突链上
        if (key == null)
            return putForNullKey(value);
        int hash = hash(key);//对key的hashcode进一步计算，确保散列均匀
        int i = indexFor(hash, table.length);//获取在table中的实际位置
        for (Entry<K,V> e = table[i]; e != null; e = e.next) {
        //如果该对应数据已存在，执行覆盖操作。用新value替换旧value，并返回旧value
            Object k;
            if (e.hash == hash && ((k = e.key) == key || key.equals(k))) {
                V oldValue = e.value;
                e.value = value;
                e.recordAccess(this);
                return oldValue;
            }
        }
        modCount++;//保证并发访问时，若HashMap内部结构发生变化，快速响应失败
        addEntry(hash, key, value, i);//新增一个entry
        return null;
    }
```

此处未完，深入了解请访问本文引用的文章：https://blog.csdn.net/qq_26542493/article/details/88873168

### HashMap问题

#### HashMap 的长度为什么是2的幂次方？

为了能让HashMap存取高效，尽量较少碰撞，也就是要尽量把数据分配均匀。我们上面也讲到了过了，Hash值的范围值-2147483648到2147483647，前后加起来大概40亿的映射空间，只要哈希函数映射得比较均匀松散，一般应用是很难出现碰撞的。但问题是一个40亿长度的数组，内存是放不下的。所以这个散列值是不能直接拿来用的。用之前还要先做对数组的长度取模运算，得到的余数才能用来要存放的位置也就是对应的数组下标。这个数组下标的计算方法是”(n - 1)&hash ”。(n代表数组长度)。这也就解释了HashMap 的长度为什么是2的幂次方。

这个算法应该如何设计呢？

我们首先可能会想到采用%取余的操作来实现。但是，重点来了︰“取余(%)操作中如果除数是2的幂次则等价于与其除数减一的与(&)操作（也就是说hash%length==hash&(length-1)的前提是length是2的n次方;）。”并且采用二进制位操作&，相对于%能够提高运算效率，这就解释了HashMap的长度为什么是2的幂次方。

####  HashMap 多线程操作导致死循环问题

主要原因在于 并发下的Rehash 会造成元素之间会形成⼀个循环链表。不过，jdk 1.8 后解决了这
个问题，但是还是不建议在多线程下使⽤ HashMap,因为多线程下使⽤ HashMap 还是会存在其
他问题⽐如数据丢失。并发环境下推荐使⽤ ConcurrentHashMap 。

### HashMap常见用法

1、containsKey(Object key)方法，返回值为boolean，用于判断当前hashmap中是否包含key对应的key-value

2、containsValue(Object value)方法，返回值为boolean，用于判断当前hashmap中是否包含value对应的key-value

```java
import java.util.*;
 
public class Str {
 
    public static void main(String[] args) {
        // TODO Auto-generated method stub
        Map map = new HashMap();
        //成对放入多个key-value对
        map.put("大学数学",109 );
        map.put("大学物理",10);
        map.put("算法导论",79);
        map.put("数据结构", 99);
        //放入重复的key时，新的value会覆盖原有的value。
        //如果新的value覆盖了原有的value，该方法返回被覆盖的value值
        System.out.println(map.put("操作系统",99));
        System.out.println(map.put("大学物理",99));
        System.out.println(map);
        System.out.println("是否包含值为 操作系统 key："+map.containsKey("操作系统"));
        System.out.println("是否包含值为 99 value："+map.containsValue(99));
        //获取map集合的所有key组成的集合，通过遍历key来实现遍历所有的key-value对
        for(Object key : map.keySet()) {
            System.out.println(key + "--->"+map.get(key));
        }
        map.remove("大学物理");
        System.out.println(map);
    }
 
}
```

## HashSet和HashMap

如果你看过 HashSet 源码的话就应该知道： HashSet 底层就是基于 HashMap 实现的。 （ HashSet 的源码⾮常⾮常少，因为除了 clone() 、 writeObject() 、 readObject() 是 HashSet ⾃⼰不得不实现之外，其他⽅法都是直接调⽤ HashMap 中的⽅法。

<img :src="$withBase('/assets/img/image-20220307111520340.png')">



### HashSet如何自检查

下内容摘⾃我的 Java 启蒙书《Head fist java》第⼆版：
当你把对象加⼊ HashSet 时， HashSet 会先计算对象的 hashcode 值来判断对象加⼊的位置，同
时也会与其他加⼊的对象的 hashcode 值作比较，如果没有相符的 hashcode ， HashSet 会假设
对象没有重复出现。但是如果发现有相同 hashcode 值的对象，这时会调⽤ equals() ⽅法来检查
hashcode 相等的对象是否真的相同。如果两者相同， HashSet 就不会让加⼊操作成功。

hashCode() 与 equals() 的相关规定：

1. 如果两个对象相等，则 hashcode ⼀定也是相同的
2. 两个对象相等,对两个 equals() ⽅法返回 true
3. 两个对象有相同的 hashcode 值，它们也不⼀定是相等的
4. 综上， equals() ⽅法被覆盖过，则 hashCode() ⽅法也必须被覆盖
5. hashCode() 的默认⾏为是对堆上的对象产⽣独特值。如果没有重写 hashCode() ，则该
class 的两个对象⽆论如何都不会相等（即使这两个对象指向相同的数据）。
**==与 equals 的区别（重要！）**
对于基本类型来说，== 比较的是值是否相等；
对于引⽤类型来说，== 比较的是两个引⽤是否指向同⼀个对象地址（两者在内存中存放的地址
（堆内存地址）是否指向同⼀个地⽅）；
对于引⽤类型（包括包装类型）来说，equals 如果没有被重写，对比它们的地址是否相等；如果
equals()⽅法被重写（例如 String），则比较的是地址⾥的内容。

**相⽐于之前的版本， JDK1.8 之后在解决哈希冲突时有了较⼤的变化，当链表⻓度⼤于阈值（默 认为 8）（将链表转换成红⿊树前会判断，如果当前数组的⻓度⼩于 64，那么会选择先进⾏数组 扩容，⽽不是转换为红⿊树）时，将链表转化为红⿊树，以减少搜索时间。**

































































































































































































































































# 计网、OS问题

## 程序、线程和进程

### 程序

程序是为了完成特定任务、用某种语言编写的一组指令的集合。即指一段静态的代码，静态对象。

### 什么是进程？

**进程是程序的⼀次执行过程，是系统运行程序的基本单位，因此进程是动态的。系统运行一个程序即是⼀个进程从创建，运行到消亡的过程。**

在Java中，当我们启动main 函数时其实就是启动了一个JVM的进程，而main函数所在的线程就是这个进程中的一个线程，也称主线程。

如下图所示，在 windows中通过查看任务管理器的方式，我们就可以清楚看到window当前运行的进程(.exe文件的运行)。

![image-20220307192922263](E:/Typora图像文件/image-20220307192922263.png)

**程序是静态的，进程是动态的。**

进程作为资源分配的单位，系统在运行时会为每个进程分配不同的内存区域。

### 什么是线程？

线程与进程相似，但线程是一个比进程更小的执行单位。一个进程在其执行的过程中可以产生多个线程。与进程不同的是同类的多个线程共享进程的堆和方法区资源，但每个线程有自己的程序计数器、虚拟机栈和本地方法栈，所以系统在产生一个线程，或是在各个线程之间作切换工作时，负担要比进程小得多，也正因为如此，线程也被称为轻量级进程。

一个Java程序的运行是main线程和多个其他线程同时运行。

### 描述线程和进程的关系、区别、优缺点

![image-20220307193916858](E:/Typora图像文件/image-20220307193916858.png)

从上图可以看出:一个进程中可以有多个线程，**多个线程共享进程的堆和方法区** (JDK1.8之后的元空间)**资源**，但是**每个线程有自己的程序计数器、虚拟机栈和本地方法栈**。

**总结**︰**线程是进程划分成的更小的运行单位。线程和进程最大的不同在于基本上各进程是独立的，而各线程则不一定，因为同一进程中的线程极有可能会相互影响。线程执行开销小，但不利于资源的管理和保护;而进程正相反**

#### 程序计数器为什么是私有的？

程序计数器主要有下面两个作用:

1.字节码解释器通过改变程序计数器来依次读取指令，从而实现代码的流程控制，如:顺序执行、选择、循环、异常处理。

2.在多线程的情况下，程序计数器用于记录当前线程执行的位置，从而当线程被切换回来的时候能够知道该线程上次运行到哪儿了。

需要注意的是，如果执行的是 native方法，那么程序计数器记录的是undefined地址，只有执行的是Java代码时程序计数器记录的才是下一条指令的地址。

所以，程序计数器私有主要是为了线程切换后能恢复到正确的执行位置。

#### 虚拟机栈和本地方法栈为什么是私有的？

**虚拟机栈** 

​	每个Java方法在执行的同时会创建一个栈帧用于存储局部变量表、操作数栈、常量池引用等信息。从方法调用直至执行完成的过程，就对应着一个栈帧在Java虚拟机栈中入栈和出栈的过程。

**本地方法栈**

​	和虚拟机栈所发挥的作用非常相似，区别是︰虚拟机栈为虚拟机执行Java方法（也就是字节码)服务，而本地方法栈则为虚拟机使用到的Native方法服务。在HotSpot虚拟机中和Java虚拟机栈合二为一。

所以，为了保证线程中的局部变量不被别的线程访问到．虑拟机栈和本地方法栈是线程私有的。

