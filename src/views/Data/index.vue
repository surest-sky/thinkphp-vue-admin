<template>
  <div>

    <!-- <div class="filter-tool">
      <el-row style="width: 100%" :gutter=2>
        <el-col :span="5">
          <el-input v-model="filter.nickname" placeholder="用户名称"></el-input>
        </el-col>
        <el-col :span="11">
          <my-date-search :placeholder="`时间查询`" :date.sync="filter.date"></my-date-search>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search" @click="search" @keyup.enter="search">搜索</el-button>
        </el-col>
      </el-row>
    </div> -->

    <my-table :loading="loading" :tableData="list" :columns="columns"></my-table>
  </div>
</template>

<script>
import {
  myHeader,
  MyTable,
  MyDateSearch,
  Button,
  MyDropDown,
  page,
  MyTag,
  table
} from "@/layout/components/index";

import { getList } from "@/api/data";

export default {
  name: "index",
  mixins: [page, table],
  components: {
    myHeader,
    MyTable,
    MyDateSearch,
    MyDropDown
  },
  data() {
    return {
      list: [],
      title: "数据汇总",
      filter: {},
      columns: [
        { prop: "id", label: "ID" },
        { prop: "username", label: "小编" },
        { prop: "yesterday", label: "昨天" },
        { prop: "today", label: "今天" },
        { prop: "lastweek", label: "上周" },
        { prop: "toweek", label: "本周" },
        { prop: "tomonth", label: "本月" }
      ]
    };
  },

  created() {
    this.getList();
    console.log(this.baseURL)
  },

  methods: {
    // 获取列表数据
    getList(param = {}) {
        this.loading = false;
        let page = {
          page: this.current_page,
          pagesize: this.pagesize
        };

        let data = Object.assign({}, param, page)

        // 获取数据
        getList(data).then(r => {
          if (r.code == 200) {
            this.list = r.data;
            this.setPage(r.data);
          }
        });

      this.list = [
        {
          id: "1",
          username: "王王王",
          yesterday: 10,
          today: 10,
          lastweek: 20,
          toweek: 17,
          tomonth: 180
        },
        {
          id: "2",
          username: "王王王2",
          yesterday: 10,
          today: 10,
          lastweek: 20,
          toweek: 17,
          tomonth: 180
        },
        {
          id: "3",
          username: "王王王3",
          yesterday: 10,
          today: 10,
          lastweek: 20,
          toweek: 17,
          tomonth: 180
        }
      ];
    },

    search() {
    console.log(this.filter)
    //   this.getList(data);
    }
  }
};
</script>

<style>
</style>
