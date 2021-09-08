import { reactive, toRefs } from 'vue'
export default function () {
    const data = reactive({
        // 倒计时长
        duration: 60,
        // 按钮显示内容
        content: "发送验证码",
        // 是否禁用
        disabled: false,
    })
    let intervalId =0
    const startCountDown = function () {
        if (data.disabled) return;
        data.disabled = true;
        let count = data.duration;
        data.content = `${count} 后重试`;
        console.log('显示的内容是',data.content)
        intervalId = setInterval(() => {
            count -= 1;
            if (count <= 0) {
                data.content = "重新发送";
                clearInterval(intervalId);
                data.disabled = false;
                return;
            }
            data.content = `${count} s后重试`;
        }, 1000);
        return intervalId
    }
    return {
        ...toRefs(data),
        startCountDown
    }
}