<template>
  <div class="app-container">
    <div class="filter-tool">
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="filter.username" placeholder="用户账户"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filter.nickname" placeholder="用户名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filter.email" placeholder="用户邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-plus" @click="add" @keyup.enter="add">添加</el-button>
          <el-button type="primary" icon="el-icon-search" @click="search" @keyup.enter="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="list" border="">
      <el-table-column prop="id" label="Id"></el-table-column>
      <el-table-column prop="username" label="账号"></el-table-column>
      <el-table-column prop="nickname" label="用户名称"></el-table-column>
      <el-table-column label="用户头像">
        <template slot-scope="{ row }">
          <el-image :src="row.avatar" style="width: 50px; height: 50px" :lazy="false" :preview-src-list=[row.avatar]></el-image>
        </template>
      </el-table-column>
      <el-table-column label="用户角色">
        <template slot-scope="{ row }">
          <el-tag v-for="(item, key) in row.to_roles" :key="key" type="success">{{ item.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="用户描述"></el-table-column>
      <el-table-column prop="email" label="用户邮箱"></el-table-column>
      <el-table-column label="操作" width="150px">
        <template slot-scope="{row}">
          <el-button type="success" plain @click="edit(row.id)">编辑</el-button>
          <el-button type="warning" plain @click="delete(row.id)" v-if="!row.is_admin">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="submit" :visible.sync="formShow" width="80%">
      <TForm :form="form" :submit="submit" @submited="submited"></TForm>
    </el-dialog>

    <!-- 分页 -->
    <Pagination
      :pagesize="pagesize"
      :current_page="current_page"
      :pageSizes="pageSizes"
      :total="total"
      @changeCurrentPage="changeCurrentPage"
      @changeSizePage="changeSizePage"
    ></Pagination>
  </div>
</template>

<script>
import { getList, getUser, deleteUser } from "@/api/admin-user";
import TForm from "./form";
import listMix from "@/layout/mixin/listMix"
import page from "@/layout/mixin/page"
import { Imgs } from "@/layout/components/index";

export default {
  name: "index",
  mixins: [page, listMix],
  components: { TForm },
  data() {
    return {
      list: [],
      filter: {},
      title: "管理员管理",
      formShow: false,
      submit: "创建",
      form: {}
    };
  },

  created() {
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

      // 获取数据
      getList(data).then(r => {
        if (r.code == 200) {
          console.log(r.data.data)
          this.list = r.data.data;
          this.setPage(r.data);
        }
      });
    },

    add() {
      this.formShow = true;
      var that = this;
      this.submit = "添加";
      this.form = {}
    },

    /**
     * 编辑
     */
    edit(id) {
      this.formShow = true;
      var that = this;
      this.submit = "更新";
      getUser(id).then(r => {
        if (r.code == 200) {
          let data = r.data;
          that.form = Object.assign(
            {},
            {
              username: data.username,
              nickname: data.nickname,
              description: data.description,
              password: "",
              avatar: data.avatar,
              id: id,
              nickname: data.nickname,
              isNotice: parseInt(data.isNotice),
              email: data.email,
              roles: data.roles
            }
          );

          this.setRoles(data.roles);
        } else {
          this.$error_(r.msg);
        }
      });
    },

    /**
     * 删除
     */
    delete(id) {
      let that = this
      deleteUser(id).then(r => {
        that.$success_(r.msg)
        that.getList()
      });
    },

    search() {
      let data = {
        nickname: this.filter.nickname,
        username: this.filter.username,
        email: this.filter.email
      };
      this.getList(data);
    },

    // 更新完成
    submited(bol = false) {
      this.formShow = bol;
      this.getList();
    },

    // 设置角色
    setRoles(data) {
      let role_ids = [];
      data.forEach(r => {
        role_ids.push(r.id);
      });
      this.form.role_ids = role_ids;
    }
  }
};
</script>

