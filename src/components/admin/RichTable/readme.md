### rich-table 组件使用示例
> rich-table 组件由el-form、el-table、el-pagination 等element-ui 组件二次封装而成，可通过配置的方式实现管理端列表页面快速搭建。页面可包含列表搜索、列表展示、列表分页等功能。
#### 1. ***searchConfig*** 【搜索功能】配置示例：
---
> js表单配置

```javascript
const searchConfig = {
    // 是否显示搜索栏
    show:true,
    // 执行搜索操作前执行
    beforeSearch(params){
        return params
    },
    // 自定义操作按钮名
    customBtnName: '添加',
    // 是否显示导出按钮
    canExport:false,
    // 搜索表单配置
    itemsMap:{
        // 字段名
        [propName]: {
                // 表单类型 input | select 等
                type: 'input',
                // 表单label
                label: '标签名称'
        },
        [propName]: {
                type: 'select',
                lable: '状态',
                options: [
                    {
                        label: '全部',
                        value: ''
                    }
                ]
            }
    }
}

```
> template 使用示例
``` html
<rich-table :search-config="search-config"></rich-table>
```

#### 2. ***tableConfig*** 【表格】配置示例：
> tableConfig 支持el-table 所有属性，新增columns 列配置属性
---
``` javascript
const tableConfig={
    // 表格列属性配置
    columns:[
    {
        // 列label
        label: '标签名称',
        // 列对应字段
        prop: 'labelName',
        // 是否以插槽的形式，呈现自定义列内容(插槽名为prop)
        isSlot:true,
        // 是否以插槽的形式，呈现自定义列表头内容（插槽名为prop+'_header'）
        isSlotHeader:true,
        // 是否对单元格内容进行脱敏 可选值为 phone | email 
        encrypt:"phone",
        // 单元格内容格式化
         formatter: function(row) {
            const {status} = row;
            return status ? '是' : '否';
        }
    },
    {
        label: '标签主体',
        prop: 'subjectClassName'
    },
   
    ],
    // 行按钮配置 Function | Array
    btnsGroup:[
            {
            // 按钮显示label
                label: '启用',
                // 按钮对应的key
                type: 'start'
            },
            // type为delete 时，预定义了再确认流程
            {
                label: '删除',
                type: 'delete'
            }
        ]
    }
```
**注意**: 当列属性配置了sortable:'custom'时,接口采用 { [prop] :true}形式发起请求,true表示升序,false 表示降序
> template 使用示例
``` html
<rich-table :table-config="tableConfig"></rich-table>
```

#### 3. ***paginationConfig*** 【分页组件】配置示例：
> 在 el-pagination 配置属性的基础上,新增show 属性,控制是否显示分页
---
``` javascript
const paginationConfig ={
    // 是否显示
     show: true,
     background: true,
     layout: 'total, prev, pager, next,jumper'
}
``` 
> template 使用示例
``` html
<rich-table :pagination-config="paginationConfig"></rich-table>
```
#### 4. ***asyncData*** 【数据异步请求】配置示例:
---
``` javascript
const asyncData={
    // 异步请求api
    api:api,
    // 是否需要在created中初始化请求
    isInitial:true,
    // api 请求参数
    query:{},
    // api 成功请求后回调函数
    cb(res){
        return res
    }
}
```
> template 使用示例
``` html
<rich-table :async-data="asyncData"></rich-table>
```
5. ***RichTable Events***
---
方法名|说明|参数
--|--|--
tap|点击行按钮事件回调|Function({btn,rowInfo})
export|点击导出按钮事件【searchConfig.canExport=true 时生效】|Function(form)
custom | 点击搜索栏自定义按钮事件【searchConfig.customBtnName有值时有效】|Function(form)

6. ***RichTable Methods***
---
方法名|说明|参数
--|--|--
queryList|刷新列表|支持自定义请求参数（与初始化参数采取合并策略）
getTable |获取table组件示例|-
clearSelection | 清除表格checkbox选中 | -
resetTableData | 前端重置表格现存数据 | - 