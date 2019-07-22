<template>
  <div>
    <el-form class="filter" :model="filter" :inline="true">
      <el-form-item>
        <el-button type="primary" @click="add">创建</el-button>
      </el-form-item>
    </el-form>

    <my-table :tableData="lists" :columns="columns"></my-table>

    <el-dialog :title="formTitle" :visible.sync="formShow">
      <el-form :label-position="formTitle" label-width="80px" v-model="form">
        <my-select
          :select.sync="form.type"
          label="版本类型"
          :prop="select"
          :options="options"
          :labelWidth="labelWidth"
        ></my-select>
        <el-form-item label="下载链接" :label-width="labelWidth">
          <el-input v-model="form.dowload_url"></el-input>
        </el-form-item>
        <el-form-item label="版本号码" :label-width="labelWidth">
          <el-input v-model="form.edition"></el-input>
        </el-form-item>
        <el-form-item label="版本编号/唯一" :label-width="labelWidth">
          <el-input v-model="form.number"></el-input>
        </el-form-item>
        <el-form-item label="版本更新描述" :label-width="labelWidth">
          <el-input v-model="form.update_info"></el-input>
        </el-form-item>
        <el-form-item label="是否强制更新" prop="updated" :label-width="labelWidth">
          <el-radio-group v-model="form.updated">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="createOrUpdate">编辑</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
  Button,
  MySelect
} from "@/layout/components/index";

import { get, post, deletes, put } from "@/utils/request";

export default {
  name: "index",
  components: {
    MyTable,
    MyDropDown,
    myHeader,
    MyTag,
    MySelect
  },
  mixins: [page],
  data() {
    return {
      filter: {},
      title: "App管理",
      lists: [],
      columns: [
        { prop: "id", label: "ID" },
        { prop: "type", label: "类型" },
        {
          prop: "dowload_url",
          label: "下载地址",
          render: function(h, param) {
            return h(
              "span",
              {
                domProps: {
                  innerHTML: `<a href="${param.row.dowload_url}">${param.row.dowload_url}</a>`
                }
              },
              []
            );
          }
        },
        { prop: "edition", label: "版本号码" },
        { prop: "number", label: "版本编码" },
        {
          prop: "updated",
          label: "是否强制更新",
          render: function(h, param) {
            let html = "";
            if (param.row.updated == "1") {
              html = "是";
            } else {
              html = "否";
            }
            return h(MyTag, {
              props: { size: "small", text: html }
            });
          }
        },
        {
          prop: "",
          label: "操作",
          fixed: "right",
          render: (createElement, param) => {
            const dropDownData = {
              label: "操作",
              items: [
                {
                  label: "修改",
                  func: { func: "edit_", id: param.row.id }
                },
                {
                  label: "删除",
                  func: { func: "del", id: param.row.id }
                }
              ],
              buttons: [
                {
                  size: "small",
                  type: "text",
                  text: "编辑",
                  func: { func: "edit_", id: param.row.id }
                },
                {
                  size: "small",
                  type: "text",
                  text: "删除",
                  func: { func: "del_", id: param.row.id }
                }
              ]
            };
            // 触发MyDropDown的update和del事件
            return createElement(MyDropDown, {
              props: { dropDownData: dropDownData },
              on: {
                update: this.update,
                del: this.del,
                edit_: this.edit_,
                del_: this.del_
              }
            });
          }
        }
      ],
      options: [
        { key: "ios", value: "ios" },
        { key: "android", value: "android" }
      ],
      formTitle: "编辑",
      form: {},
      select: "ios",
      placeholder_: "版本类型",
      formShow: false,
      labelWidth: "100px",
      id: null
    };
  },

  created() {
    this.getList();
  },

  methods: {
    update(id) {
      console.log(id);
    },

    setData(val) {
      val.updated = val.updated == 0 ? "否" : "是";
      this.form = val;
    },

    getData() {
      this.form.updated = this.form.updated == "是" ? 1 : 0;
    },

    del(id) {
      this.$confirm("是否删除,请谨慎", "是否删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let that = this;
        deletes(`/admin/app/${id}`).then(r => {
          if (r.code == 200) {
            this.$success_("删除成功");
            this.getList();
          } else {
            this.$error_(r.msg);
          }
        });
      });
    },

    add() {
      this.id = null;
      this.formShow = true;
      this.formTitle = "创建";
    },

    edit_(id) {
      this.formShow = true;
      this.id = id;
      let that = this;
      get("/admin/app/" + this.id).then(r => {
        if (r.code == 200) {
          this.form = r.data;
          this.setData(r.data);
        } else {
          this.$success_(r.msg);
        }
      });
    },

    createOrUpdate() {
      this.getData();
      let data = this.form;
      if (this.id) {
        let that = this;
        put("/admin/app/" + this.id, data).then(r => {
          if (r.code == 200) {
            this.$success_(r.msg);
            this.formShow = false;
            this.getList();
          } else {
            this.$success_(r.msg);
          }
        });
      } else {
        let that = this;
        post("/admin/app", data).then(r => {
          if (r.code == 200) {
            this.$success_(r.msg);
            this.formShow = false;
            this.getList();
          } else {
            this.$success_(r.msg);
          }
        });
      }
    },

    updateOrCreate() {
      this.postData(id);
    },

    postData(id) {
      let that = this;
      put("/admin/app/" + id).then(r => {
        if (r.code == 200) {
          console.log(r);
        } else {
          this.$success_(r.msg);
        }
      });
    },

    del_() {
      console.log("del_2");
    },

    getList() {
      let that = this;
      get("/admin/app", {
        page: this.current_page,
        pagesize: this.pagesize
      }).then(response => {
        if (response.code == 200) {
          this.lists = response.data.list;
          this.setPage(response.data);
          this.store_loading = false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.filter {
  padding-left: 30px;
  div {
    float: left;
  }
}
.el-radio-group {
  margin-left: 10px;
}
</style>

