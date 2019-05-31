<template>
  <div class="content">
    <my-header v-bind:title="title"></my-header>

    <div class="filter-tool">
      <el-form :model="store_filter" label-position="left" :inline="true">
        <el-form-item label="当前商圈">
          <el-select v-model="store_filter.superstore_id" filterable>
            <el-option label="全部" :value="0"></el-option>
            <el-option
              v-for="(item, index) in superstores"
              :label="item.superstore_name"
              :key="index"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键字">
          <el-input v-model="store_filter.storename" placeholder="关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>

      <!-- ------表格内容-------- -->
      <el-table :data="stores" style="width:100%" :row-key="tableDatahandle" v-loading="store_loading">
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="store_name" label="店铺名称"></el-table-column>
        <el-table-column prop="house_info" label="楼层-门牌"></el-table-column>
        <el-table-column prop="content" label="折扣内容"></el-table-column>
        <el-table-column prop="start_time" label="开始时间"></el-table-column>
        <el-table-column prop="end_time" label="结束时间"></el-table-column>
        <el-table-column prop="focus_count" label="粉丝数量"></el-table-column>
        <el-table-column prop="status_" label="状态">
          <template slot-scope="scope">
            <p v-html="scope.row.status_"></p>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row.id)" type="text" size="small">编辑</el-button>
            <!-- 弹出更多 -->
            <el-dropdown @command="handTool">
              <el-button type="text" size="small">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  command="lower"
                  :data-value="scope.row.id"
                  v-if="scope.row.status == 1"
                >下架</el-dropdown-item>
                <el-dropdown-item
                  command="onLine"
                  :data-value="scope.row.id"
                  v-if="scope.row.status == 2"
                >上架</el-dropdown-item>
                <el-dropdown-item command="delete" :data-value="scope.row.id">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->

      <div class="pagination">
        <el-pagination
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
    </div>
  </div>
</template>

<script>
import myHeader from "./common/Header";

export default {
  name: "Store",
  components: {
    myHeader
  },
  data() {
    return {
      title: "店铺管理",
      store_filter: {
        superstore_id: 302,
        storename: ""
      },
      store_loading: true,
      stores: [],
      superstores: [],
      pagesize: 10,
      pageSizes: [5, 10, 15, 20],
      total: 100,
      current_page: 1,
      simpleData: {}
    };
  },
  mounted() {
    this.getList();
    this.getSuperStoresList();
  },
  methods: {
    search() {
      console.log(this.store_filter);
    },

    // 获取列表
    getList() {
      var superstore_id = localStorage.getItem("superstore_id");
      if (!superstore_id) {
        superstore_id = 302;
        localStorage.setItem("superstore_id", 302);
      }
      this.store_filter.superstore_id = superstore_id;

      this.$get("/api/store/show/" + superstore_id, {
        page: this.current_page,
        pagesize: this.pagesize
      }).then(response => {
        if (response.code == 200) {
          this.stores = response.data.list;
          this.store_loading = false
          console.log(this.stores);
        }
      });
    },

    getSuperStoresList() {
      this.$get("/api/superstore/all").then(response => {
        if (response.code == 200) {
          this.superstores = response.data;
        }
      });
    },

    // 编辑
    edit(id) {},

    // 下拉菜单选项
    handTool() {},

    // 处理数据
    tableDatahandle(row) {
      if (Object.keys(row) > 0) {
        row.start_time = row.discount.start_time;
        row.end_time = row.discount.end_time;
        row.content = row.discount.content;
      } else {
        row.start_time = "未开始";
        row.end_time = "未开始";
        row.content = "";
      }
    },

    // 设置分页
    setPage(data) {
      console.log(data);
      this.current_page = data.page;
      this.total = data.total;
      this.pagesize = parseInt(data.pagesize);
    },
    // 监听分页地址改变
    changeCurrentPage(page) {
      this.current_page = page;
      this.getList();
    },
    changeSizePage(pagesize) {
      this.pagesize = pagesize;
      this.getList();
    }
  }
};
</script>

<style lang="less">
.filter-tool {
  margin-left: 30px;
  .el-form-item {
    float: left;
  }
  .el-form-item + .el-form-item {
    margin-left: 20px;
  }
}
.pagination {
  margin-top: 20px;
  .page {
    float: right;
    margin-right: 10%;
  }
}

</style>

