<template>
  <div>
    
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
      lazy
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="路由名称"></el-table-column>
      <el-table-column prop="rule" label="路由地址"></el-table-column>
      <el-table-column prop="method" label="请求方法">
        <template slot-scope="scope">
          <my-tag :text="v" v-for="(v, k) in scope.row.method" :key="k" style="margin-right: 5px"></my-tag>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间"></el-table-column>
      <el-table-column prop="status" label="状态">
       <template slot-scope="scope">
          <my-tag v-if="scope.row.status == 1" :text="`启用`"></my-tag>
          <my-tag v-if="scope.row.status == 0" :text="`禁用`"></my-tag>
        </template>
      </el-table-column>
      <el-table-column prop="hidden" label="是否隐藏(菜单)">
        <template slot-scope="scope">
          <my-tag v-if="scope.row.hidden == 1" :text="`是`"></my-tag>
          <my-tag v-if="scope.row.hidden == 0" :text="`否`"></my-tag>
        </template>
      </el-table-column>
      <el-table-column prop="icon" label="图标"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-dropdown  trigger="click">
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


    <el-dialog :title="`编辑`" :visible.sync="formShow">
        <my-create :form="form" @updated="updated"></my-create>
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

import { getList , getSimple, delete_} from "@/api/permission"
import myCreate from "./form/form"
import { link } from 'fs';

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
      formShow: false,
      list: [],
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
        that.setList()
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
          that.form.submit = "更新"
          that.setData()
        }else{
          that.$error_(r.msg)
        }
      })
    },

    setList() {
      let list = JSON.parse(JSON.stringify(this.tableData))

      // -------- 删除其中的 chilren 属性
      let new_data = []
      this.tableData.forEach((r, index) => {
        if(r.children) {
          delete r.children
          r = Object.assign({}, {
            hasChildren: true
          }, r)
        }
        new_data.push(r)
      })
      
      this.list = list
      this.tableData = new_data
    },

    delete_(id) {
      let that = this 
      console.log(id)

      this.$confirm('此项操作子节点也会被删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delete_(id).then(r => {
            that.$success_("删除成功")
            
            this.getList()
          })
        })
    },
    
    add() {
      this.form = Object.assign({}, {
          submit : "创建"
      })
      this.formShow = true
    },

    updated(bol=false) {
      this.getList()
      this.setData()
      this.formShow = bol
    },
    
    load(tree, treeNode, resolve) {
      console.log(arguments)
      let node = this.list.find((r) => {
        return tree.id == r.id
      })
      console.log(this.tableData)
      resolve(node.children)


    }
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
