export const page = {
    data() {
        return {
            pagesize: 10,
            pageSizes: [5, 10, 15, 20],
            total: 100,
            current_page: 1,
        }
    },
    methods: {
        // 设置分页
        setPage(data) {
            this.current_page = data.page;
            this.total = data.total;
            this.pagesize = parseInt(data.pagesize);
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
        }
    }
}