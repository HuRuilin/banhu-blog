import { reactive,toRefs} from 'vue'
export default function(){
    const state=reactive({
        form: {
            // 邮箱号
            email: "",
            // 验证码
            code: "",
            // 密码
            password: "",
        },
        rules: {
            email: [
                {
                    required: true,
                    trigger: "blur",
                    message: "请填写邮箱地址",
                },
                {
                    pattern:
                        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                    trigger: "blur",
                    message: "邮箱格式不正确",
                },
            ],
            code: [
                {
                    required: true,
                    trigger: "blur",
                    message: "请填写验证码",
                },
                {
                    pattern: /^[A-Za-z0-9]{4}$/,
                    trigger: "blur",
                    message: "验证码格式不正确",
                },
            ],
        },
    })
    return {
        ...toRefs(state)
    }
}