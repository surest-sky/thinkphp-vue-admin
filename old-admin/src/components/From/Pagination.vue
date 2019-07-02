<template>
    <div class="pagination">
        <el-pagination
          v-show="show"
          class="page"
          @current-change="changeCurrentPage"
          @size-change="changeSizePage"
          :current-page="current_page"
          :page-sizes="pageSizes"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    data() {
        return {
            show: false
        }
    },
    props: {
      pagesize: {
          type: [Number, String],
          default: '100'
      },
      current_page: {
          type: [Number, String],
          default: 1
      },
      pageSizes: {
          type: Array,
          default: [5, 10, 15, 20]
      },
      total: {
          type: [Number, String],
          default: 100
      },
      layout: {
        type: String,
        default: 'sizes, prev, pager, next, jumper'
      }
    },
    methods: {
        // 监听分页地址改变
        changeCurrentPage(page) {
            this.$emit('changeCurrentPage', page) // 触发父组件的更新列表事件
        },
        // 
        changeSizePage(pagesize) {
            this.$emit('changeSizePage', pagesize) // 触发父组件的更新列表事件
        },
    },
    created() {
        if(this.total > 5) {
            this.$nextTick(() => {
                this.show = true
            })
        }
    }
}
</script>
<style>
    .pagination {
        margin-top: 20px;
    }
</style>

