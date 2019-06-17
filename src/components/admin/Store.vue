<template>
  <div class="content" v-loading.fullscreen.lock="fullscreenLoading">
    <my-header v-bind:title="title"></my-header>

    <div class="filter-tool">
      <el-form :model="store_filter" label-position="left" :inline="true">
        <el-form-item label="当前商圈"
        >
          <el-select 
          @change="changeSuperstore" 
          v-model="store_filter.superstore_id"
          filterable>
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
        <el-form-item label="选择框">
          <el-select v-model="store_filter.type"
          @change="changeType"
          >
             <el-option
              v-for="(item, index) in search_types"
              :label="item.value"
              :key="index"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>

        
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addStore">添加一个店铺</el-button>
        </el-form-item>
      </el-form>

      <!-- ------表格内容-------- -->
      <el-table
        :data="stores"
        style="width:100%"
        :row-key="tableDatahandle"
        v-loading="store_loading"
      >
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="store_name" label="店铺名称"></el-table-column>
        <el-table-column prop="house_info" label="楼层-门牌"></el-table-column>
        <el-table-column prop="content" label="折扣内容" width="680"></el-table-column>
        <el-table-column prop="start_time" label="开始时间"></el-table-column>
        <el-table-column prop="end_time" label="结束时间"></el-table-column>
        <el-table-column prop="focus_count" label="粉丝数量"></el-table-column>
        <el-table-column prop="status_" label="状态">
          <template slot-scope="scope">
            <p v-html="scope.row.status_"></p>
          </template>
        </el-table-column>

        <el-table-column fixed="right" width="200" label="操作">
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
                  command="online"
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

    <!-- 编辑更新表单 -->
    <div class="store-from">
      <el-dialog :title="storeFromTitle" :visible.sync="storeFromShow">
        <el-form label-position="left" label-width="80px" :model="store" v-loading="store_from_loading">
          <el-form-item label="当前商圈">
            <el-select v-model="store.superstore_id" class="select_" filterable>
              <el-option
                v-for="(item, index) in superstores"
                :label="item.superstore_name"
                :key="index"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="店铺名称">
            <el-input type="text" v-model="store.store_name"></el-input>
          </el-form-item>
          <el-form-item label="楼层-门牌">
            <el-col :span="8">
              <el-input v-model="store.floor"></el-input>
            </el-col>
            <el-col :span="3">-</el-col>
            <el-col :span="8">
              <el-input v-model="store.house_number"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="店铺状态">
            <el-select v-model="store.status" class="select_">
              <el-option v-for="(item, index) in store_statuses" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="折扣内容">
            <el-input type="textarea" v-model="store.discount_content"></el-input>
          </el-form-item>

          <el-form-item label="活动时间">
            <el-date-picker class="select_"
            v-model="time"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
          </el-form-item>

          <el-form-item label="折扣状态">
            <el-select v-model="store.discount_status" class="select_">
              <el-option v-for="(item, index) in discount_statuses" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="折扣类型">
            <el-select v-model="store.discount_type" class="select_">
              <el-option v-for="(item, index) in discount_types" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>

         <el-form-item>
          <el-button type="primary" v-if="id" @click="updateOrCreate(id)">更新</el-button>
            <el-button type="primary" v-if="!id" @click="updateOrCreate(null)">新建</el-button>
          <el-button @click="storeFromShow = !storeFromShow">取消</el-button>
        </el-form-item>
        </el-form>

      </el-dialog>
    </div>
  </div>
</template>

<script>
import myHeader from "./common/Header";
import moment from "moment";
import { jsonRemove } from '@/components/unitls'

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
        storename: "",
        type: "全部"
      },
      fullscreenLoading: false,
      store_loading: true,
      stores: [],
      superstores: [],
      pagesize: 10,
      pageSizes: [5, 10, 15, 20],
      total: 100,
      current_page: 1,
      simpleData: {},
      store: {},
      storeFromTitle: "编辑店铺",
      storeFromShow: false,
      store_statuses: [{
          key: 0,
          value: "未上线"
        },
        {
          key: 1,
          value: "已上线"
        },
        {
          key: 2,
          value: "已拒绝"
        }],
      discount_statuses: [{
          key: 0,
          value: "未上线"
        },
        {
          key: 1,
          value: "已上线"
        },
        {
          key: 2,
          value: "已拒绝"
        }],
      discount_types: [{
          key: 0,
          value: "优惠"
        },
        {
          key: 1,
          value: "特价"
        }],

        pickerOptions: {
          shortcuts: [{
            text: '最近三天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() + 3600 * 1000 * 24 * 3);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        time: "",
        id: 0,
        search_types: [{
          key: 0,
          value: "全部"
        },{
          key: 1,
          value: "进行中"
        },{
          key: 2,
          value: "已过期"
        }],
        store_from_loading: true
    };
  },
  mounted() {
    this.getList();
    this.getSuperStoresList();
  },
  
  methods: {
    search() {
      var superstore_id = this.store_filter.superstore_id

      this.$get('/api/store/show/' + superstore_id, {
        page: this.current_page,
        pagesize: this.pagesize,
        discount_status: status,
        keyword: this.store_filter.storename.trim(),
        type: this.store_filter.type,
      }).then((response) => {
        this.stores = response.data.list;
        this.setPage(response.data)
        this.store_loading = false;
        this.$success_("搜索成功")
      })
    },

    // 变更折扣状态
    changeType(status) {
      this.store_loading = true;
      var superstore_id = localStorage.getItem('superstore_id')
      this.$get('/api/store/show/' + superstore_id, {
        page: this.current_page,
        pagesize: this.pagesize,
        discount_status: status
      }).then((response) => {
        this.stores = response.data.list;
        this.setPage(response.data)
        this.store_loading = false;
      })
    },

    // 获取列表
    getList() {
      var superstore_id = localStorage.getItem("superstore_id");
      if (!superstore_id) {
        superstore_id = 305;
        localStorage.setItem("superstore_id", 305);
      }
      this.store_filter.superstore_id = parseInt(superstore_id);

      this.$get("/api/store/show/" + superstore_id, {
        page: this.current_page,
        pagesize: this.pagesize
      }).then(response => {
        if (response.code == 200) {
          this.stores = response.data.list;
          this.setPage(response.data)
          this.store_loading = false;
        }
      });
    },

    // 设置分页
    setPage(data) {
      console.log(data);
      this.current_page = data.page;
      this.total = data.total;
      this.pagesize = parseInt(data.pagesize);
    },

    getSuperStoresList() {
      this.$get("/api/superstore/all").then(response => {
        if (response.code == 200) {
          this.superstores = response.data;
        }
      });
    },
    
    // 下拉菜单选项
    handTool(command, component) {
      let id = component.$attrs['data-value']
      this.store_loading = true;
      switch(command) {
        case "lower" :
          this.lower(id);break
        case "online" :
          this.online(id);break
        case "delete" :
          this.delete(id);break
        default:
          this.$error_('操作非法')
      }
    },

    // 上架
    online(id) {
      this.$post('/api/store/online/'+id).then((r) => {
        if(r.code == 200) {
          this.getList()
          this.$success_('上架成功')
        }else{
          this.$error_(r.msg)
        }

      this.store_loading = false;
      })
    },

    // 下架
    lower(id) {
      this.$deletes('/api/store/lower/'+id).then((r) => {
        if(r.code == 200) {
          this.getList()
          this.$success_('下架成功')
        }else{
          this.$error_(r.msg)
        }

        this.store_loading = false
      })
    },

    // 删除
    delete(id) {
      this.$deletes('/api/store/'+id).then((r) => {
        if(r.code == 200) {
          this.$success_('删除成功')
          this.stores = jsonRemove(this.stores, 'id', id)
          console.log(this.stores)
        }else{
          this.$error_(r.msg)
        }
    
        this.store_loading = false;
      })
    },

    // 处理数据
    tableDatahandle(row) {
      if (row.discount) {
        row.start_time = row.discount.start_time.substr(0,10);
        row.end_time = row.discount.end_time.substr(0,10);
        row.content = row.discount.content;
      } else {
        row.start_time = "未开始";
        row.end_time = "未开始";
        row.content = "";
      }
    },

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
    changeSizePage(pagesize) {
      this.pagesize = pagesize;
      this.getList();
    },
    // 编辑
    edit(id) {
      this.storeFromShow = true
      this.getSimpleStore(id)
    },

    // 添加一个店铺
    addStore() {
        this.storeFromShow = true
        this.store = {}
        this.store.superstore_id = parseInt(localStorage.getItem('superstore_id'))
        this.id = null
        this.time = [
          moment().add(0, 'days').format(),
          moment().add(3, 'days').format()
        ]
        this.store.discount_status = 1
        this.store.discount_type = 1
        this.store.status = 1
        this.storeFromTitle = "创建店铺"

        this.store_from_loading = false
    },

    // 获取编辑数据
    getSimpleStore(id) {
      this.store_from_loading = true
      this.$get('/api/store/' + id)
          .then((response) => {
            this.setData(response.data)
            this.store_from_loading = false
          })
    },

    // 设置数据
    setData(data) {
      this.store = data
      this.store.status = parseInt(this.store.status)
      this.id = data.id

      if(data.discount) {
        this.store.discount_status = data.discount.status,
        this.store.discount_type = data.discount.type,
        this.store.discount_content = data.discount.content
        this.time = [
          data.discount.start_time,
          data.discount.end_time
        ]
      }else{
        this.store.discount_status = 1,
        this.store.discount_type = 0,
        this.store.discount_content = ""
      }
    },
    
    // 变更商圈需要做的事情
    changeSuperstore(id) {
      this.store_loading = true
      localStorage.setItem('superstore_id', id)
      this.getList()
      
    },

    // 更新或者创建数据
    updateOrCreate(id) {
      var data = {
        start_time: moment(this.time[0]).format().substr(0,10),
        end_time:  moment(this.time[1]).format().substr(0,10),
        content: this.store.discount_content,
        discount_status: this.store.discount_status,
        floor: this.store.floor,
        house_number: this.store.house_number,
        status: this.store.status,
        store_name: this.store.store_name,
        superstore_id: this.store.superstore_id,
        type: this.store.discount_type
      }

      if(id) {
        this.$put('/api/store/' + this.id, data)
          .then((response) => {
            if(response.code == 200) {
              this.getList()
              this.$success_('更新成功')
            }else{
              this.$error_(response.msg)
            }
          })
          .catch((response) => {
          })
      }else{
        this.$post('/api/store', data)
          .then((response) => {
            if(response.code == 200) {
              this.getList()
              this.$success_('创建成功')
            }else{
              this.$error_(response.msg)
            }
          })
          .catch((response) => {
          })
      }
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

.select_ {
  float:left; 
  overflow:hidden
}
</style>

