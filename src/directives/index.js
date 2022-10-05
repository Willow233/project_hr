// 负责管理所有的自定义指令

export const imageError = {
  // 指令对象 会在当前的dom元素插入到节点之后执行
  // inserted 生命周期钩子
  inserted(dom, options) {
    // options是 指令中的变量的解释 其中有一个属性为value
    // dom 表示当前指令作用的dom 对象
    // dom 认为此时为图片
    // 当图片有地址，但加载失败时，会触发onerror事件
    dom.onerror = function() {
      dom.src = dom.src || options.value
      // 当图片出现异常时 会将指令配置的默认图片设置为该图片的内容
    }
  }
}
