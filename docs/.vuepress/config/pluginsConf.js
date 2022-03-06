
module.exports = {
    'meting':
    {
       // metingApi: {},
       meting: {
         auto: 'https://music.163.com/#/playlist?id=2230996180'
       },
       aplayer: {
        fixed: true,
        lrcType: 3
       },
       mobile: {
        cover: true,
        lrc: true
       },
    },
    'go-top': {},
    "cursor-effects": {},
    "@vuepress-reco/vuepress-plugin-kan-ban-niang":
    {
      theme: [
        'haru1', 'haru2'
      ],
      clean: true,
      messages: {
        welcome: '欢迎来到这个没人管的站点嗷~~',
        home: '你随便逛。',
        theme: '这个卡卡果果没啥东西。',
        close: '小橘是真的骚。'
      }
    },
    '@vuepress/pwa':  {
      serviceWorker: true,
      updatePopup: { // 更改刷新内容的弹窗的显示文字
        message: "内容有更新啦~",
        buttonText: "我看看"
      }
    },
    "dynamic-title":
         {
            showIcon: "/favicon.ico",
            showText: "~(˘▾˘~)咦！我又好了！",
            hideIcon: "/failure.ico",
            hideText: "大兄弟快回来我崩了(#ﾟДﾟ)",
            recoverTime: 2000
         }
}