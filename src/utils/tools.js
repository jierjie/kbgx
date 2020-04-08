let u = navigator.userAgent

let tools = {
  // 防止页面滚动
  pageNoScroll: () => {
    document.querySelector('html').style.overflow = 'hidden'
    // document
    //   .querySelector('html')
    //   .style
    //   .height = '100%'
    document.querySelector('body').style.overflow = 'hidden'
    // document
    //   .querySelector('body')
    //   .style
    //   .height = '100%'
  },
  // 解除防止页面滚动
  pageScroll: () => {
    document.querySelector('html').style.overflow = 'auto'
    // document
    //   .querySelector('html')
    //   .style
    //   .height = 'auto'
    document.querySelector('body').style.overflow = 'auto'
    // document
    //   .querySelector('body')
    //   .style
    //   .height = 'auto'
  },
  //获取url参数
  getQS: name => {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
  }
}

export default tools
