// 负责管理所有的自定义指令

export const imageError = {
  // 指令对象 会在当前的dom元素插入到节点之后执行
  // inserted 生命周期钩子
  inserted(dom, options) {
    // options是 指令中的变量的解释 其中有一个属性为value
    // dom 表示当前指令作用的dom 对象
    // dom 认为此时为图片
    dom.scr = dom.src || options.value // 如果没有值则设为默认值
    // 当图片有地址，但加载失败时，会触发onerror事件
    dom.onerror = function() {
      dom.src = options.value
      // 当图片出现异常时 会将指令配置的默认图片设置为该图片的内容
    }
  },
  // 钩子函数 会在当前指令作用的组件 更新数据完毕之后 执行
  // 而inserted 只会执行一次 组件初始化后不会再执行inserted
  // 组件更新后会执行componentUpdated
  componentUpdated(dom, options) {
    dom.scr = dom.src || options.value
  }
}
