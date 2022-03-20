---
title: Docker
date: 2022-03-10
tags:
 - Docker
categories:
 - 后端
---
# 测试网址： http://120.76.216.233

# Docker

学习自狂神 视频链接：https://www.bilibili.com/video/BV1og4y1q7M4?p=13&share_source=copy_web

## Docker能干嘛



<img :src="$withBase('/assets/img/image-20220313151619095.png')">
虚拟机技术缺点：

1. 资源占用十分多
2. 冗余步骤多
3. 启动很慢！



> 容器化技术
<img :src="$withBase('/assets/img/image-20220313164034857.png')">

比较Docker和虚拟机技术的不同:

- 传统虚拟机，虚拟出一条硬件，运行一个完整的操作系统，然后在这个系统上安装和运行软件

- 容器内的应用直接运行在宿主机的内容，容器是没有自己的内核的

- 每个容器间是相互隔离的，每个容器内都有一个属于自己的文件系统，互不影响





> DevOps(开发、运维)

**应用更快速的交付和部署**

传统：一堆帮助文档 安装程序

Docker：打包镜像发布测试，一键运行

**更便捷的升级和扩容**

使用了Docker后我们部署应用就和搭积木一样！

项目打包为一个镜像，扩展 服务器A！ 服务器B



## Docker名词
<img :src="$withBase('/assets/img/image-20220313165144172.png')">



镜像（image）：

docker镜像就好比是一个模板，可以通过这个模板来创建容器服务，tomcat镜像-->run -->tomcat01

容器（contalner）：

Docker利用容器技术，独立运行一个或者一个组应用，通过镜像来创建的

启动、停止、删除基本命令

目前可以把这个容器理解为一个简单的Linux系统

仓库（repository）：

仓库就是存放镜像的地方！

仓库分为共有仓库和私有仓库

Docker Hub(默认国外)

## 安装Docker

> 环境要求

CentOs 7 内核版本3.10以上

```bash
[root@iZwz969hnvixoyx8d2dmbvZ opt]# uname -r
3.10.0-1127.19.1.el7.x86_64
[root@iZwz969hnvixoyx8d2dmbvZ opt]# 
```

> 安装

官方文档：https://docs.docker.com/engine/install/centos/

1.删除旧的Docker

```bash
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
                  
#安装需要的安装包
sudo yum install -y yum-utils

#设置镜像源仓库
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

#更新yum包
yum makecache fast

#安装Docker相关内容 docker-ce 社区版 -ee是企业版 
sudo yum install docker-ce docker-ce-cli containerd.io

#启动Docker
sudo systemctl start docker

#检查是否安装成功
docker vsersion
```
<img :src="$withBase('/assets/img/image-20220313171350268.png')">


```bash
#运行helloworld
docker run hello-world
```
<img :src="$withBase('/assets/img/image-20220313171553287.png')">


分析：一开始说找不到镜像，（Pulling）然后去官方拉去镜像，拉取后输出（Hello from Docker）

此时证明安装成功！

```bash
#查看下载的hello-world镜像是否存在
docker images
```

了解：卸载docker

```bash
#删除运行环境
sudo yum remove docker-ce docker-ce-cli containerd.io
#删除目录、资源
 sudo rm -rf /var/lib/docker
 sudo rm -rf /var/lib/containerd
```

## 阿里云镜像加速

1.登录阿里云然后找到镜像服务
<img :src="$withBase('/assets/img/image-20220313172109307.png')">


2.找到镜像加速器
<img :src="$withBase('/assets/img/image-20220313172202128.png')">


配置加速：
<img :src="$withBase('/assets/img/image-20220313172246190.png')">


```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://omgw3mz7.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```



## HelloWorld运行原理
<img :src="$withBase('/assets/img/image-20220313172713744.png')">


## 底层原理

Docker是怎么工作的？

Docker是一个CS结构系统（Client-Server）,Docker的守护进程运行在主机上，通过Socket客户端访问

DockerServer 接收到Docker-Client的指令，就会执行这个命令。
<img :src="$withBase('/assets/img/image-20220313173237009.png')">


> Docker为什么比VM快

1. Docker有比虚拟机更少的抽象层
2. Docker利用的是宿主机的内核，vm需要的是GuestOS
3.
<img :src="$withBase('/assets/img/image-20220313173529309.png')">

所以说，新建一个容器的时候，docker不需要想虚拟机一样重新加载一个操作系统内核，避免引导。虚拟机是加载Guest 0S，分钟级别的，而docker是利用宿主机的操作系统吗，省略了这个复杂的过程，秒级!

# Docker常用命令

## 帮助命令

```bash
docker version    #docker版本信息
docker info		  #docker系统信息
docker 命令 --help #万能命令，查阅所有命令

REPOSITORY  镜像的仓库源
TAG         镜像的标签
IMAGE ID    镜像的Id   
CREATED     镜像的创建时间   
SIZE		镜像的大小

#可选项 docker images --help获得
-a, --all  #列出所有镜像
-q, --quiet #只显示镜像的id
```

## 镜像命令

**docker pull** 下载镜像

```bash
[root@iZwz969hnvixoyx8d2dmbvZ /]# docker pull mysql #docker pull mysql tag
Using default tag: latest #若不写tag，默认为latest
latest: Pulling from library/mysql
72a69066d2fe: Pull complete  #分层下载
93619dbc5b36: Pull complete 
99da31dd6142: Pull complete 
626033c43d70: Pull complete 
37d5d7efb64e: Pull complete 
ac563158d721: Pull complete 
d2ba16033dad: Pull complete 
688ba7d5c01a: Pull complete 
00e060b6d11d: Pull complete 
1c04857f594f: Pull complete 
4d7cfa90e6ea: Pull complete 
e0431212d27d: Pull complete 
Digest: sha256:e9027fe4d91c0153429607251656806cc784e914937271037f7738bd5b8e7709 #签名
Status: Downloaded newer image for mysql:latest
docker.io/library/mysql:latest #真实地址

```
<img :src="$withBase('/assets/img/image-20220313175737456.png')">


分层下载！

一起已经下了的是公用的！

删除Image

```bash
docker rmi -f ImageId #docker images 可以搜索所有镜像
docker rmi -f 容器ID 容器Id 容器ID #删除多个容器
```
<img :src="$withBase('/assets/img/image-20220313175922780.png')">

## 容器命令

> 我们有了镜像才可以创建容器，linux，下载一个镜像来学习

```bash
docker pull centos
```

新建容器并启动

```bash
docker run [可选参数] image

#参数说明
--name="Name" 容器名字，tomcat01，tomcat02用来区分容器
-d			  后台方式运行
-it           使用交互方式运行
-p            指定容器端口 -p 8080:8080
	-p 主机端口：容器端口
	-p 容器端口
-p             随机指定端口
```

启动并进入容器

```bash
#docker run -it centos /bin/bash

[root@iZwz969hnvixoyx8d2dmbvZ /]# docker run -it centos /bin/bash
[root@8bc7ec4dcb78 /]# ls
bin  etc   lib	  lost+found  mnt  proc  run   srv  tmp  var
dev  home  lib64  media       opt  root  sbin  sys  usr

[root@8bc7ec4dcb78 /]# exit
exit
[root@iZwz969hnvixoyx8d2dmbvZ /]# 
```
<img :src="$withBase('/assets/img/image-20220313181255259.png')">




**列出所有的运行的容器**

```bash
#docker ps 命令
			#列出当前运行的容器
			-a #最近运行的容器
			-n=? #显示最近运行的n个容器
			-q  #只显示容器的编号
			-aq #显示所有最近创建的容器的编号
			
[root@iZwz969hnvixoyx8d2dmbvZ /]# docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
[root@iZwz969hnvixoyx8d2dmbvZ /]# docker ps -a
CONTAINER ID   IMAGE         COMMAND       CREATED             STATUS                         PORTS     NAMES
8bc7ec4dcb78   centos        "/bin/bash"   9 minutes ago       Exited (0) 7 minutes ago                 intelligent_dijkstra
8f347ada525a   hello-world   "/hello"      About an hour ago   Exited (0) About an hour ago             happy_faraday

```

**退出容器**

```bash
exit #直接容器停止并退出
Ctrl+P+Q #容器不停止但退出
```

**删除容器**

```bash
docker rm 容器id                #删除指定容器
docker rm -f $(docker ps -ap)  #删除所有容器
```

**启动和停止容器**

```bash
docker start 容器ID   #启动容器
docker restart 容器Id	#重启容器
docker restart 容器Id	#停止当前正在运行的容器
docker kill 容器Id	#强制停止当前容器
```

## 其他常用命令

**后台启动容器**

```bash
#命令 docker run -d 镜像名
docker run -d centos
#问题 docker ps 发现centos挺固执了

#常见的坑;docker容器使用后台运行，就必须要有要一个前台进程，docker发现没有应用，就会自动停止nginx，容器启动后，发现自己没有提供服务，就会立刻停止，就是没有程序了
```

**查看日志**

```bash
docker logs -f -t --tail 容器Id
#显示日志
-tf #显示日志
-tail number #要显示的日志条数 docker logs -tf --tail 10 容器

```

**查看容器中进程信息**

```bash
#命令 docker top 容器ID
docker top dce7b23skjdbf
```

**查看镜像的元数据**

```bash
#docker inspect 容器id
[root@iZwz969hnvixoyx8d2dmbvZ /]# docker inspect d367ea67c454
[
    {
        "Id": "d367ea67c454d99b8c845b29c693909825d51bb19bdff91608b6647ee20f0d16",
        "Created": "2022-03-13T10:29:52.261895051Z",
        "Path": "/bin/bash",
        "Args": [],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 22044,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2022-03-13T10:43:41.072934916Z",
            "FinishedAt": "2022-03-13T10:30:56.721112188Z"
        },
        "Image": "sha256:5d0da3dc976460b72c77d94c8a1ad043720b0416bfc16c52c45d4847e53fadb6",
        "ResolvConfPath": "/var/lib/docker/containers/d367ea67c454d99b8c845b29c693909825d51bb19bdff91608b6647ee20f0d16/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/d367ea67c454d99b8c845b29c693909825d51bb19bdff91608b6647ee20f0d16/hostname",
        "HostsPath": "/var/lib/docker/containers/d367ea67c454d99b8c845b29c693909825d51bb19bdff91608b6647ee20f0d16/hosts",
        "LogPath": "/var/lib/docker/containers/d367ea67c454d99b8c845b29c693909825d51bb19bdff91608b6647ee20f0d16/d367ea67c454d99b8c845b29c693909825d51bb19bdff91608b6647ee20f0d16-json.log",
        "Name": "/keen_kilby",
        "RestartCount": 0,
        "Driver": "overlay2",
        "Platform": "linux",
        "MountLabel": "",
        "ProcessLabel": "",
        "AppArmorProfile": "",
        "ExecIDs": null,
        "HostConfig": {
            "Binds": null,
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "default",
            "PortBindings": {},
            "RestartPolicy": {
                "Name": "no",
                "MaximumRetryCount": 0
            },
            "AutoRemove": false,
            "VolumeDriver": "",
            "VolumesFrom": null,
            "CapAdd": null,
            "CapDrop": null,
            "CgroupnsMode": "host",
            "Dns": [],
            "DnsOptions": [],
            "DnsSearch": [],
            "ExtraHosts": null,
            "GroupAdd": null,
            "IpcMode": "private",
            "Cgroup": "",
            "Links": null,
            "OomScoreAdj": 0,
            "PidMode": "",
            "Privileged": false,
            "PublishAllPorts": false,
            "ReadonlyRootfs": false,
            "SecurityOpt": null,
            "UTSMode": "",
            "UsernsMode": "",
            "ShmSize": 67108864,
            "Runtime": "runc",
            "ConsoleSize": [
                0,
                0
            ],
            "Isolation": "",
            "CpuShares": 0,
            "Memory": 0,
            "NanoCpus": 0,
            "CgroupParent": "",
            "BlkioWeight": 0,
            "BlkioWeightDevice": [],
            "BlkioDeviceReadBps": null,
            "BlkioDeviceWriteBps": null,
            "BlkioDeviceReadIOps": null,
            "BlkioDeviceWriteIOps": null,
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpuRealtimePeriod": 0,
            "CpuRealtimeRuntime": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "Devices": [],
            "DeviceCgroupRules": null,
            "DeviceRequests": null,
            "KernelMemory": 0,
            "KernelMemoryTCP": 0,
            "MemoryReservation": 0,
            "MemorySwap": 0,
            "MemorySwappiness": null,
            "OomKillDisable": false,
            "PidsLimit": null,
            "Ulimits": null,
            "CpuCount": 0,
            "CpuPercent": 0,
            "IOMaximumIOps": 0,
            "IOMaximumBandwidth": 0,
            "MaskedPaths": [
                "/proc/asound",
                "/proc/acpi",
                "/proc/kcore",
                "/proc/keys",
                "/proc/latency_stats",
                "/proc/timer_list",
                "/proc/timer_stats",
                "/proc/sched_debug",
                "/proc/scsi",
                "/sys/firmware"
            ],
            "ReadonlyPaths": [
                "/proc/bus",
                "/proc/fs",
                "/proc/irq",
                "/proc/sys",
                "/proc/sysrq-trigger"
            ]
        },
        "GraphDriver": {
            "Data": {
                "LowerDir": "/var/lib/docker/overlay2/19c9a4adf9fadc6167ee5fda1b268322f58496f432b9027c53b31bf097fd0450-init/diff:/var/lib/docker/overlay2/8452c5431402ad6e5684578fd5bcea95d881f6c421af364c7123f0763dd55832/diff",
                "MergedDir": "/var/lib/docker/overlay2/19c9a4adf9fadc6167ee5fda1b268322f58496f432b9027c53b31bf097fd0450/merged",
                "UpperDir": "/var/lib/docker/overlay2/19c9a4adf9fadc6167ee5fda1b268322f58496f432b9027c53b31bf097fd0450/diff",
                "WorkDir": "/var/lib/docker/overlay2/19c9a4adf9fadc6167ee5fda1b268322f58496f432b9027c53b31bf097fd0450/work"
            },
            "Name": "overlay2"
        },
        "Mounts": [],
        "Config": {
            "Hostname": "d367ea67c454",
            "Domainname": "",
            "User": "",
            "AttachStdin": true,
            "AttachStdout": true,
            "AttachStderr": true,
            "Tty": true,
            "OpenStdin": true,
            "StdinOnce": true,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
            ],
            "Cmd": [
                "/bin/bash"
            ],
            "Image": "centos",
            "Volumes": null,
            "WorkingDir": "",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": {
                "org.label-schema.build-date": "20210915",
                "org.label-schema.license": "GPLv2",
                "org.label-schema.name": "CentOS Base Image",
                "org.label-schema.schema-version": "1.0",
                "org.label-schema.vendor": "CentOS"
            }
        },
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "23206ebcd835193855f1a641424d50c515770bd81d14e99bc8e75b4ff7a73d33",
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "Ports": {},
            "SandboxKey": "/var/run/docker/netns/23206ebcd835",
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "ce314210bc7f0f2d174deb608b1cde1a2f5b6618d3ff077634aea9755c94e818",
            "Gateway": "172.17.0.1",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "172.17.0.2",
            "IPPrefixLen": 16,
            "IPv6Gateway": "",
            "MacAddress": "02:42:ac:11:00:02",
            "Networks": {
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "NetworkID": "989c2170cac43de814668de4c7a551b400ff0b34b7de2e8163f55ad3ed40256e",
                    "EndpointID": "ce314210bc7f0f2d174deb608b1cde1a2f5b6618d3ff077634aea9755c94e818",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.2",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "02:42:ac:11:00:02",
                    "DriverOpts": null
                }
            }
        }
    }
]

```

**进入当前正在运行的容器**

```shell
#我们通常容器都是使用后台方式运行，需要进入容器，修改一些配置

#命令
docker exec -it 容器id
#测试
[root@iZwz969hnvixoyx8d2dmbvZ /]# docker ps
CONTAINER ID   IMAGE     COMMAND       CREATED          STATUS         PORTS     NAMES
d367ea67c454   centos    "/bin/bash"   17 minutes ago   Up 3 minutes             keen_kilby
[root@iZwz969hnvixoyx8d2dmbvZ /]# docker exec -it d367ea67c454 /bin/bash
[root@d367ea67c454 /]# ls
bin  etc   lib	  lost+found  mnt  proc  run   srv  tmp  var
dev  home  lib64  media       opt  root  sbin  sys  usr
[root@d367ea67c454 /]# ps -ef
UID        PID  PPID  C STIME TTY          TIME CMD
root         1     0  0 10:43 pts/0    00:00:00 /bin/bash
root        15     0  0 10:47 pts/1    00:00:00 /bin/bash
root        30    15  0 10:48 pts/1    00:00:00 ps -ef



#方法二
#命令 docker attach 容器id
#测试
[root@iZwz969hnvixoyx8d2dmbvZ /]# docker attach  d367ea67c454
[root@d367ea67c454 /]# exit
exit

#docker exec   #进入容器后开启一个新的终端，在里面操作
#docker attach #进入容器正在执行的终端，不会新建终端
```

**从容器内拷贝数据到主机**

```shell
#命令 docker cp 容器id:容器内路径 目的的主机路径

#测试
[root@iZwz969hnvixoyx8d2dmbvZ ~]# docker run -it centos /bin/bash #启动容器
[root@261bb1145d2e /]# cd /home
[root@261bb1145d2e home]# ls
[root@261bb1145d2e home]# [root@iZwz969hnvixoyx8d2dmbvZ ~]#  #退出容器但不关掉容器，这步多余 Ctrl+P+Q实现
[root@iZwz969hnvixoyx8d2dmbvZ ~]# docker ps
CONTAINER ID   IMAGE     COMMAND       CREATED              STATUS              PORTS     NAMES
261bb1145d2e   centos    "/bin/bash"   About a minute ago   Up About a minute             focused_colden
[root@iZwz969hnvixoyx8d2dmbvZ home]# docker ps
CONTAINER ID   IMAGE     COMMAND       CREATED              STATUS              PORTS     NAMES
261bb1145d2e   centos    "/bin/bash"   About a minute ago   Up About a minute             focused_colden
[root@iZwz969hnvixoyx8d2dmbvZ home]# docker attach 261bb1145d2e #进入容器
[root@261bb1145d2e home]# ls
[root@261bb1145d2e home]# touch bashtest.java #创建文件
[root@261bb1145d2e home]# exit #退出并关闭容器
exit
[root@iZwz969hnvixoyx8d2dmbvZ home]# docker ps -a
CONTAINER ID   IMAGE         COMMAND       CREATED          STATUS                      PORTS     NAMES
261bb1145d2e   centos        "/bin/bash"   3 minutes ago    Exited (0) 4 seconds ago              focused_colden
eaf8ee96f004   centos        "/bin/bash"   3 minutes ago    Exited (1) 3 minutes ago              busy_lamport
d367ea67c454   centos        "/bin/bash"   29 minutes ago   Exited (0) 8 minutes ago              keen_kilby
8bc7ec4dcb78   centos        "/bin/bash"   46 minutes ago   Exited (0) 45 minutes ago             intelligent_dijkstra
8f347ada525a   hello-world   "/hello"      2 hours ago      Exited (0) 2 hours ago                happy_faraday
[root@iZwz969hnvixoyx8d2dmbvZ home]# docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
[root@iZwz969hnvixoyx8d2dmbvZ home]# docker cp 261bb1145d2e:/home/bashtest.java  /home #将容器数据复制到主机
[root@iZwz969hnvixoyx8d2dmbvZ home]# ls 
bashtest.java  test.java
#拷贝是个手动过程，未来我们使用 -v卷的技术，可以实现，自动同步
```

## 练习

### 小练习1：Nginx

```shell
#安装
[root@iZwz969hnvixoyx8d2dmbvZ home]# docker pull nginx
Using default tag: latest
latest: Pulling from library/nginx
a2abf6c4d29d: Pull complete 
a9edb18cadd1: Pull complete 
589b7251471a: Pull complete 
186b1aaa4aa6: Pull complete 
b4df32aa5a72: Pull complete 
a0bcbecc962e: Pull complete 
Digest: sha256:0d17b565c37bcbd895e9d92315a05c1c3c9a29f762b011a10c54a66cd53c9b31
Status: Downloaded newer image for nginx:latest
docker.io/library/nginx:latest
[root@iZwz969hnvixoyx8d2dmbvZ home]# docker images
REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
nginx         latest    605c77e624dd   2 months ago   141MB
hello-world   latest    feb5d9fea6a5   5 months ago   13.3kB
centos        latest    5d0da3dc9764   5 months ago   231MB
#测试
[root@iZwz969hnvixoyx8d2dmbvZ home]# docker run -d --name nginx01 -p:3344
"docker run" requires at least 1 argument.
See 'docker run --help'.

Usage:  docker run [OPTIONS] IMAGE [COMMAND] [ARG...]

Run a command in a new container
#启动nginx docker run -d --name nginx01 -p:3344:80 nginx
[root@iZwz969hnvixoyx8d2dmbvZ home]# docker run -d --name nginx01 -p:3344:80 nginx
\d8ac68ea2da3bdb2022bdc9e6a6adb7ab56be04f343ecbee8eb092473652194d
[root@iZwz969hnvixoyx8d2dmbvZ home]# docker ps
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS                                   NAMES
d8ac68ea2da3   nginx     "/docker-entrypoint.…"   20 seconds ago   Up 19 seconds   0.0.0.0:3344->80/tcp, :::3344->80/tcp   nginx01
[root@iZwz969hnvixoyx8d2dmbvZ home]# curl localhost:3344
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
[root@iZwz969hnvixoyx8d2dmbvZ home]# 

#进入容器
[root@iZwz969hnvixoyx8d2dmbvZ home]# docker exec -it nginx01 /bin/bash
root@d8ac68ea2da3:/# whereis nginx
nginx: /usr/sbin/nginx /usr/lib/nginx /etc/nginx /usr/share/nginx
root@d8ac68ea2da3:/# cd /etc/nginx
root@d8ac68ea2da3:/etc/nginx# ls
conf.d	fastcgi_params	mime.types  modules  nginx.conf  scgi_params  uwsgi_params
root@d8ac68ea2da3:/etc/nginx# 

```

**端口暴露原理**
<img :src="$withBase('/assets/img/image-20220313211738587.png')">


### 小练习2：TomCat

> 安装

```bash
#官方的使用
docker run -it --rm tomcat:9.0

#我们之前的启动都是后台，停止了容器之后，容器还是可以查到  docker run -it --rm 一般用来测试，用完就删除

#我们还是先下载再启动
docker pull tomcat

#启动运行
docker run -d -p 8080:8080 --name tomcat01 tomcat

#测试访问没有问题
[root@iZwz969hnvixoyx8d2dmbvZ home]# docker exec -it tomcat01 /bin/bash

#发现问题：1、linux命令少了 2.没有webapps 阿里云镜像的原因，默认最小的镜像，所以不必要的都删除掉，保证最小的工作环境
#这样后，访问才不是404
root@9d971489dd66:/usr/local/tomcat# cd webapps
root@9d971489dd66:/usr/local/tomcat/webapps# ls
root@9d971489dd66:/usr/local/tomcat/webapps# cd ../
root@9d971489dd66:/usr/local/tomcat# ls
BUILDING.txt	 NOTICE		RUNNING.txt  lib	     temp	   work
CONTRIBUTING.md  README.md	bin	     logs	     webapps
LICENSE		 RELEASE-NOTES	conf	     native-jni-lib  webapps.dist
root@9d971489dd66:/usr/local/tomcat# cp -r  webapps.dist/* webapps 
root@9d971489dd66:/usr/local/tomcat# cd webapps
root@9d971489dd66:/usr/local/tomcat/webapps# ls
ROOT  docs  examples  host-manager  manage

```



### 小练习3：es+kibana

```bash
# es 暴露的接口很多
# es 十分的耗内存
# es 的数据一般需要放到安全网络
# --net somenetwork ? 网络配置
# 启动 elasticsearch
docker run -d --name elasticsearch --net somenetwork -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:7.6.2
#启动个虚拟就都不好了，变卡了，但我没有，因为我启动失败了，管他的，反正学生机跑不动

```





## 可视化工具

- portainer

```bash
docker run -d -p 8088:9000 \
--restart=always -v /var/run/docker.sock:/var/run/docker.sock --privileged=true portainer/portainer
```

访问测试： http://120.76.216.233:8088/

本机测试： 

```bash
curl localhost:8088
```
<img :src="$withBase('/assets/img/image-20220314003512399.png')">

密码：lh***********
<img :src="$withBase('/assets/img/image-20220314003653988.png')">

选择本地仓库



可视化面板（平时不会用）
<img :src="$withBase('/assets/img/image-20220314003801052.png')">

# Docker镜像

## 镜像是什么？

镜像是一种轻量级、可执行的独立软件包，用来打包软件运行环境和基于运行环境开发的软件，它包含运行某个软件所需的所有内容，包括代码、运行时、库、环境变量和配置文件。

所有的应用，直接打包docker镜像，就可以直接跑起来!

镜像来源：

- 远程库拉取
- 拷贝
- 自己做镜像源

## 镜像加载原理

> UnionFS(联合文件系统)

UnionFS ( 联合文件系统）: Union文件系统(UnionFS )是一种分层、轻量级并且高性能的文件系统，它支持对文件系统的修改作为一次提交来一层层的叠加，同时可以将不同目录挂载到同一个虚拟文件系统下(unite several directories into a single virtualfilesystem)。Union文件系统是Docker镜像的基础。镜像可以通过分层来进行继承，基于基础镜像（没有父镜像），可以制作各种具体的应用镜像。

特性∶一次同时加载多个文件系统，但从外面看起来，只能看到一个文件系统，联合加载会把各层文件系统叠加起来，这样最终的文件系统会包含所有底层的文件和目录



> Docker镜像加载原理

docker的镜像实际上由一层一层的文件系统组成，这种层级的文件系统UnionFs.

bootfs(boot file system)主要包含bootloader和kernel, bootloader主要是引导加载kernel, Linux刚启动时会加载bootfs文件系统，在Docker镜像的最底层是bootfs。这一层与我们典型的Linux/Unix系统是一样的，包含boot加载器和内核。当boot加载完成之后整个内核就都在内存中了，此时内存的使用权已由bootfs转交给内核，此时系统也会卸载bootfs。

rootfs (root file system)，在bootfs之上。包含的就是典型Linux系统中的/dev, /proc,/bin,/etc等标准目录和文件。roots就是各种不同的操作系统发行版，比如Ubuntu , Centos等等。
<img :src="$withBase('/assets/img/image-20220314004302987.png')">




为什么安装CentOS有几个G但Docker安装的只有几十M？

对于一个精简的OS，rootfs 可以很小，只需要包含最基本的命令，工具和程序库就可以了，因为底层直接用Host的kernel，自己只需要提供rootfs就可以了。由此可见对于不同的linux发行版, bootfs基本是一致的, rootfs会有差别,因此不同的发行版可以公用bootfs。

> 分层

**所有的Docker镜像都起始于一个基础镜像层，当进行修改或增加新的内容时，就会在当前镜像层之上，创建新的镜像层。**

举一个简单的例子，假如基于Ubuntu Linux 16.04创建一个新的镜像，这就是新镜像的第一层;如果在该镜像中添加Python包，就会在基础镜像层之上创建第二个镜像层;如果继续添加一个安全补丁，就会创建第三个镜像层。

该镜像当前已经包含3个镜像层，如下图所示(这只是一个用于演示的很简单的例子)。
<img :src="$withBase('/assets/img/image-20220314100500411.png')">




<img :src="$withBase('/assets/img/image-20220314101204495.png')">


这种情况下，上层镜像层中的文件覆盖了底层镜像层中的文件。这样就使得文件的更新版本作为一个新镜像层添加到镜像当中。Docker通过存储引擎（新版本采用快照机制)的方式来实现镜像层堆栈，并保证多镜像层对外展示为统一的文件系统

Linux上可用的存储引擎有AUFS、Overlay2、Device Mapper、Btrfs以及ZFS。顾名思义，每种存储引擎都基于Linux中对应的文件系统或者块设备技术，并且每种存储引擎都有其独有的性能特点。



> 特点

Docker镜像都是只读的，当容器启动时，一个新的可写层被加载到镜像的顶部

这一层就是我们常说的容器层，容器之下的都叫镜像层。
<img :src="$withBase('/assets/img/image-20220314101602516.png')">

## commit镜像

```bash
docker commit #提交一个容器成为新的副本
docker commit -m="提交的描述信息" -a="作者" 容器Id 目标镜像名：tag
```

**测试**

```bash
#启动一个默认的tomcat

#这个tomcat里webapps里没东西

#我们考入基本文件后
root@9d971489dd66:/usr/local/tomcat# cd webapps
root@9d971489dd66:/usr/local/tomcat/webapps# ls
root@9d971489dd66:/usr/local/tomcat/webapps# cd ../
root@9d971489dd66:/usr/local/tomcat# ls
BUILDING.txt	 NOTICE		RUNNING.txt  lib	     temp	   work
CONTRIBUTING.md  README.md	bin	     logs	     webapps
LICENSE		 RELEASE-NOTES	conf	     native-jni-lib  webapps.dist
root@9d971489dd66:/usr/local/tomcat# cp -r  webapps.dist/* webapps 
root@9d971489dd66:/usr/local/tomcat# cd webapps
root@9d971489dd66:/usr/local/tomcat/webapps# ls
ROOT  docs  examples  host-manager  manage

#考入完毕

root@9d971489dd66:/usr/local/tomcat/webapps# exit
exit
[root@iZwz969hnvixoyx8d2dmbvZ ~]# docker ps #查询容器Id
CONTAINER ID   IMAGE                 COMMAND             CREATED          STATUS          PORTS                                       NAMES
9d971489dd66   tomcat                "catalina.sh run"   28 minutes ago   Up 28 minutes   0.0.0.0:8080->8080/tcp, :::8080->8080/tcp   objective_ganguly
e7eaa980f992   portainer/portainer   "/portainer"        10 hours ago     Up 10 hours     0.0.0.0:8088->9000/tcp, :::8088->9000/tcp   naughty_galois
############ commit成镜像
[root@iZwz969hnvixoyx8d2dmbvZ ~]# docker commit -a="hao" -m="add webapps app" 9d971489dd66 tomcat02:1.0
############
sha256:db6145d646d58a414415199fd3e006d0cb6f34c7621aad53a0db772a1f821514
[root@iZwz969hnvixoyx8d2dmbvZ ~]# docker images
REPOSITORY            TAG       IMAGE ID       CREATED         SIZE
tomcat02              1.0       db6145d646d5   7 seconds ago   684MB
nginx                 latest    605c77e624dd   2 months ago    141MB
tomcat                9.0       b8e65a4d736d   2 months ago    680MB
tomcat                latest    fb5657adc892   2 months ago    680MB
hello-world           latest    feb5d9fea6a5   5 months ago    13.3kB
centos                latest    5d0da3dc9764   5 months ago    231MB
portainer/portainer   latest    580c0e4e98b0   12 months ago   79.1MB

```
<img :src="$withBase('/assets/img/image-20220314105406645.png')">


```shell
如果想保存当前容器状态，使用commit保存为镜像
就好比学VM时的快照
```



# 容器数据卷

docker理念：将应用和环境打包成一个镜像！

数据？如果数据都在容器中，那我们容器删除，数据就会丢失！

MySQL,容器删了，删库跑路咯~

容器之间可以有一个数据共享的技术！Docker容器产生的数据，可以同步到本地！

这就是卷技术！目录挂载，将我们的容器内的目录，挂载到Linux上面！
<img :src="$withBase('/assets/img/image-20220314110344291.png')">

**总结：容器的持久化和同步操作，容器之间也可以数据共享**

## 使用数据卷

> 方法一： -v

```bash
docker run -it -v 主机目录，容器内目录

[root@iZwz969hnvixoyx8d2dmbvZ /]# docker run -it -v /home/ceshi:/home centos /bin/bash
#再开一个窗口，使用inspect查看信息
[root@iZwz969hnvixoyx8d2dmbvZ home]# docker inspect a4bcc6e82076

```
<img :src="$withBase('/assets/img/image-20220314111257555.png')">


在容器里创建
<img :src="$withBase('/assets/img/image-20220314111715129.png')">

在linux主机上查看映射的目录
<img :src="$withBase('/assets/img/image-20220314111744916.png')">

> 主机上更改也会传到容器内！双向绑定！

1. 关闭容器
2. 在主机内创建文件并修改
<img :src="$withBase('/assets/img/image-20220314112147916.png')">


内容是 hello,linux update

​	2.再次启动之前的容器并查看内容

```bash
#获取容器id
[root@iZwz969hnvixoyx8d2dmbvZ /]# docker ps -a
CONTAINER ID   IMAGE                 COMMAND                  CREATED          STATUS                            PORTS                                       NAMES
a4bcc6e82076   centos                "/bin/bash"              11 minutes ago   Exited (0) About a minute ago                                                 vigilant_elbakyan
9d971489dd66   tomcat                "catalina.sh run"        58 minutes ago   Exited (130) About a minute ago                                               objective_ganguly
e7eaa980f992   portainer/portainer   "/portainer"             11 hours ago     Up 11 hours                       0.0.0.0:8088->9000/tcp, :::8088->9000/tcp   naughty_galois
cdaf8f453fbb   portainer/portainer   "/portainer"             11 hours ago     Exited (137) 11 hours ago                                                     cool_pascal
f904c7bc312b   f29a1ee41030          "/usr/local/bin/dock…"   11 hours ago     Created                                                                       elasticsearch
bcda56cb7974   tomcat                "catalina.sh run"        14 hours ago     Exited (137) 58 minutes ago                                                   tomcat01
d8ac68ea2da3   nginx                 "/docker-entrypoint.…"   14 hours ago     Exited (0) 14 hours ago                                                       nginx01
261bb1145d2e   centos                "/bin/bash"              16 hours ago     Exited (0) 16 hours ago                                                       focused_colden
eaf8ee96f004   centos                "/bin/bash"              16 hours ago     Exited (1) 16 hours ago                                                       busy_lamport
d367ea67c454   centos                "/bin/bash"              17 hours ago     Exited (0) 16 hours ago                                                       keen_kilby
8bc7ec4dcb78   centos                "/bin/bash"              17 hours ago     Exited (0) 17 hours ago                                                       intelligent_dijkstra
8f347ada525a   hello-world           "/hello"                 18 hours ago     Exited (0) 18 hours ago                                                       happy_faraday
#启动容器
[root@iZwz969hnvixoyx8d2dmbvZ /]# docker start a4bcc6e82076
a4bcc6e82076
#进入容器
[root@iZwz969hnvixoyx8d2dmbvZ /]# docker attach a4bcc6e82076
[root@a4bcc6e82076 /]# cd /home/
[root@a4bcc6e82076 home]# ls
shujujuan.java
#查看内容
[root@a4bcc6e82076 home]# cat shujujuan.java 
hello,linux update
[root@a4bcc6e82076 home]# 

```

### 实战：安装MySQL

```bash
#获取镜像
docker pull mysql:8.0.23
#启动mysql
-d 后台运行
-p 端口映射
-v 卷挂载
-e 环境配置  -e MYSQL_ROOT_PASSWORD=root 设置初始密码为root
[root@iZwz969hnvixoyx8d2dmbvZ /]# docker run -d -p 3310:3306 -v /home/mysql/conf:/etc/mysql/conf.d -v /home/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root --name mysql01 mysql:8.0.23

```

### 测试连接：（出现问题！）

问题：开启阿里云公网访问端口3310后报这个错
<img :src="$withBase('/assets/img/image-20220314114631074.png')">


解决：

参考网址：https://blog.csdn.net/Alalafan/article/details/81358551

解决过程：

```bash
#查询mysql的容器ID
[root@iZwz969hnvixoyx8d2dmbvZ /]# docker ps
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                                                  NAMES
2ed9912a481c   mysql:8.0.23   "docker-entrypoint.s…"   9 minutes ago   Up 9 minutes   33060/tcp, 0.0.0.0:3310->3306/tcp, :::3310->3306/tcp   mysql01
#进入容器
[root@iZwz969hnvixoyx8d2dmbvZ /]# docker exec -it 2ed9912a481c bash
#进入mysql
root@2ed9912a481c:/# mysql --user=root --passsword
mysql: [ERROR] unknown option '--passsword'.
root@2ed9912a481c:/# mysql --user=root --password
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 11
Server version: 8.0.23 MySQL Community Server - GPL

Copyright (c) 2000, 2021, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
#输入命令：ALTER  USER  'root'  IDENTIFIED  WITH  mysql_native_password  BY 'root'
#此处 'root'是密码
mysql> ALTER  USER  'root'  IDENTIFIED  WITH  mysql_native_password  BY 'root';
Query OK, 0 rows affected (0.01 sec)

mysql> 

```

然后连接成功！
<img :src="$withBase('/assets/img/image-20220314114818669.png')">


**检查数据卷**
<img :src="$withBase('/assets/img/image-20220314115227178.png')">


即使我们删除了容器，但linux主机里的数据库数据是不会丢失的

### 具名和匿名挂载

```bash
#匿名挂载
-v 容器内路径
docker run -d -P --name nginx01 -v /etc/nginx nginx

#
[root@iZwz969hnvixoyx8d2dmbvZ /]# docker volume ls
DRIVER    VOLUME NAME
local     0eed2b9a20bc6f563ba48fc3c3232bd9d7e880b95d35606210a7d6fda99e9d61
local     5966a314e9efb870a167e90efed05a46a88eb605631bfbe16b529ff4b9013d4c
local     997655acb92b36d6bfc52fda25cbeddbd26fa40320bd4c10d16775de874cc171

#这就是匿名挂载（-v时只写了容器内的路径没写容器外的路径）

#具名挂载
[root@iZwz969hnvixoyx8d2dmbvZ ~]# docker run -d -P --name nginx02 -v juming-nginx:/etc/nginx nginx
de9c2d68f40a17d1f7e03bc9715ee712311a035f58c63bf44c82e1adc22cd9ba
[root@iZwz969hnvixoyx8d2dmbvZ ~]# docker volume ls
DRIVER    VOLUME NAME
local     0eed2b9a20bc6f563ba48fc3c3232bd9d7e880b95d35606210a7d6fda99e9d61
local     5966a314e9efb870a167e90efed05a46a88eb605631bfbe16b529ff4b9013d4c
local     997655acb92b36d6bfc52fda25cbeddbd26fa40320bd4c10d16775de874cc171
local     juming-nginx 				#可以通过volume查找到他，这就是具名挂载
[root@iZwz969hnvixoyx8d2dmbvZ ~]# 
#查看下这个卷
docker volume inspect juming-nginx

```
<img :src="$withBase('/assets/img/image-20220314225234189.png')">




所有的docker容器内的卷，没有指定目录的情况下都是挂载到

 **/var/lib/docker/volumes/xxxx/_data**

通过具名挂载我们可以很方便的找到卷，大多数情况下使用 **具名挂载**



```bash
#区分是具名挂载还是匿名挂载 还是指定路径挂载
-v 容器内路径 		#匿名挂载
-v 卷名：容器内路径	  #具名挂载
-v /宿主机路径：：容器内路径 #指定路径挂载
```

扩展：

```bash
#通过-v 容器内路径
#ro 只读，这个路径只可以从外部(宿主机)改变不可以从内部（容器）改变
#rw 可读可写，默认为rw
docker run -d -P --name nginx02 -v juming-nginx:/etc/nginx:ro nginx
docker run -d -P --name nginx02 -v juming-nginx:/etc/nginx:rw nginx

```



# DockerFile

## DockerFile介绍

dockerfile是用来构建docker镜像的文件！命令参数脚本！

构建步骤：

1. 编写一个dockerfile文件
2. docker build构建成为一个镜像
3. docker run 运行镜像
4. docker push 发布镜像（DockerHub 阿里云镜像仓库）



## DockerFiel构建

基础知识：

1. 每个保留关键字（指令）都必须是大写字母
2. 执行从上到下
3. #表示注释
4. 每个指令都会创建提交一个新的镜像层，并提交
<img :src="$withBase('/assets/img/image-20220315103651946.png')">






dockerfile是面向开发的，我们以后要发布项目，做镜像、就需要编写dockerfile文件，这个文件十分简单

,Docker逐渐成为企业交付的标准。



DockerFile：构建文件，定义了一切步骤，源代码

DockerImages：通过DockerFile构建生成的镜像，最终发布和运行的产品，

Docker容器：容器就是则镜像运行起来提供服务的



## DockerFile指令

```shell
FROM					#基础镜像
MAINTAINER				#镜像是谁写的，姓名+邮箱
RUN	 					#镜像构建的时候需要运行的命令
ADD						#步骤，tomcat镜像，这个tomcat压缩包，添加一层一层的。
WORKDIR					#镜像工作的目录
VOLUME					#挂载的目录
EXPOST					#暴露端口配置 同-p
CMD						#指定这个容器启动的时候要运行的命令，只有最后一个要生效，可被替代
ENTRYPOINT				#指定这个容器启动的时候要运行的命令，可以追加命令
ONBUILD					#当构建一个被继承DockerFile这个时候就会运行ONBUILD指令
COPY					#类似ADD，将文件拷贝到镜像中
ENV						#构建的时候设置环境变量！

```


<img :src="$withBase('/assets/img/image-20220315104159987.png')">


## 实战测试

### centos镜像实战

DockerHub中99%的镜像都是从这个基础镜像FROM scratch,然后配置需要的软件和配置和进行搭建。
<img :src="$withBase('/assets/img/image-20220315105401371.png')">




1. 编写DockerFile文件

```bash
#文件名为 mydockerfile-centos
FROM centos:7  #此处指定版本为7，因为Linux主机版本为7，若不指定版本默认镜像为最新版8，版本不同会导致出错，这里引发了一个错误见下方
MAINTAINER hao<1348114176@qq.com>

ENV MYPATH /usr/local
WORKDIR $MYPATH

RUN yum -y install vim
RUN yum -y install net-tools

EXPOSE 80

CMD echo $MYPATH
CMD echo "---end---"
CMD /bin/bash


#构建镜像

```

FROM centos 出错！！
<img :src="$withBase('/assets/img/image-20220315112147079.png')">


因为最新版本为centos8，centOS8于2021年12月31日停止了源的服务，而现在时间是2022年3月15日，所以之前的方法都不行的原因所在（本质是源的问题）。

FROM centos:7 成功！！！
<img :src="$withBase('/assets/img/image-20220315112335211.png')">


```shell
#测试运行
[root@iZwz969hnvixoyx8d2dmbvZ dockerfile]# docker images
REPOSITORY            TAG       IMAGE ID       CREATED          SIZE
mycentos              0.1       2891257d1cde   5 minutes ago    580MB
<none>                <none>    f08f776e9668   19 minutes ago   231MB
tomcat02              1.0       db6145d646d5   25 hours ago     684MB
nginx                 latest    605c77e624dd   2 months ago     141MB
tomcat                9.0       b8e65a4d736d   2 months ago     680MB
tomcat                latest    fb5657adc892   2 months ago     680MB
hello-world           latest    feb5d9fea6a5   5 months ago     13.3kB
centos                7         eeb6ee3f44bd   6 months ago     204MB
centos                latest    5d0da3dc9764   6 months ago     231MB
mysql                 8.0.23    cbe8815cbea8   11 months ago    546MB
portainer/portainer   latest    580c0e4e98b0   12 months ago    79.1MB
[root@iZwz969hnvixoyx8d2dmbvZ dockerfile]# docker run -it mycentos:0.1
[root@0b2cd2633cab local]# pwd 
/usr/local #之前WORKDIR设定的目录
#测试ifconfig，默认的镜像构建的容器是没有ifconfig和vim功能的，我们构建自己的镜像时是安装了的
[root@0b2cd2633cab local]# ifconfig
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.17.0.3  netmask 255.255.0.0  broadcast 172.17.255.255
        ether 02:42:ac:11:00:03  txqueuelen 0  (Ethernet)
        RX packets 8  bytes 656 (656.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

[root@0b2cd2633cab local]# vim test
#运行成功1
```
<img :src="$withBase('/assets/img/image-20220315113037436.png')">




```bash
#docker history 镜像ID     输出镜像搭建过程
[root@iZwz969hnvixoyx8d2dmbvZ ~]# docker history 2891257d1cde
IMAGE          CREATED          CREATED BY                                      SIZE      COMMENT
2891257d1cde   13 minutes ago   /bin/sh -c #(nop)  CMD ["/bin/sh" "-c" "/bin…   0B        
8272ba9441a8   13 minutes ago   /bin/sh -c #(nop)  CMD ["/bin/sh" "-c" "echo…   0B        
24584037dba9   13 minutes ago   /bin/sh -c #(nop)  CMD ["/bin/sh" "-c" "echo…   0B        
871186befa3d   13 minutes ago   /bin/sh -c #(nop)  EXPOSE 80                    0B        
13f432ce7268   13 minutes ago   /bin/sh -c yum -y install net-tools             161MB     
bd88f9a2f5f1   13 minutes ago   /bin/sh -c yum -y install vim                   216MB     
6ad6fbf6191f   13 minutes ago   /bin/sh -c #(nop) WORKDIR /usr/local            0B        
5856a352f808   13 minutes ago   /bin/sh -c #(nop)  ENV MYPATH=/usr/local        0B        
24d720c02af1   13 minutes ago   /bin/sh -c #(nop)  MAINTAINER hao<1348114176…   0B        
eeb6ee3f44bd   6 months ago     /bin/sh -c #(nop)  CMD ["/bin/bash"]            0B        
<missing>      6 months ago     /bin/sh -c #(nop)  LABEL org.label-schema.sc…   0B        
<missing>      6 months ago     /bin/sh -c #(nop) ADD file:b3ebbe8bd304723d4…   204MB     

```

#### CMD和ENTRYPOINT的区别

> CMD和ENTRYPOINT的区别

```bash
CMD						#指定这个容器启动的时候要运行的命令，只有最后一个要生效，可被替代
ENTRYPOINT				#指定这个容器启动的时候要运行的命令，可以追加命令
```

**CMD测试**

```bash
#编写dockerfile文件
[root@iZwz969hnvixoyx8d2dmbvZ dockerfile]# vim dockerfile-cmd-test
#文件内容
FROM centos:7
CMD ["ls","-a"]


#注意最后的点必须加，表示当前目录，不然报错
[root@iZwz969hnvixoyx8d2dmbvZ dockerfile]# docker build -f dockerfile-cmd-test -t cmdtest .
Sending build context to Docker daemon  3.072kB
Step 1/2 : FROM centos:7
 ---> eeb6ee3f44bd
Step 2/2 : CMD ["ls","-a"]
 ---> Running in 4f4eaf35086b
Removing intermediate container 4f4eaf35086b
 ---> 274d4c241ffa
Successfully built 274d4c241ffa
Successfully tagged cmdtest:latest

#run测试
[root@iZwz969hnvixoyx8d2dmbvZ dockerfile]# docker run 274d4c241ffa
.
..
.dockerenv
anaconda-post.log
bin
dev
etc
home
lib
lib64
media
mnt
opt
proc
root
run
sbin
srv
sys
tmp
usr
var
[root@iZwz969hnvixoyx8d2dmbvZ dockerfile]# cat dockerfile-cmd-test 
FROM centos:7
CMD ["ls","-a"]

#想追加一个命令 -l
[root@iZwz969hnvixoyx8d2dmbvZ dockerfile]# docker run 274d4c241ffa -l
docker: Error response from daemon: failed to create shim: OCI runtime create failed: container_linux.go:380: starting container process caused: exec: "-l": executable file not found in $PATH: unknown.

#cmd的情况下 -l 替换了["ls","-a"]命令，-l不是命令所以报错
```

**ENTRYPOINT**

```bash
[root@iZwz969hnvixoyx8d2dmbvZ dockerfile]# vim dockerfile-cmd-entrypoint

#文件内容为
FROM centos:7
ENTRYPOINT ["ls","-a"]

[root@iZwz969hnvixoyx8d2dmbvZ dockerfile]# docker build -f dockerfile-cmd-entrypoint -t entorypoint-test .
Sending build context to Docker daemon  4.096kB
Step 1/2 : FROM centos:7
 ---> eeb6ee3f44bd
Step 2/2 : ENTRYPOINT ["ls","-a"]
 ---> Running in 56c5e82f0898
Removing intermediate container 56c5e82f0898
 ---> 1eb6f0d21623
Successfully built 1eb6f0d21623
Successfully tagged entorypoint-test:latest
[root@iZwz969hnvixoyx8d2dmbvZ dockerfile]# docker run 1eb6f0d21623
.
..
.dockerenv
anaconda-post.log
bin
dev
etc
home
lib
lib64
media
mnt
opt
proc
root
run
sbin
srv
sys
tmp
usr
var
[root@iZwz969hnvixoyx8d2dmbvZ dockerfile]# docker run 1eb6f0d21623 -l
total 64
drwxr-xr-x  1 root root  4096 Mar 15 10:55 .
drwxr-xr-x  1 root root  4096 Mar 15 10:55 ..
-rwxr-xr-x  1 root root     0 Mar 15 10:55 .dockerenv
-rw-r--r--  1 root root 12114 Nov 13  2020 anaconda-post.log
lrwxrwxrwx  1 root root     7 Nov 13  2020 bin -> usr/bin
drwxr-xr-x  5 root root   340 Mar 15 10:55 dev
drwxr-xr-x  1 root root  4096 Mar 15 10:55 etc
drwxr-xr-x  2 root root  4096 Apr 11  2018 home
lrwxrwxrwx  1 root root     7 Nov 13  2020 lib -> usr/lib
lrwxrwxrwx  1 root root     9 Nov 13  2020 lib64 -> usr/lib64
drwxr-xr-x  2 root root  4096 Apr 11  2018 media
drwxr-xr-x  2 root root  4096 Apr 11  2018 mnt
drwxr-xr-x  2 root root  4096 Apr 11  2018 opt
dr-xr-xr-x 94 root root     0 Mar 15 10:55 proc
dr-xr-x---  2 root root  4096 Nov 13  2020 root
drwxr-xr-x 11 root root  4096 Nov 13  2020 run
lrwxrwxrwx  1 root root     8 Nov 13  2020 sbin -> usr/sbin
drwxr-xr-x  2 root root  4096 Apr 11  2018 srv
dr-xr-xr-x 13 root root     0 Mar 15 10:55 sys
drwxrwxrwt  7 root root  4096 Nov 13  2020 tmp
drwxr-xr-x 13 root root  4096 Nov 13  2020 usr
drwxr-xr-x 18 root root  4096 Nov 13  2020 var
#发现不同CMD的话 后面加上-l是报错的，但ENTRYPOINT是成功运行的，没有替换["ls","-a"]是加在他们后面
```

### TomCat镜像实战

1. 准备镜像文件tomcat压缩包，jdk压缩包

   ps：目录为 /home/tomcat
<img :src="$withBase('/assets/img/image-20220315191118988.png')">

​	2.建立 Dockerfile文件（统一命名，官方命名），build会自动寻找这个文件，不需要-f指定了

```shell
FROM centos:7
MAINTAINER hao<1348114176@qq.com>

COPY readme.txt /usr/local/readme.txt

ADD jdk-8u321-linux-x64.tar.gz /usr/local/

ADD apache-tomcat-9.0.37.tar.gz /usr/local/

RUN yum -y install vim

ENV MYPATH /usr/local

WORKDIR $MYPATH

ENV JAVA_HOME /usr/local/jdk1.8.0_321
ENV CLASSPATH $JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
ENV CATALINA_HOME /usr/local/apache-tomcat-9.0.37
ENV CATALINA_BASH /usr/local/apache-tomcat-9.0.37
ENV PATH $PATH:$JAVA_HOME/bin:$CATALINA_HOME/lib:$CATALINA_HOM/bin

EXPOSE 8080

CMD /usr/local/apache-tomcat-9.0.37/bin/startup.sh && tail -F /url/local/apache-tomcat-9.0.37/bin/logs/catalina.out
```

​	3.构建镜像

```shell
#docker build -t diytomcat .
```
<img :src="$withBase('/assets/img/image-20220315195223385.png')">


…………
<img :src="$withBase('/assets/img/image-20220315195255547.png')">

docker images 检查镜像
<img :src="$withBase('/assets/img/image-20220315195324655.png')">



​	4.启动镜像

```shell
[root@iZwz969hnvixoyx8d2dmbvZ tomcat]# docker run -d -p 9090:8080 --name diytomcat -v /home/tomcat/test:/usr/local/apache-tomcat-9.0.37/webapps/test -v //home/tomcat/tomcatlogs/:/usr/local/apache-tomcat-9.0.37/logs diytomcat
```

​	5.进入容器检查（选做）

```bash
[root@iZwz969hnvixoyx8d2dmbvZ tomcat]# docker exec -it 41d97238bbef /bin/bash
```
<img :src="$withBase('/assets/img/image-20220315195529854.png')">

6.访问

**确保阿里云安全组有9090！**
<img :src="$withBase('/assets/img/image-20220315195620014.png')">

访问成功！



然后在/home/tomcat/test/WEB-INF（主机挂载目录）

创建web.xml

```bash
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                         http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0"
         metadata-complete="true">


</web-app>
```

在他的上级目录也就是/home/tomcat/test

创建index.jsp

现在更改test目录下的index.jsp

```html
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<body>
<h2>Hello Hao</h2>
 <% System.out.println("------my web logs--------"); %>
</body>
</html>
```

然后访问公网：120.76.216.233:9090/test
<img :src="$withBase('/assets/img/image-20220315204850208.png')">

访问成功！





# Docker网络

## 部署SpringBoot微服务

1. 新建一个SpringBoot项目
2. 打包项目
<img :src="$withBase('/assets/img/image-20220316092108040.png')">

直到打包成功才行！

打包成功后jar包在target里
<img :src="$withBase('/assets/img/image-20220316093351217.png')">

3.本地测试

资源文件夹打开：
<img :src="$withBase('/assets/img/image-20220316093422945.png')">

在目录输入cmd后
<img :src="$withBase('/assets/img/image-20220316093447297.png')">

启动后能在本地访问成功： localhost：8080
<img :src="$withBase('/assets/img/image-20220316093515633.png')">

**这就说明jar包没有问题！**

4.上传Linux

编写Dockerfile

```bash
FROM java:8

COPY *.jar /app.jar

CMD ["--server.port=8080"]

EXPOSE 8080

ENTRYPOINT ["java","-jar","/app.jar"]
```

将jar包和Dockerfile传到Linux
<img :src="$withBase('/assets/img/image-20220316094903932.png')">

**DockerBuild**

```bash
# -t 后不能接大写！
[root@iZwz969hnvixoyx8d2dmbvZ idea]# docker build -t BSX .
invalid argument "BSX" for "-t, --tag" flag: invalid reference format: repository name must be lowercase
See 'docker build --help'.
[root@iZwz969hnvixoyx8d2dmbvZ idea]# docker build -t bsx .
Sending build context to Docker daemon  45.55MB
Step 1/5 : FROM java:8
8: Pulling from library/java
5040bd298390: Pull complete 
fce5728aad85: Pull complete 
76610ec20bf5: Pull complete 
60170fec2151: Pull complete 
e98f73de8f0d: Pull complete 
11f7af24ed9c: Pull complete 
49e2d6393f32: Pull complete 
bb9cdec9c7f3: Pull complete 
Digest: sha256:c1ff613e8ba25833d2e1940da0940c3824f03f802c449f3d1815a66b7f8c0e9d
Status: Downloaded newer image for java:8
 ---> d23bdf5b1b1b
Step 2/5 : COPY *.jar /app.jar
 ---> 1adc653324ce
Step 3/5 : CMD ["--server.port=8080"]
 ---> Running in 842c8b238db1
Removing intermediate container 842c8b238db1
 ---> b1fe0983847d
Step 4/5 : EXPOSE 8080
 ---> Running in 5382739949f6
Removing intermediate container 5382739949f6
 ---> a86f92f4a3ee
Step 5/5 : ENTRYPOINT ["java","-jar","/app.jar"]
 ---> Running in f9edd95498e2
Removing intermediate container f9edd95498e2
 ---> 04eb9d067806
Successfully built 04eb9d067806
Successfully tagged bsx:latest
[root@iZwz969hnvixoyx8d2dmbvZ idea]# clear
#确认镜像已创建
[root@iZwz969hnvixoyx8d2dmbvZ idea]# docker images
REPOSITORY            TAG       IMAGE ID       CREATED         SIZE
bsx                   latest    04eb9d067806   7 seconds ago   689MB
diytomcat             latest    3afd77cd8311   14 hours ago    800MB
entorypoint-test      latest    1eb6f0d21623   15 hours ago    204MB
cmdtest               latest    274d4c241ffa   15 hours ago    204MB
mycentos              0.1       2891257d1cde   22 hours ago    580MB
tomcat02              1.0       db6145d646d5   47 hours ago    684MB
nginx                 latest    605c77e624dd   2 months ago    141MB
tomcat                9.0       b8e65a4d736d   2 months ago    680MB
tomcat                latest    fb5657adc892   2 months ago    680MB
hello-world           latest    feb5d9fea6a5   5 months ago    13.3kB
centos                7         eeb6ee3f44bd   6 months ago    204MB
centos                latest    5d0da3dc9764   6 months ago    231MB
mysql                 8.0.23    cbe8815cbea8   11 months ago   546MB
portainer/portainer   latest    580c0e4e98b0   12 months ago   79.1MB
java                  8         d23bdf5b1b1b   5 years ago     643MB
[root@iZwz969hnvixoyx8d2dmbvZ idea]# docker run -d -p 8080:8080 --name bsx02 bsx

```

连接MySQL

1.安装Mysql

参考本文档
<img :src="$withBase('/assets/img/image-20220316152209893.png')">

只要能用navicat连通就说明没问题了。

**但重点是！！！**

打包的Jar包里，mysql连接配置
<img :src="$withBase('/assets/img/image-20220316152345105.png')">

账号密码必须是与docker里的mysql账号密码相同，其次

localhost应该改成公网ip地址，端口3310是启动mysql时mysql的对外映射端口。
<img :src="$withBase('/assets/img/image-20220316152517736.png')">
