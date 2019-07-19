<template>
  <div>

    <div class="filter-form">
      <el-row>
        <el-col :span="10">
          <el-form ref="filter" label-position="left">
            <el-form-item label="商圈名称:" label-width="80px">
              <el-col :span="12">
                <el-input v-model="filter.search_superstore_name"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="图片审核筛选">
              <el-select v-model="filter.is_new_banner">
                <el-option label="全部" value=""></el-option>
                <el-option label="有图片待审核" value="1"></el-option>
                <el-option label="无图片待审核" value="0"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="summit_search">查找</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="10">
          <span>
            商圈总数:
            <font class="font-title">{{ superstore_total }}</font> |
          </span>
          <span>
            店铺总数:
            <font class="font-title">{{ store_total }}</font> |
          </span>
          <span>
            当前在线折扣总数:
            <font class="font-title">{{ discount_total }}</font>
          </span>
          <br />
          <span>
            昨日上线折扣总数:
            <font class="font-title">{{ yesterdat_discount }}</font> |
          </span>
          <span>
            今日上线折扣总数:
            <font class="font-title">{{ today_discount }}</font>
          </span>
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

    <my-table
      :tableData="list"
      :columns="columns"
      :loading="table_loading"
      @handleSelectionChange="handleSelectionChange"
    ></my-table>
    <!-- 分页 -->
    <Pagination
      :pagesize="pagesize"
      :current_page="current_page"
      :pageSizes="pageSizes"
      :total="total"
      @changeCurrentPage="changeCurrentPage"
      @changeSizePage="changeSizePage"
    ></Pagination>

    <!-- 商圈详情 -->
    <div class="message">
      <el-dialog title="商圈详情" :visible.sync="simpleVisible" width="30%">
        <div v-loading="simple_loading">
          <ul>
            <li>
              <span class="sueper_name">商圈名称:</span>
              <span class="param" :title="simpleData.superstore_name">{{simpleData.superstore_name}}</span>
            </li>
            <li>
              <span class="sueper_name">类型:</span>
              <span class="param" :title="simpleData.type_">{{simpleData.type_}}</span>
            </li>
            <li>
              <span class="sueper_name">人气值:</span>
              <span class="param" :title="simpleData.popularity">{{simpleData.popularity}}</span>
            </li>
            <li>
              <span class="sueper_name">经纬度:</span>
              <span
                class="param"
                :title="simpleData.longitude"
              >{{simpleData.longitude}} , {{simpleData.latitude}}</span>
            </li>
            <li @mouseenter="show_(2,$event)" @mouseover="hidden_(2,$event)">
              <span class="sueper_name">营业时间:</span>
              <span class="param" :title="simpleData.do_business">{{simpleData.do_business}}</span>
            </li>
            <li>
              <span class="sueper_name">地址:</span>
              <span class="param" :title="simpleData.address">{{simpleData.address}}</span>
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
              <el-option value="上架" label="上架">上架</el-option>
              <el-option value="下架" label="下架">下架</el-option>
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
        <el-button
          type="primary"
          v-if="inputSuperStoreTitle == '编辑商圈'"
          @click="confirmUpdate('superstore_form')"
        >更新</el-button>
        <el-button
          type="primary"
          v-if="inputSuperStoreTitle == '添加商圈'"
          @click="confirmCreate('superstore_form')"
        >创建</el-button>
      </div>
    </el-dialog>

    <el-dialog title="地图" :visible.sync="amap" class="amap-body">
      <div class="dialog-content amap-content">
        <el-amap vid="amapDemo" :center="center" :zoom="zoom" class="amap-demo" :events="events"></el-amap>
        <span style="color: red;">
          {{superstore_form.longitude}} - {{superstore_form.latitude}}
          <br />
          {{superstore_form.address}}
        </span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="amap = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="商圈图片审核" :visible.sync="audit_on" width="70%">
      <audit-table :audit_on="audit_on"></audit-table>
    </el-dialog>
  </div>
</template>

<script>
import {
  myHeader,
  Pagination,
  MyTable,
  MyDropDown,
  MyTag,
  page,
  MySelect
} from "@/layout/components/index";

import AuditTable from "./Audit";

export default {
  name: "index",
  mounted() {
    this.getList();
    this.getDataInfo();
  },
  components: {
    myHeader,
    MyTag,
    MyTable,
    MyDropDown,
    Pagination,
    AuditTable,
    MySelect
  },
  mixins: [page],
  data() {
    var self = this;
    return {
      id: 0,
      title: "商圈详情",
      inputSuperStoreTitle: "编辑商圈",
      table_loading: true,
      simple_loading: true,
      edit_loadding: true,
      list: [],
      simpleData: {},
      simpleVisible: false,
      inputSuperStore: false,
      amap: false,
      visible: false,
      superstore_form: {},
      superstore_total: 0,
      store_total: 0,
      discount_total: 0,
      today_discount: 0,
      yesterdat_discount: 0,
      // 搜索表单的数据
      filter: {},
      columns: [
        { prop: "id", label: "ID", width: "55" },
        { prop: "superstore_name", label: "商圈名称" },
        {
          prop: "type_",
          label: "商圈类型",
          render: (h, params) => {
            return h(MyTag, {
              props: {
                size: "medium",
                text: params.row.type_
              }
            });
          }
        },
        { prop: "store_num", label: "店铺数量", width: "105" },
        { prop: "discount_num", label: "折扣数量", width: "135" },
        { prop: "remark", label: "备注" },
        {
          prop: "",
          fixed: "right",
          label: "操作",
          width: 150,
          render: (h, param) => {
            let dropDownData = {
              label: "更多"
            };

            if (param.row.status == 1) {
              dropDownData.items = [
                { label: "下架", func: { func: "lower", id: param.row.id } }
              ];
            } else {
              dropDownData.items = [
                { label: "上架", func: { func: "online", id: param.row.id } }
              ];
            }

            dropDownData.items = dropDownData.items.concat([
              { label: "删除", func: { func: "delete", id: param.row.id } },
              { label: "审核", func: { func: "audit", id: param.row.id } },
              { label: "编辑", func: { func: "edit", id: param.row.id } },
              { label: "详情", func: { func: "showDetail", id: param.row.id } },
              {
                label: "所有店铺",
                func: { func: "go_store", id: param.row.id }
              }
            ]);

            // 触发MyDropDown的update和del事件
            return h(MyDropDown, {
              props: { dropDownData: dropDownData },
              on: {
                lower: this.lower,
                delete: this.delete,
                online: this.online,
                edit: this.edit,
                go_store: this.go_store,
                showDetail: this.showDetail,
                audit: this.audit
              }
            });
          }
        }
      ],
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
      lat: 0,
      audit_on: false
    };
  },

  methods: {
    // 审核
    audit(id) {
      this.$store.dispatch("superstore/setStoreId", id);
      this.audit_on = true;
    },

    // 编辑商圈
    edit(id) {
      this.inputSuperStoreTitle = "编辑商圈";
      this.inputSuperStore = true;
      this.getSimple(id);
      this.edit_loadding = false;
    },
    // 获取商圈列表
    getList() {
      let params = {
          keyword: this.filter.search_superstore_name,
          is_new_banner: this.filter.is_new_banner == true ? 1 : 0
      }

      params = Object.assign({}, params, {
        page: this.current_page,
        pagesize: this.pagesize
      })

      this.$get("/api/superstore", params).then(response => {
        this.list = response.data.list;
        this.setPage(response.data);
        this.table_loading = false;
      });
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
          if (this.superstore_form.status == 1) {
            this.superstore_form.status = "上架";
          } else {
            this.superstore_form.status = "下架";
          }
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

    // 地图选址
    onAddress() {
      this.amap = true;
      if (this.superstore_form.longitude) {
        this.center = [
          this.superstore_form.longitude,
          this.superstore_form.latitude
        ];
      }
    },

    // 下架
    lower(id) {
      this.$post(`/api/superstore/lower/${id}`).then(r => {
        if (r.code == 200) {
          this.$success_("下架成功");
          this.getList();
        } else {
          this.$error_(r.msg);
        }
      });
    },

    // 上架
    online(id) {
      console.log(id);
      this.$post(`/api/superstore/online/${id}`).then(r => {
        if (r.code == 200) {
          this.$success_("上架成功");
          this.getList();
        } else {
          this.$error_(r.msg);
        }
      });
    },

    // 删除
    delete(id) {
      this.$confirm("是否删除当前商圈,请谨慎", "是否删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$deletes(`/api/superstore/${id}`).then(r => {
          if (r.code == 200) {
            this.$success_("删除成功");
            this.getList();
          } else {
            this.$error_(r.msg);
          }
        });
      });
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
      this.getList();
    },

    // 添加商圈
    add_superstore() {
      this.edit_loadding = false;

      this.$nextTick(function() {
        this.superstore_form = Object.assign(
          {},
          {
            type: 1,
            status: "上架",
            popularity: 5
          }
        );

        this.inputSuperStore = true
        this.inputSuperStoreTitle = "添加商圈"
        this.edit_loadding = false;
      });
    },

    // 创建商圈
    confirmCreate(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          console.log(this.superstore_form);
          this.post_superstore(this.superstore_form);
        } else {
          return false;
        }
      });
    },

    // 确认更新
    confirmUpdate(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
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
        status: data.status == "上架" ? 1 : 2
      };

      this.$put(`/api/superstore/` + this.id, postData).then(response => {
        if (response.code == 200) {
          this.edit_loadding = false;
          this.$success_("更新成功");
          this.getList();
        } else {
          this.edit_loadding = false;
          this.$error_(response.msg);
        }
      });
    },

    // 创建商圈
    post_superstore(data) {
      var postData = {
        superstore_name: data.superstore_name,
        longitude: data.longitude,
        latitude: data.latitude,
        type: data.type,
        popularity: data.popularity,
        do_business: data.do_business,
        address: data.address,
        status: data.status == "上架" ? 1 : 2
      };

      let that = this;

      this.$post("/api/superstore", postData).then(function(response) {
        if (response.code == 200) {
          that.$success_("创建成功");
          that.getList();
          that.edit_loadding = false;
          that.inputSuperStore = false;
        } else {
          this.edit_loadding = false;
          that.inputSuperStore = false;
          that.$error_(response.msg);
        }
      });
    },

    // 上架
    filter_online() {
      this.getSelected();
      let ids = this.multipleSelectionIds.join(",");
      this.$post(`/api/superstore/batch_online?ids=${ids}`).then(r => {
        if (r.code == 200) {
          this.$success_("上架成功");
          this.getList();
        } else {
          this.$error_(r.msg);
        }
      });
    },

    // 下架
    filter_lower() {
      this.getSelected();
      let ids = this.multipleSelectionIds.join(",");
      this.$post(`/api/superstore/batch_lower?ids=${ids}`).then(r => {
        if (r.code == 200) {
          this.$success_("下架成功");
          this.getList();
        } else {
          this.$error_(r.msg);
        }
      });
    },

    // 批量删除
    filter_delete() {
      this.$error_("暂时关闭批量删除接口");
    },

    // 跳转到店铺
    go_store(id) {
      localStorage.setItem("superstore_id", id);
      this.$router.push({ path: "/store" });
    },

    // 获取一些数据信息
    getDataInfo() {
      this.$get("/api/gather").then(r => {
        if (r.code == 200) {
          this.superstore_total = r.data.superstore_total;
          this.store_total = r.data.store_total;
          this.discount_total = r.data.discount_total;
          this.today_discount = r.data.today_discount;
          this.yesterdat_discount = r.data.yesterdat_discount;
        }
      });
    }
  }
};
</script>

<style lang="scss">
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
    margin-left: 0;
    .el-button {
      float: left;
    }
  }
}
.font-title {
  color: red;
}
</style>
