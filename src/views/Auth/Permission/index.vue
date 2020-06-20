<template>
  <div v-loading="show" class="app-container">
    <div class="filter-tool">
      <el-form :inline="true">
        <el-form-item>
          <el-button
            @click="init_permission"
            type="warning"
            icon="el-icon-refresh"
          >初始化权限节点</el-button>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="is_delete" label="1" border>重建节点</el-radio>
          <el-radio v-model="is_delete" label="0" border>更新节点</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button @click="add" type="primary" icon="el-icon-plus">添加权限</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="tree">

    <el-row>
      <el-col :span="4" :sm="10" :xs="10">
      <el-input
        class="filter-input"
        placeholder="输入关键字进行过滤"
        v-model="filterText"
      >
    </el-input>
    </el-col>
    </el-row>

      <el-tree
        :data="list"
        node-key="id"
        :default-expand-all="false"
        :expand-on-click-node="false"
        :render-content="renderContent"
        :props="props"
        :filter-node-method="filterNode"
        ref="tree"
      ></el-tree>
    </div>

    <el-dialog :title="this.form.submit" :visible.sync="formShow">
      <Tform :form="form" @updated="updated"></Tform>
    </el-dialog>
  </div>
</template>

<script>

import { getList, getSimple, delete_, init_permission } from "@/api/permission";
import Tform from "./form";
import page from "@/layout/mixin/page";

export default {
  name: "index",
  mixins: [page],
  components: { Tform },
  data() {
    return {
      list: [],
      props: {
        label: "name"
      },
      is_delete: "0",
      form: {},
      formShow: false,
      title: "权限管理",
      show: false,
      filterText: ""
    };
  },
  mounted() {
    this.getList();
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    edit(data) {
      let that = this;
      getSimple(data.id).then(r => {
        if (r.code == 200) {
          that.formShow = true;
          that.form = r.data;
          that.form.id = data.id;
          that.form.submit = "更新";
          that.setData();
        } else {
          that.$error_(r.msg);
        }
      });
    },

    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },

    setData() {
      this.form.status = this.form.status == 0 ? "禁用" : "启用";
      this.form.hidden = this.form.hidden == 1 ? "是" : "否";
    },

    remove(node, data) {
      this.delete_(data.id);
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span class="buuton-tool">
            <el-button size="mini" type="text" on-click={() => this.edit(data)}>
              编辑
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
          </span>
        </span>
      );
    },

    getList() {
      let that = this;
      getList().then(function(r) {
        that.list = r.data;
      });
    },

    updated(bol = false) {
      this.getList();
      this.setData();
      this.formShow = bol;
    },

    delete_(id) {
      let that = this;
      this.$confirm("此项操作子节点也会被删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delete_(id).then(r => {
          that.$success_("删除成功");
          this.getList();
        });
      });
    },

    add() {
      this.form = Object.assign(
        {},
        {
          submit: "创建"
        }
      );
      this.formShow = true;
    },

    /**
     * 重新生成节点
     */
    init_permission() {
      let that = this;
      this.$confirm("生成节点", "初始化节点", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning"
      })
        .then(() => {
          that.show = true;
          init_permission(that.is_delete).then(r => {
            that.$success_("生成节点成功,请刷新查看");
            that.show = false;
          });
        })
        .catch(() => {});

      this.getList();
    }
  }
};
</script>

<style lang="scss">
.custom-tree-node {
  .buuton-tool {
    margin-left: 20px;
  }
}
.tree {
  margin-top: 20px;    
  margin-left: 30px;

  .filter-input {
    margin-bottom: 10px;
  }
}
</style>
