<template></template>

<script>
import {
  myHeader,
  MyTable,
  Button,
  Pagination,
  MySelect,
  MyDate,
  page,
  MyTags
} from "@/layout/components/index";

import myCreate from "./form/form";
import { link } from "fs";

export default {
  name: "index",
  mixins: [page],
  components: {
    myHeader,
    MyTable,
    Button,
    MyTags,
    MySelect,
    MyDate,
    myCreate
  },
  data() {
    return {
      list: [],
      column: [
        { prop: "id", label: "ID" },
        {
          prop: "name",
          label: "角色名称",
          render: (h, param) => {
            return h(MyTags, {
              props: { effect: "dark", text: param.row.name }
            });
          }
        },
        {
            prop: "permissions",
            label: "拥有的角色",
            render: (h, param) => {
                let tags = param.row.permissions
            }
        }
      ]
    };
  },
  methods: {}
};
</script>

