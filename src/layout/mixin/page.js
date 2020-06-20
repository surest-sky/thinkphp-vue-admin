export default {
    data() {
        return {
            pagesize: 10,
            pageSizes: [5, 10, 15, 20, 50, 100],
            total: 100,
            current_page: 1,
            multipleSelection: "",
            multipleSelectionIds: []
        }
    },
    methods: {
        // 设置分页
        setPage(data) {
            this.current_page = data.current_page;
            this.total = data.total;
            this.pagesize = parseInt(data.per_page);
            this.loading = false
        },
        // 监听分页地址改变
        changeCurrentPage(page) {
            this.current_page = page;
            this.getList();
        },
        // 监听分页数量显示
        changeSizePage(pagesize) {
            this.pagesize = pagesize;
            this.getList();
        },

        // 选中的事件
        handleSelectionChange(val) {
            this.multipleSelection = val;
            this.getSelected();
        },
    
        // 获取选中的列表
        getSelected() {
            var data = this.multipleSelection;
            var ids = [];
            data.forEach(row => {
                ids.push(row.id);
            });
            this.multipleSelectionIds = ids;
        }
    }
}