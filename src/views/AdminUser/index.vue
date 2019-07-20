<template>
  <div>

    <div class="filter-tool">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input v-model="filter.username" placeholder="用户账户"></el-input>
        </el-col>
        <el-col :span="4">
          <el-input v-model="filter.nickname" placeholder="用户名称"></el-input>
        </el-col>
        <el-col :span="4">
          <el-input v-model="filter.email" placeholder="用户邮箱"></el-input>
        </el-col>
        <el-col :span="2"></el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search" @click="search" @keyup.enter="search">搜索</el-button>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" icon="el-icon-plus" @click="add" @keyup.enter="add">添加</el-button>
        </el-col>
      </el-row>
    </div>

    <my-table :loading="loading" :tableData="list" :columns="columns"></my-table>

    <el-dialog :title="submit" :visible.sync="formShow">
      <create-table :form="form" :submit="submit" @submited="submited"></create-table>
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
import {
  myHeader,
  MyTable,
  Button,
  Pagination,
  MyDropDown,
  page,
  MyTag,
  table,
  Imgs,
  MyTags
} from "@/layout/components/index";

import { getList, getUser, deleteUser } from "@/api/admin-user";

import createTable from "./form/index";

export default {
  name: "index",
  mixins: [page, table],
  components: {
    myHeader,
    MyTable,
    Button,
    Pagination,
    MyDropDown,
    Imgs,
    createTable,
    MyTags,
    MyTag
  },
  data() {
    return {
      list: [],
      filter: {},
      title: "管理员管理",
      formShow: false,
      submit: "创建",
      form: {},
      columns: [
        { prop: "id", label: "Id", width: "50"},
        { prop: "username", label: "账号" },
        { prop: "user_nickname", label: "用户名称" },
        {
          prop: "user_avatar",
          label: "用户头像",
          render: (h, param) => {
            let avatar = [];
            if (param.row.user_avatar) {
              avatar.push(param.row.user_avatar);
              return h(Imgs, {
                props: {
                  imgs: avatar
                }
              });
            }
          }
        },
        {
          prop: "to_roles",
          label: "用户角色",
          render: (h, param) => {
            let roles = [];
            if (param.row.to_roles) {
              param.row.to_roles.forEach(r => {
                roles.push({
                  text: r.name
                });
              });
              return h(MyTags, {
                props: { tags: roles }
              });
            }
          }
        },

        { prop: "description", label: "用户描述" },
        { prop: "email", label: "用户邮箱" },
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
                delete: this.delete
              }
            });
          }
        },
        { prop: "loginip", label: "最近登录ip", render: (h, param) => {
          return h(MyTag, {
              props: { text: param.row.loginip }
            });
        }},
        { prop: "logintime", label: "最近登录时间", render: (h, param) => {
          return h(MyTag, {
              props: { text: param.row.logintime }
            });
        }},
      ]
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
              user_avatar: data.user_avatar,
              id: id,
              user_nickname: data.user_nickname,
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
