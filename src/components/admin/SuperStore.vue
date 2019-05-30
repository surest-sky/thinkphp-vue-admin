<template>
  <div>
    <el-table :data="list" style="width: 100%" v-loading="table_loading">
      <el-table-column
        type="selection"
        width="55"
        :default-sort="{prop: 'name', order: 'descending'}"
      ></el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>

      <el-table-column prop="superstore_name" label="商圈名称"></el-table-column>

      <el-table-column prop="type_" label="商圈类型" sortable>
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.type_ }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="store_num" label="店铺数量"></el-table-column>

      <el-table-column prop="discount_num" label="折扣数量"></el-table-column>

      <el-table-column prop="remark" label="备注"></el-table-column>

      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showDetail(scope.row.id)">详情</el-button>
          <el-button @click="edit(scope.row.id)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

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

    <!-- 商圈详情 -->
    <div class="message">
      <el-dialog title="商圈详情" :visible.sync="simpleVisible" width="30%">
        <div v-loading="simple_loading">
          <ul>
            <li>
              <span class="sueper_name">商圈名称:</span>
              <span class="param">{{simpleData.superstore_name}}</span>
            </li>
            <li>
              <span class="sueper_name">类型:</span>
              <span class="param">{{simpleData.type_}}</span>
            </li>
            <li>
              <span class="sueper_name">人气值:</span>
              <span class="param">{{simpleData.popularity}}</span>
            </li>
            <li>
              <span class="sueper_name">经纬度:</span>
              <span class="param">{{simpleData.longitude}} , {{simpleData.latitude}}</span>
            </li>
            <li @mouseenter="show_(2,$event)" @mouseover="hidden_(2,$event)">
              <span class="sueper_name">营业时间:</span>
              <span class="param">{{simpleData.do_business}}</span>
            </li>
            <li>
              <span class="sueper_name">地址:</span>
              <span class="param">{{simpleData.address}}</span>
            </li>
          </ul>
        </div>
      </el-dialog>
    </div>

    <!-- 编辑商圈 -->
    <el-dialog title="编辑商圈" :visible.sync="editSuperStore">
      <el-form :model="superstore_form" v-loadding="edit_loadding">
        <el-form-item label="商圈名称">
          <el-input v-model="superstore_form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商圈类型">
          <el-select v-model="superstore_form.type" placeholder="请选择商圈类型">
            <!-- <el-option label="区域一" :for="(type, index) in types" :key="index" value="{{type}}"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="人气值">
          <el-input v-model="superstore_form.popularity"></el-input>
        </el-form-item>
        <el-form-item label="经度">
          <el-input v-model="superstore_form.longitude"></el-input>
        </el-form-item>
        <el-form-item label="纬度">
          <el-input v-model="superstore_form.latitude"></el-input>
        </el-form-item>
        <el-form-item label="营业时间">
          <el-input v-model="superstore_form.do_business"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="superstore_form.address"></el-input>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cacheEdit = false">取 消</el-button>
        <el-button type="primary" @click="confirmUpdate = false">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

  <script>
export default {
  name: "SuperStore",
  mounted() {
    this.getList();
  },
  data() {
    return {
      table_loading: true,
      simple_loading: true,
      edit_loadding: true,
      list: [],
      pagesize: 10,
      pageSizes: [5, 10, 15, 20],
      total: 100,
      current_page: 1,
      simpleData: {},
      simpleVisible: false,
      editSuperStore: false,
      superstore_form: {},
      types: []
    };
  },
  watch: {
    current_page: function() {
      console.log("222");
    }
  },
  methods: {
    // 编辑商圈
    edit(id) {
      this.editSuperStore = true
      this.edit_loadding = false
      this.superstore_form = this.simpleData 
      console.log(this.simpleData)
      console.log(this.superstore_form)
    },
    // 获取商圈列表
    getList() {
      this.$get("/api/superstore", {
        page: this.current_page,
        pagesize: this.pagesize
      }).then(response => {
        this.list = response.data.list;
        this.setPage(response.data);
        this.table_loading = false;
      });
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
    },
    // 显示商圈详情
    showDetail(id) {
      this.getSimple(id);
      this.simpleVisible = true;
      this.simple_loading = false;
    },
    // 获取商圈详情
    getSimple(id) {
      this.$get(`/api/superstore/${id}`).then(response => {
        if (response.code == 200) {
          this.simpleData = response.data;
        }
      });
    },
    show_(index, e) {
      console.log(e.target);
    },
    hidden_(index, e) {
      console.log(e);
    },
    // 取消编辑
    cacheEdit() {
      
    },
    // 确认更新
    confirmUpdate() {

    }
  }
};
</script>

<style lang="less">
.pagination {
  margin-top: 20px;
  .page {
    float: right;
    margin-right: 10%;
  }
}

.message {
  ul,
  li {
    padding: 0;
    margin: 0;
    list-style: none;
    color: black;
    font-weight: bold;
  }

  li {
    display: block;
    height: auto;
    overflow: hidden;
    margin-top: 15px;
  }

  .sueper_name,
  .param {
    display: block;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .sueper_name {
    width: 30%;
    text-align: right;
    padding-right: 20px;
    color: #808080;
  }

  .param {
    width: 50%;
    text-align: left;
  }
}
</style>
