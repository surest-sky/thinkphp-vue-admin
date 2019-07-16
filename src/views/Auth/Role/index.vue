<template>
  <div>
    <my-header :title="title"></my-header>

    <div class="filter-tool">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-input v-model="filter.rolename" placeholder="角色名称"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search" @click="search" @keyup.enter="search">搜索</el-button>
        </el-col>
      </el-row>
      <br>
      <el-row>
<el-col :span="4">
          <el-button type="primary" icon="el-icon-search" @click="add" @keyup.enter="add">添加角色</el-button>
        </el-col>
      </el-row>
        
    </div>

    <my-table :loading="loading" :tableData="list" :columns="columns"></my-table>

    <el-dialog :title="this.form.submit" :visible.sync="formShow">
      <my-create :form="form" @updated="updated" :tree="tree" @submited="submited"></my-create>
    </el-dialog>
  </div>
</template>
<script>
import {
  myHeader,
  MyTable,
  MyDropDown,
  Pagination,
  MySelect,
  MyDate,
  page,
  MyTag
} from "@/layout/components/index";

import { getList } from "@/api/role";
import { getPermissionAll } from "@/api/permission";
import MyCreate from './form/index'

export default {
  name: "index",
  mixins: [page],
  components: {
    myHeader,
    MyTable,
    MyDropDown,
    MyTag,
    MySelect,
    MyDate,
    MyCreate
  },
  data() {
    return {
      title: "角色管理",
      tableData: [],
      loading: false,
      form: {},
      formTitle: "创建权限",
      formShow: false,
      list: [],
      tree: [],
      filter: {},
      columns: [
        { prop: "id", label: "ID" },
        {
          prop: "name",
          label: "角色名称",
          render: (h, param) => {
            return h(MyTag, {
              props: { effect: "dark", text: param.row.name }
            });
          }
        },
        { prop: "remark", label: "备注" },
        {
          prop: "",
          fixed: "right",
          label: "操作",
          width: 150,
          render: (h, param) => {
            let dropDownData = {
              label: "更多",
              items: []
            };

            dropDownData.items = dropDownData.items.concat([
              { label: "删除", func: { func: "delete", id: param.row.id } },
              { label: "编辑", func: { func: "edit", id: param.row.id } }
            ]);

            // 触发MyDropDown的update和del事件
            return h(MyDropDown, {
              props: { dropDownData: dropDownData },
              on: {
                edit: this.edit,
                delete: this.delete,
              }
            });
          }
        }
      ]
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 获取列表数据
    getList(param = {}) {
      this.loading = true;
      let page = {
        page: this.current_page,
        pagesize: this.pagesize
      };

      let data = Object.assign({}, param, page);
      var that = this;
      // 获取数据
      getList(data).then(r => {
        if (r.code == 200) {
          that.list = r.data.roles;
          that.setPage(r.data);
        }
      });
    },

    add() {
        this.getTree()
        this.formShow = true
        this.form = {}
    },

    edit(id) {
        this.getTree()
        this.form = Object.assign({}, {
            id: id,
            submit: "编辑"
        })

        this.formShow = true
        this.formTitle = "编辑权限"
    },


    delete(id) {

    },

    updated(bol) {},

    /**
     * 获取权限节点
     */
    getTree() {
      var that = this;
      getPermissionAll().then(function(r) {
        if (r.code == 200) {
          that.tree = r.data;
        }
      });
    },

    submited() {
        this.formShow = false
        this.getList()
    }
  }
};
</script>
