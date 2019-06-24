<template>
  <div>
    <my-header :title="title"></my-header>
    <my-table :tableData="tableData" :columns="columns" :totalPage="totalPage"></my-table>
  </div>
</template>

<script>
import MyTable from "@/components/From/Table";
import myHeader from "./common/Header";
import { page } from "@/mixins/page";
import MyDropDown from "@/components/From/MyDropDown";

export default {
  name: "App",
  components: {
    MyTable,
    MyDropDown,
    myHeader
  },
  mixins: [page],
  data() {
    return {
      title: "App管理",
      tableData: [
        {
          id: "2",
          title: "aaa",
          create_name: "vvv",
          item_name: "vvv",
          create_time: "vvv",
          weight: "vvv",
          isoriginal: "vvv"
        }
      ],
      totalPage: 20,
      columns: [
        { prop: "title", label: "标题" },
        { prop: "create_name", label: "发布人" },
        { prop: "item_name", label: "栏目" },
        { prop: "create_time", label: "创建时间" },
        { prop: "weight", label: "权重" },
        {
          prop: "isoriginal",
          label: "原创",
          render: function(h, param) {
            let html = "";
            if (param.row.isoriginal == "201") {
              html = "原创";
            } else {
              html = "非原创";
            }
            return html;
          }
        },
        {
          prop: "",
          label: "操作",
          render: (createElement, param) => {
            const dropDownData = {
              label: "操作",
              items: [
                {
                  label: "修改",
                  func: { func: "update", id: param.row.id }
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
      ]
    };
  },

  methods: {
    update(id) {
      console.log(id);
    },

    del() {},
    edit_() {
      console.log("edit_2");
    },
    del_() {
      console.log("del_2");
    }
  }
};
</script>
