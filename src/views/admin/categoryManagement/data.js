import dayjs from 'dayjs'
/**********************************文章列表配置*************************************/
export function initSearchConfig() {
    return {
        itemsMap: {
            keyWord: {
                label: '关键字',
                type: 'input',
                placeholder: '搜索分类名称',
            },
        }
    }
}
export function initTableConfig() {
    return {
        columns: [
            {
                label: '名称',
                prop: 'name',
                align: 'center',
            },
            {
                label: "图标",
                prop: "icon",
                slot: true
            },
            {
                label: '排序码',
                prop: 'sortCode',
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
        btnGroups() {
            return [
                {
                    label: '编辑',
                    type: 'edit',

                },
                {
                    label: '删除',
                    type: 'delete',
                },
            ]
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
