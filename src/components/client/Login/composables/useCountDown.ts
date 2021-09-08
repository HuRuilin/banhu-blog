import { reactive, toRefs } from 'vue'
export default function () {
    let state = reactive({
        // 倒计时长
        duration: 60,
        // 按钮显示内容
        content: "发送验证码",
        // 是否禁用
        disabled: false,
    })
    let intervalId = 0

    // 开启倒计时
    const startCountDown = function () {
        if (state.disabled) return;
        state.disabled = true;
        let count = state.duration;
        state.content = `${count} 后重试`;
        intervalId = setInterval(() => {
            count -= 1;
            if (count <= 0) {
                state.content = "重新发送";
                clearInterval(intervalId);
                state.disabled = false;
                return;
            }
            state.content = `${count} s后重试`;
        }, 1000);
        return intervalId
    }
    // 重置倒计时
    const resetCountDown = function () {
        clearInterval(intervalId);
        intervalId = 0;
        state.duration = 60;
        state.content = "发送验证码";
        state.disabled = false;
    }
    return {
        ...toRefs(state),
        startCountDown,
        resetCountDown
    }
}