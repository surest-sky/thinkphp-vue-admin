<template>
  <div>
    <div class="filter-tool">
      <el-form :inline="true">
        <el-form-item>
          <el-input size="medium" v-model="filter.name" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="success"
            icon="el-icon-search"
            @click="getList"
            @keyup.enter="search"
          >搜 索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="add"
            @keyup.enter="add"
          >添加角色</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="list" border>
      <el-table-column prop="id" label="Id"></el-table-column>
      <el-table-column prop="name" label="角色名称">
        <template slot-scope="{row}">
            <el-tag>{{ row.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column label="操作" width="150px">
        <template slot-scope="{row}">
          <el-button type="success" plain @click="edit(row.id)">编辑</el-button>
          <el-button type="warning" plain @click="deleteRole(row.id)" v-if="!row.is_admin">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="this.form.submit" :visible.sync="formShow">
      <Tform :form="form" @updated="updated" :tree="tree" @submited="submited" ref="form"></Tform>
    </el-dialog>
  </div>
</template>
<script>
import { getList, deleteRole } from "@/api/role";
import { getPermissionAll } from "@/api/permission";
import Tform from "./form";
import page from "@/layout/mixin/page"

export default {
  name: "index",
  mixins: [ page ],
  components: {Tform},
  data() {
    return {
      title: "角色管理",
      loading: false,
      form: {},
      formTitle: "创建权限",
      formShow: false,
      list: [],
      tree: [],
      filter: {}
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 获取列表数据
    getList() {
      this.loading = true;
      let page = {
        page: this.current_page,
        pagesize: this.pagesize
      };

      let param = {
        name: this.filter.name
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
      this.getTree();
      this.formShow = true;
      this.form = {};
    },

    edit(id) {
      this.getTree();
      this.form = Object.assign(
        {},
        {
          id: id,
          submit: "更新"
        }
      );

      this.formShow = true;
      this.formTitle = "编辑角色";
    },

    deleteRole(id) {
      let that = this;
      this.$confirm("此角色会被删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteRole(id).then(r => {
          that.$success_("删除成功");
          this.getList();
        });
      });
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
      this.formShow = false;
      this.getList();
    }
  }
};
</script>
