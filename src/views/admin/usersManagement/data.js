import dayjs from 'dayjs'
/**********************************文章列表配置*************************************/
export function initSearchConfig() {
    return {
        itemsMap: {
            keyWord: {
                type: 'input',
                placeholder: '邮箱地址',
            },
        }
    }
}
export function initTableConfig() {
    return {
        columns: [
            {
                label: '用户名',
                prop: 'username',
                align: 'center',
            },
            {
                label: "邮箱",
                prop: "email",
            },
            {
                label: "状态",
                prop: "status",
                formatter(row, col, cell) {
                    const namesMap = {
                        '1': "启用中",
                        '0': "禁用中"
                    }
                    return namesMap[cell] || '-'
                }
            },
            {
                label: "头像",
                prop: "avatar",
                slot: true
            },
            {
                label: '创建时间',
                prop: 'createTime',
                formatter(row, col, cell) {
                    return dayjs(cell).format('YYYY-MM-DD HH:mm:ss')
                },
            },
            {
                label: '修改时间',
                prop: 'updateTime',
                formatter(row, col, cell) {
                    return cell ? dayjs(cell).format('YYYY-MM-DD HH:mm:ss') : '-'
                },
            },
        ],
        btnGroups: (rowInfo) => {
            const { status } = rowInfo
            if (status === 1) {
                return [{
                    label: '禁用',
                    type: 'forbidden',
                },
                ]
            } else if (status === 0) {
                return [
                    {
                        label: '启用',
                        type: 'start',
                    },
                ]
            }
        }
    }
}

/**********************************文章保存配置*************************************/

export const commonRules = {
    title: [
        {
            required: true,
            message: '请输入文章标题',
            trigger: 'blur',
        },
    ],
    basePv: [{ pattern: /^[0-9]*$/, message: '只能填写数字' }],
}

export const personalRules = {
    local: {
        mdContent: [
            {
                required: true,
                message: '请输入文章内容',
                trigger: 'blur',
            },
        ],
    },
    external: {
        url: [
            {
                required: true,
                message: '请输入外链地址',
                trigger: 'blur',
            },
        ],
    },
}
