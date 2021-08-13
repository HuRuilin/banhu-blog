import {
    ElMessage, ElInput, ElEmpty, ElDropdown, ElDropdownMenu, ElDropdownItem, ElForm, ElFormItem, ElDialog, ElButton, ElUpload,
    ElCard, ElTable,
    ElTableColumn,
    ElDatePicker,
    ElPagination,
    ElPopconfirm,
    ElSelect,
    ElOption,
    ElScrollbar,
    ElMenu,
    ElMenuItem,
    ElRow,
    ElCol,
    ElTabs,
    ElTabPane,
    ElMessageBox,
    ElRadio,
    ElCascader
} from 'element-plus';
export default function (app) {
    if (!app) return
    const ElComponents = [
        ElEmpty,
        ElInput,
        ElDropdown,
        ElDropdownMenu,
        ElDropdownItem,
        ElForm,
        ElFormItem,
        ElDialog,
        ElButton,
        ElUpload,
        ElCard,
        ElTable,
        ElTableColumn,
        ElDatePicker,
        ElPagination,
        ElPopconfirm,
        ElSelect,
        ElOption,
        ElScrollbar,
        ElMenu,
        ElMenuItem,
        ElRow,
        ElCol,
        ElTabs,
        ElTabPane,
        ElRadio,
        ElCascader
    ]
    const ElPlugins = [ElMessage, ElMessageBox]
    ElComponents.forEach(component => {
        app.component(component.name, component)
    })

    ElPlugins.forEach(plugin => {
        app.use(plugin)
    })
}