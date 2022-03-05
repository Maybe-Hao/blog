
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
        welcome: '欢迎来到可爱的小李浩的站点嗷~~',
        home: '心里的花，我想要带你回家。',
        theme: '好吧，希望你能喜欢我的小李浩哟。',
        close: '你知道我喜欢吃什么吗？痴痴地望着你。'
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
            showText: "(/≧▽≦/)咦！又好了！",
            hideIcon: "/failure.ico",
            hideText: "(●—●)喔哟，崩溃啦！",
            recoverTime: 2000
         }
}