<template>
  <div>
    <my-header :title="title"></my-header>
    
    <div class="filter">

      <el-button @click="add" type="primary">添加权限</el-button>
    </div>

    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px; margin-left: 30px"
      row-key="id"
      border
      default-expand-all
      v-loading="loading"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="路由名称"></el-table-column>
      <el-table-column prop="rule" label="路由地址"></el-table-column>
      <el-table-column prop="method" label="请求方法">
        <template slot-scope="scope">
          <my-tag :text="v" v-for="(v, k) in scope.row.method" :key="k"></my-tag>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间"></el-table-column>
      <el-table-column prop="status" label="状态">
       <template slot-scope="scope">
          <my-tag v-if="scope.row.hidden == 0" :text="`启用`"></my-tag>
          <my-tag v-if="scope.row.hidden == 1" :text="`禁用`"></my-tag>
        </template>
      </el-table-column>
      <el-table-column prop="hidden" label="是否隐藏(菜单)">
        <template slot-scope="scope">
          <my-tag v-if="scope.row.hidden == 1" :text="`是`"></my-tag>
          <my-tag v-if="scope.row.hidden == 0" :text="`否`"></my-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button type="primary">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="edit(scope.row.id)">编辑</el-dropdown-item>
              <el-dropdown-item @click.native="delete_(scope.row.id)">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注信息"></el-table-column>
    </el-table>


    <el-dialog :title="formTitle" :visible.sync="formShow">
        <my-create :form="form"></my-create>
    </el-dialog>
  </div>
</template>

<script>
import {
  myHeader,
  MyTable,
  Button,
  Pagination,
  MySelect,
  MyDate,
  page,
  MyTag
} from "@/layout/components/index";

import { getList , getSimple} from "@/api/permission"
import myCreate from "./form/form"

export default {
  name: "index",
  mixins: [page],
  components: {
    myHeader,
    MyTable,
    Button,
    MyTag,
    MySelect,
    MyDate,
    myCreate
  },
  data() {
    return {
      title: "权限管理",
      tableData: [], 
      loading: false,
      form: {},
      formTitle: "创建权限",
      formShow: false
    };
  },
  mounted() {
    this.getList()
  },

  methods: {
    getList() {
      let that = this
      getList().then(function(r) {
        that.tableData = r.data
        that.loading = false
      })
    },
    tableRowClassName(row) {
      if(!row.row.children) {
        return 'success-row'
      }
    },
    setData() {
      this.form.status = this.form.status == 0 ? "禁用" : "启用"
      this.form.hidden = this.form.hidden == 1 ? "是" : "否"

      console.log(this.form)
    },
    edit(id) {
      let that = this
      getSimple(id).then(r => {
        if(r.code == 200) {
          that.formShow = true
          that.form = r.data
          that.form.id = id
          that.setData()
        }else{
          that.$error_(r.msg)
        }
      })
    },

    delete_(id) {

    },
    
    add() {
      this.formShow = true
    },
  }
};
</script>

<style>
  .el-table .success-row {
    background: #f0f9eb;
  }
  .filter {
    margin-bottom: 20px;
  }
</style>
