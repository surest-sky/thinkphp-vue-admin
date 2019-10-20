<template>
  <div class="content">
    <div class="filter-tool">
      <el-form :model="store_filter" label-position="left" :inline="true">
        <el-row>
          <el-form-item label="当前商圈">
            <el-select @change="changeSuperstore" v-model="store_filter.superstore_id" filterable>
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

          <el-form-item label="折扣状态">
            <el-select v-model="store_filter.type" @change="changeType">
              <el-option
                v-for="(item, index) in search_types"
                :label="item.value"
                :key="index"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="店铺状态">
            <el-select v-model="store_filter.store_status" class="select_">
              <el-option
                v-for="(item, index) in store_statuses"
                :key="index"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="店铺类别">
            <el-select v-model="store_filter.store_type" class="select_">
              <el-option
                v-for="(item, index) in store_types"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item>
            <el-button type="primary" @click="addStore">添加一个店铺</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="batch_del">删除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="default" @click="batch_lower">下架</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="default" @click="batch_online">上架</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <my-table
      :tableData="stores"
      :columns="columns"
      :loading="store_loading"
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

    <!-- 编辑更新表单 -->
    <div class="store-from">
      <el-dialog :title="storeFromTitle" :visible.sync="storeFromShow">
        <el-form
          label-position="left"
          label-width="80px"
          :model="store"
          :append-to-body="true"
          v-loading="store_from_loading"
        >
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
          <!-- <el-form-item label="折扣d"> -->
          <el-input type="hidden" v-model="store.discount_id"></el-input>
          <!-- </el-form-item> -->
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
              <el-option
                v-for="(item, index) in store_statuses"
                :key="index"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="店铺类别">
            <el-select v-model="store.store_type" class="select_">
              <el-option
                v-for="(item, index) in store_types"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="折扣内容">
            <el-input type="textarea" v-model="store.discount_content"></el-input>
          </el-form-item>

          <el-form-item label="活动时间">
            <el-date-picker
              class="select_"
              v-model="time"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="折扣状态">
            <el-select v-model="store.discount_status" class="select_">
              <el-option
                v-for="(item, index) in discount_statuses"
                :key="index"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="折扣类型">
            <el-select v-model="store.discount_type" class="select_">
              <el-option
                v-for="(item, index) in discount_types"
                :key="index"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="上传店铺图片">
            <upload-simple @setImgSrc="setImgSrc" :imgSrc="store.store_img"></upload-simple>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" v-if="store.id" @click="updateOrCreate(id)">更新</el-button>
            <el-button type="primary" v-if="!store.id" @click="updateOrCreate(null)">新建</el-button>
            <el-button @click="storeFromShow = !storeFromShow">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  myHeader,
  Pagination,
  MyTable,
  MyDropDown,
  page,
  MyTag,
  statusToText,
  storeStatusType,
  UploadSimple,
  jsonRemove
} from "@/layout/components/index";

import {
  getList,
  getSuperstoreAll,
  getStoreType,
  getSroreToSuperstore,
  getStore,
  updateStore,
  createStore
} from "@/api/store.js";

import { get, post, deletes, put } from '@/utils/request'

import moment from "moment";

export default {
  name: "index",
  components: {
    myHeader,
    Pagination,
    MyTable,
    MyDropDown,
    UploadSimple
  },
  mixins: [page],
  data() {
    return {
      title: "店铺管理",
      store_filter: {
        superstore_id: 302,
        storename: "",
        type: "全部"
      },
      // 表格列数据
      columns: [
        { prop: "id", label: "ID", width: "100" },
        { prop: "store_name", label: "店铺名称" },
        { prop: "house_info", label: "楼层-门牌" },
        { prop: "content", label: "折扣内容", width: "330" },
        { prop: "start_time", label: "开始时间" },
        { prop: "end_time", label: "结束时间" },
        { prop: "focus_count", label: "粉丝数量", width: "80" },
        { prop: "superstore_name", label: "商圈名称" },
        {
          prop: "status",
          label: "店铺状态",
          render: function(h, param) {
            let html = statusToText(param.row.status);
            return h("el-tag", html);
          }
        },
        {
          prop: "store_type",
          label: "店铺类型",
          render: function(h, param) {
            let text = param.row.store_type_name
              ? param.row.store_type_name.name
              : "未知";
            return h("el-tag", text);
          }
        },
        {
          prop: "status",
          label: "折扣状态",
          render: function(h, param) {
            let html = "";
            if (param.row.discount) {
              html = statusToText(param.row.discount.status);
            } else {
              html = "已下架";
            }
            return h("el-tag", html);
          }
        },
        {
          prop: "",
          label: "操作",
          fixed: "right",
          width: "200",
          render: (createElement, param) => {
            let dropDownData = {
              label: "操作",
              items: [
                { label: "编辑", func: { func: "edit", id: param.row.id } }
              ]
            };
            let buttons = [
              { label: "编辑", func: { func: "edit", id: param.row.id } }
            ];

            if (param.row.status == 1) {
              dropDownData.items = dropDownData.items.concat([
                { label: "下架", func: { func: "lower", id: param.row.id } },
                { label: "删除", func: { func: "delete", id: param.row.id } }
              ]);
            } else {
              if (param.row.status != "0") {
                dropDownData.items = dropDownData.items.concat([
                  { label: "上架", func: { func: "online", id: param.row.id } },
                  { label: "删除", func: { func: "delete", id: param.row.id } }
                ]);
              } else {
                dropDownData.items = dropDownData.items.concat([
                  { label: "删除", func: { func: "delete", id: param.row.id } }
                ]);
              }
            }

            // 触发MyDropDown的update和del事件
            return createElement(MyDropDown, {
              props: { dropDownData: dropDownData, buttons: buttons },
              on: {
                lower: this.lower,
                delete: this.delete,
                online: this.online,
                edit: this.edit
              }
            });
          }
        }
      ],
      store_loading: true,
      stores: [],
      superstores: [],
      simpleData: {},
      store: {
        superstore_id: 0
      },
      storeFromTitle: "编辑店铺",
      storeFromShow: false,
      store_statuses: [
        {
          key: 0,
          value: "审核中"
        },
        {
          key: 1,
          value: "已上线"
        },
        {
          key: 2,
          value: "已下架"
        },
        {
          key: 3,
          value: "已拒绝"
        }
      ],
      // 1 : 购物 2:美食 3:休闲 4：亲子
      store_types: [],
      discount_statuses: [
        {
          key: 0,
          value: "审核中"
        },
        {
          key: 1,
          value: "已上线"
        },
        {
          key: 2,
          value: "已下架"
        },
        {
          key: 3,
          value: "已拒绝"
        }
      ],
      discount_types: [
        {
          key: 0,
          value: "优惠"
        },
        {
          key: 1,
          value: "特价"
        },
        {
          key: 2,
          value: "新品"
        }
      ],

      pickerOptions: {
        shortcuts: [
          {
            text: "最近三天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 15);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      time: "",
      id: 0,
      search_types: [
        {
          key: 0,
          value: "全部"
        },
        {
          key: 1,
          value: "进行中"
        },
        {
          key: 2,
          value: "已下架/已过期"
        }
      ],
      store_from_loading: true
    };
  },
  watch: {
    stores(val) {
      this.tableDatahandle();
    }
  },
  mounted() {
    this.getSuperStoresList();
    this.set_store_types_();
  },

  methods: {
    setImgSrc(src) {
      this.store.store_img = src;
      console.log(src);
    },

    // 编辑
    edit(id) {
      this.storeFromTitle = "编辑店铺";
      this.getSimpleStore(id);
    },

    // 获取所有的店铺类别
    set_store_types_() {
      let that = this;
      getStoreType().then(r => {
        that.set_store_types(r.data);
      });
    },

    set_store_types(data) {
      this.store_types = data;
      this.getList();
    },

    search() {
      var superstore_id = this.store_filter.superstore_id;

      this.getList();
    },

    // 变更折扣状态
    changeType(status) {
      this.store_loading = true;
      var superstore_id = localStorage.getItem("superstore_id");
      let that = this;
      getSroreToSuperstore(superstore_id, {
        page: that.current_page,
        pagesize: that.pagesize,
        discount_status: status
      }).then(response => {
        that.stores = response.data.list;
        that.setPage(response.data);
        that.store_loading = false;
      });
    },

    // 获取列表
    getList() {
      this.storeFromShow = false;
      this.store = {};
      var superstore_id = localStorage.getItem("superstore_id");
      if (!superstore_id) {
        superstore_id = 0;
        localStorage.setItem("superstore_id", 0);
      }
      this.store_filter.superstore_id = parseInt(superstore_id);
      let params = {
        page: this.current_page,
        pagesize: this.pagesize
      };

      // 查询参数值
      let search_params = {
        discount_status: status,
        keyword: this.store_filter.storename.trim(),
        type: this.store_filter.type,
        store_status: this.store_filter.store_status,
        store_type: this.store_filter.store_type
      };

      params = Object.assign({}, params, search_params);

      let that = this;
      getList(superstore_id, params).then(response => {
        if (response.code == 200) {
          that.stores = response.data.list;
          that.setPage(response.data);
          that.store_loading = false;
        }
      });
    },

    // 处理数据
    tableDatahandle() {
      let data = [];
      this.stores.forEach((item, index) => {
        let simple = item;
        if (simple.discount) {
          simple.start_time = simple.discount.start_time.substr(0, 10);
          simple.end_time = simple.discount.end_time.substr(0, 10);
          simple.content = simple.discount.content;
        } else {
          simple.start_time = "未开始";
          simple.end_time = "未开始";
          simple.content = "";
        }

        data.push(simple);
      });
    },

    getSuperStoresList() {
      let that = this;
      getSuperstoreAll().then(response => {
        if (response.code == 200) {
          that.superstores = response.data;
        }
      });
    },

    // 下拉菜单选项
    handTool(command, component) {
      let id = component.$attrs["data-value"];
      this.store_loading = true;
      switch (command) {
        case "lower":
          this.lower(id);
          break;
        case "online":
          this.online(id);
          break;
        case "delete":
          this.delete(id);
          break;
        default:
          this.$error_("操作非法");
      }
    },

    // 上架
    online(id) {
      let that = this
      post("/admin/store/online/" + id).then(r => {
        if (r.code == 200) {
          that.getList();
          that.$success_("上架成功");
        } else {
          that.$error_(r.msg);
        }

        that.store_loading = false;
      });
    },

    // 下架
    lower(id) {
      let that = this
      deletes("/admin/store/lower/" + id).then(r => {
        if (r.code == 200) {
          that.getList();
          that.$success_("下架成功");
        } else {
          that.$error_(r.msg);
        }
        that.store_loading = false;
      });
    },

    // 删除
    delete(id) {
      let that = this
      this.$confirm("是否删除当前店铺", "是否删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        deletes("/admin/store/" + id).then(r => {
          if (r.code == 200) {
            that.$success_("删除成功");
            that.stores = jsonRemove(that.stores, "id", id);
          } else {
            that.$error_(r.msg);
          }

          that.store_loading = false;
        });
      });
    },

    // 添加一个店铺
    addStore() {
      this.storeFromShow = true;
      this.$nextTick(function() {
        this.store = Object.assign(
          {},
          {
            superstore_id: localStorage.getItem("superstore_id"),
            discount_status: 1,
            discount_type: 1,
            status: 1
          }
        );
      });

      this.id = null;
      this.time = [
        moment()
          .add(0, "days")
          .format(),
        moment()
          .add(15, "days")
          .format()
      ];
      this.storeFromTitle = "创建店铺";

      this.store_from_loading = false;
    },

    // 批量删除
    batch_del() {
      this.getSelected();
      let ids = this.multipleSelectionIds.join(",");

      this.$deletes(`/admin/store/batch_delete?ids=${ids}`).then(r => {
        console.log(r);
        if (r.code === 200) {
          this.$success_(`删除成功`);
          this.getList();
        } else {
          this.$success_(`删除失败, ${r.msg}`);
        }
      });
    },

    // 批量上架
    batch_online() {
      this.getSelected();
      let ids = this.multipleSelectionIds.join(",");
      let that = this
        post(`/admin/store/batch_online?ids=${ids}`).then(r => {
          if (r.code === 200) {
            that.$success_(`上架成功`);
            that.getList();
          } else {
            that.$success_(`上架失败, ${r.msg}`);
          }
        });
    },

    // 批量下架
    batch_lower() {
      this.getSelected();
      let ids = this.multipleSelectionIds.join(",");
      let that = this
        post(`/admin/store/batch_lower?ids=${ids}`).then(r => {
        if (r.code === 200) {
          this.$success_(`下架成功`);
          this.getList();
        } else {
          this.$success_(`下架失败, ${r.msg}`);
        }
      });
    },

    // 获取编辑数据
    getSimpleStore(id) {
      this.store_from_loading = true;
      let that = this;
      getStore(id).then(response => {
        that.setData(response.data);
        that.store_from_loading = false;
      });
    },

    // 设置数据
    setData(data) {
      this.$nextTick(() => {
        this.store = {};
        this.store = data;
        this.store.status = parseInt(this.store.status);
        this.id = data.id;

        if (data.discount) {
          this.store = Object.assign({}, this.store, {
            discount_content: data.discount.content,
            discount_status: data.discount.status,
            discount_type: data.discount.type,
            discount_content: data.discount.content,
            discount_id: data.discount.discount_id,
            store_img: data.store_img,
            store_type: data.store_type
          });
          this.time = [data.discount.start_time, data.discount.end_time];
        } else {
          this.store = Object.assign({}, this.store, {
            discount_status: 1,
            discount_type: 0,
            discount_content: "",
            store_img: data.store_img,
            store_type: data.store_type
          });
        }
      });

      this.storeFromShow = true;
    },

    // 变更商圈需要做的事情
    changeSuperstore(id) {
      this.store_loading = true;
      localStorage.setItem("superstore_id", id);
      this.getList();
    },

    // 更新或者创建数据
    updateOrCreate(id) {
      var data = {
        start_time: moment(this.time[0])
          .format()
          .substr(0, 10),
        end_time: moment(this.time[1])
          .format()
          .substr(0, 10),
        content: this.store.discount_content,
        discount_status: this.store.discount_status,
        floor: this.store.floor,
        house_number: this.store.house_number,
        status: this.store.status,
        store_name: this.store.store_name,
        superstore_id: this.store.superstore_id,
        type: this.store.discount_type,
        store_img: this.store.store_img,
        store_type: this.store.store_type
      };

      if (id) {
        if (this.store.discount) {
          data.discount_id = this.store.discount.id;
        } else {
          data.discount_id = 0;
        }

        var that = this;

        updateStore(id, data)
          .then(response => {
            if (response.code == 200) {
              that.$success_("更新成功");
              that.getList();
              that.storeFromShow = false;
            } else {
              that.$error_(response.msg);
            }
          })
          .catch(response => {
            console.log(arguments);
          });
      } else {
        createStore(data)
          .then(response => {
            if (response.code == 200) {
              this.getList();
              this.$success_("创建成功");
            } else {
              this.$error_(response.msg);
            }
          })
          .catch(response => {
            console.log(arguments);
          });
      }
    }
  }
};
</script>

<style lang="scss">
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
  float: left;
  overflow: hidden;
}
</style>

