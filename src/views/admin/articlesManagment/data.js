import dayjs from 'dayjs'
/**********************************文章列表配置*************************************/
export function initSearchConfig({ categories } = {}) {
    return {
        itemsMap: {
            keyWord: {
                label: '关键字',
                type: 'input',
                placeholder: '搜索标题、内容',
            },
            categoryId: {
                label: "类别",
                type: "select",
                placeholder: "请选择文章类别",
                options: categories || []
            }
        }
    }
}
export function initTableConfig() {
    return {
        columns: [
            {
                label: '标题',
                prop: 'title',
                align: 'left',
            },
            {
                label: '发布状态',
                prop: 'status',
                isSlot: true,
            },
            { label: '摘要', prop: 'summary', align: 'left' },
            {
                label: "类别",
                prop: "category.name",
            },
            {
                label: '作者',
                prop: 'author',
            },

            {
                label: '实际浏览量',
                prop: 'pv',
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
        btnsGroup: (rowInfo) => {
            const statusBtnsMap = new Map([
                [
                    1,
                    {
                        label: '撤销发布',
                        type: 'withdraw',
                    },
                ],
                [
                    2,
                    {
                        label: '发布',
                        type: 'publish',
                    },
                ],
            ])
            return [
                {
                    label: '编辑',
                    type: 'edit',
                },
                statusBtnsMap.get(rowInfo.status),
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
