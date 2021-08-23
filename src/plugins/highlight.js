import Hljs from 'highlight.js'
import 'highlight.js/styles/tomorrow-night.css'

let Highlight = {}

Highlight.install = function (Vue) {
    // 自定义highlight 指令
    const highlightAllCodes = function (el) {
        const blocks = el.querySelectorAll('pre code')
        for (let index = 0; index < blocks.length; index++) {
            Hljs.highlightBlock(blocks[index])
        }
    }
    Vue.directive('highlight', {
        // 当被绑定元素插入到父元素时执行
        inserted(el) {
            highlightAllCodes(el)
        },
        // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
        componentUpdated(el) {
            highlightAllCodes(el)
        }
    })
}

export default Highlight


