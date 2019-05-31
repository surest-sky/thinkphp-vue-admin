<template>
  <div>
    <my-header v-bind:title="title"></my-header>

    <div class="filter-form">
      <el-row>
        <el-col :span="10">
          <el-form ref="filter" label-position="left">
            <el-form-item label="商圈名称:" label-width="80px">
              <el-col :span="12">
                <el-input v-model="search_superstore_name"></el-input>
              </el-col>
              <el-col class="line" :span="1"></el-col>
              <el-col :span="5">
                <el-button type="primary" @click="summit_search">查找</el-button>
              </el-col>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="filter-tool" :span="10">
          <el-form>
            <el-button type="primary" @click="add_superstore">添加商圈</el-button>
            <el-button @click="filter_lower">下架</el-button>
            <el-button @click="filter_online">上架</el-button>
            <!-- 选择后删除 -->
            <el-button type="primary" @click="filter_delete">删除</el-button>
          </el-form>
        </el-col>
      </el-row>
    </div>

    <el-table
      :data="list"
      style="width: 100%;"
      v-loading="table_loading"
      :row-class-name="tableRowClassName"
    >
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
    <el-dialog :title="inputSuperStoreTitle" :visible.sync="inputSuperStore">
      <el-form
        :model="superstore_form"
        ref="superstore_form"
        v-loading="edit_loadding"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item label="商圈名称" prop="superstore_name">
          <el-input v-model="superstore_form.superstore_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商圈类型" prop="type">
          <el-col :span="26">
            <el-select v-model="superstore_form.type" placeholder="请选择商圈类型">
              <el-option
                v-for="(item, index) in types"
                :key="index"
                :value="item.key"
                :label="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="是否上架" prop="type">
          <el-col :span="26">
            <el-select v-model="superstore_form.status" placeholder="是否上架">
              <el-option value="1" >上架</el-option>
              <el-option value="2">下架</el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="人气值" prop="popularity">
          <el-input v-model="superstore_form.popularity"></el-input>
        </el-form-item>
        <el-form-item label="经纬度" :inline="true" prop="longitude_latitude">
          <el-col :span="8">
            <el-input v-model="superstore_form.longitude"></el-input>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="8">
            <el-input v-model="superstore_form.latitude"></el-input>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="3">
            <el-button type="primary" @click="onAddress">选址</el-button>
          </el-col>
        </el-form-item>

        <el-form-item label="营业时间" prop="do_business">
          <el-input v-model="superstore_form.do_business"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="superstore_form.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cacheEdit = false">取 消</el-button>
        <el-button type="primary" v-if="inputSuperStoreTitle == '更新商圈'"  @click="confirmUpdate('superstore_form')">创建</el-button>
        <el-button type="primary" v-if="inputSuperStoreTitle == '添加商圈'"  @click="confirmCreate('superstore_form')">创建</el-button>
      </div>
    </el-dialog>

    <el-dialog title="地图" :visible.sync="amap" class="amap-body">
      <div class="dialog-content amap-content">
        <el-amap vid="amapDemo" :center="center" :zoom="zoom" class="amap-demo" :events="events"></el-amap>
        <span style="color: red;">
          {{superstore_form.longitude}} - {{superstore_form.latitude}}
          <br>
          {{superstore_form.address}}
        </span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="amap = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import myHeader from "./common/Header";

export default {
  name: "SuperStore",
  mounted() {
    this.getList();
  },
  components: {
    myHeader
  },
  data() {
    var self = this;
    return {
      id: 0,
      title: "商圈详情",
      inputSuperStoreTitle: '编辑商圈',
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
      inputSuperStore: false,
      amap: false,
      visible: false,
      superstore_form: {},
      // 搜索表单的数据
      search_superstore_name: "",
      // 商圈类型  0：未分类 1：大型商城 2：购物中心
      types: [
        {
          key: 0,
          value: "未分类"
        },
        {
          key: 1,
          value: "大型商城"
        },
        {
          key: 2,
          value: "购物中心"
        }
      ],
      rules: {
        superstore_name: [
          {
            required: true,
            message: "请输入商圈名称",
            trigger: "blur"
          },
          {
            mix: 2,
            max: 100,
            message: "输入的字符串在2-100个之间",
            trigger: "blur"
          }
        ],
        longitude_latitude: [
            {
              required: true,
              message: "请输入经纬度",
              trigger: "blur"
            }
        ],
        popularity: [
            {
              required: true,
              message: "人气值",
              trigger: "blur"
            }
        ],
        do_business: [
          {
            required: true,
            message: "请输入营业时间",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "请输入地址",
            trigger: "blur"
          }
        ]
      },
      zoom: 12,
      center: [114.12593, 22.649967],
      events: {
        click(e) {
          let { lng, lat } = e.lnglat;
          self.superstore_form.longitude = lng;
          self.superstore_form.latitude = lat;

          // 这里通过高德 SDK 完成。
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
          });

          var auto = new AMap.Autocomplete({
            input: "amap_search"
          });

          geocoder.getAddress([lng, lat], function(status, result) {
            if (status === "complete" && result.info === "OK") {
              if (result && result.regeocode) {
                self.superstore_form.address =
                  result.regeocode.formattedAddress;
                  self.$nextTick();
              }
            }
          });
        }
      },
      lng: 0,
      lat: 0
    };
  },
  methods: {
    // 编辑商圈
    edit(id) {
      this.inputSuperStoreTitle = "编辑商圈"
      this.inputSuperStore = true;
      this.getSimple(id);
      this.edit_loadding = false;
      console.log(this.simpleData);
      console.log(this.superstore_form);
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
      this.id = id;
      this.$get(`/api/superstore/${id}`).then(response => {
        if (response.code == 200) {
          this.simpleData = response.data;
          this.superstore_form = response.data;
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
    cacheEdit() {},
    // 确认更新
    confirmUpdate(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          console.log(this.superstore_form);
          this.edit_loadding = true;
          this.updateData(this.superstore_form);
        } else {
          return false;
        }
      });
    },

    updateData(data) {
      var postData = {
        superstore_name: data.superstore_name,
        longitude: data.longitude,
        latitude: data.latitude,
        type: data.type,
        popularity: data.popularity,
        do_business: data.do_business,
        address: data.address,
        status: data.status
      };

      this.$put(`/api/superstore/` + this.id, postData).then(response => {
        if (response.code == 200) {
          this.edit_loadding = false;

          this.$success_("更新成功");

          this.getList();
        } else {
          this.$error_(response.msg);
        }
      });
    },

    // 地图选址
    onAddress() {
      this.amap = true;
      if(this.superstore_form.longitude) {
        this.center = [
          this.superstore_form.longitude,
          this.superstore_form.latitude
        ];
      }
    },

    // 更多方法里面的操作
    handTool(command, e) {
      var id = e.$attrs["data-value"];
      if (command == "lower") {
        this.lower(id);
      } else if (command == "delete") {
        this.delete(id);
      } else if (command == "onLine") {
        this.onLine(id);
      }
    },

    // 下架
    lower() {
      this.$success_("下架成功");
    },

    // 上架
    onLine() {
      this.$success_("上架成功");
    },

    // 删除
    delete() {
      this.$error_("删除失败");
    },

    tableRowClassName({ row }) {
      if (row.status == 2) {
        row.remark = "- 已下架";
        return "color-lower";
      }
    },

    // 搜索界面的方法
    // 搜索
    summit_search() {
      // this.$post('')
      this.$success_('搜索成功')
    },

    // 添加商圈
    add_superstore() {
      this.superstore_form = {}
      this.inputSuperStore = true;
      this.inputSuperStoreTitle = "添加商圈"
      this.edit_loadding = false;

      this.superstore_form.type = 1
      this.superstore_form.status = 1
      this.superstore_form.popularity = 5
    },

    // 创建商圈
    confirmCreate() {
       this.$refs[form].validate(valid => {
        if (valid) {
          console.log(this.superstore_form);
          this.edit_loadding = true;
          this.post_superstore(this.superstore_form);
        } else {
          return false;
        }
      });
    },

    post_superstore(data) {
       var postData = {
        superstore_name: data.superstore_name,
        longitude: data.longitude,
        latitude: data.latitude,
        type: data.type,
        popularity: data.popularity,
        do_business: data.do_business,
        address: data.address,
        status: data.status
      };

       this.$post('/api/superstore', postData)
          .then(function(response){
            if(response.status == 1) {
              this.$success_('创建成功')
              this.getList()
            }
          })
    },

    // 上架
    filter_online() {},

    // 下架
    filter_lower() {},

    // 批量删除
    filter_delete() {}
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

.amap-content {
  height: 500px;
  width: 100%;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.color-lower {
  color: #d0d0d0;
}

.filter-form {
  padding-left: 30px;

  .filter-tool {
    .el-button {
      float: left;
    }
  }
}
</style>
