<template>
  <div>

     <div class="filter-tool">
        <el-row :gutter="20">
            <el-col :xs="6" :md="4" :xl="4">
                <el-input size="medium" v-model="filter.nickname" placeholder="用户名称"></el-input>
            </el-col>
            <el-col :xs="6" :md="4" :xl="4">
                <el-input size="medium" v-model="filter.content" placeholder="帖子内容"></el-input>
            </el-col>
            <el-col :xs="12" :md="4" :xl="4">
                <el-select size="medium" v-model="filter.status" placeholder="圈子状态">
                    <el-option
                    v-for="item in statuses"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :md="3" :xl="2">
                <el-button size="medium" type="success" icon="el-icon-search" @click="search" @keyup.enter="search">搜&emsp;&emsp;索</el-button>
            </el-col>
            <el-col :xs="24" :md="3" :xl="2">
                <drop-down :dropDownData="dropDownData" @batch_online="batch_online" @batch_lower="batch_lower" @batch_delete="batch_delete"></drop-down>
            </el-col>
        </el-row>
    </div>

    <my-table :loading="loading" :tableData="list" :columns="columns" @handleSelectionChange="getSelected"></my-table>

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
  MyDateSearch,
  DropDown
} from "@/layout/components/index";

import { 
getList, statusText, getStatus, 
update_status, del, 
batch_lower, batch_online, 
batch_delete} from "@/api/circle";

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
    MyDateSearch,
    DropDown
  },
  data() {
    return {
      list: [],
      title: "圈子管理",
      date: {},
      // 选中的table
      selected: "",
      dropDownData: {
        label: "批量操作",
        items: [
          {
            label: "批量上线",
            func: "batch_online"
          },
          {
            label: "批量屏蔽",
            func: "batch_lower"
          },
          {
            label: "批量删除",
            func: "batch_delete"
          }
        ]
      },
      columns: [
        { prop: "id", label: "ID" },
        {
          prop: "imgs",
          label: "圈子图片",
          width: "300px",
          render: (h, param) => {
            return h(Imgs, {
              props: {
                imgs: param.row.imgs
              }
            });
          }
        },
        { prop: "address", label: "地址" },
        { prop: "content", label: "内容" },
        {
          prop: "status",
          label: "状态",
          render: (h, param) => {
            let text = statusText(param.row.status);
            return h("span", text);
          }
        },
        { prop: "page_view", label: "访问数" },
        { prop: "like_count", label: "喜欢数" },
        { prop: "beautiful_count", label: "美数量" },
        { prop: "handsome_count", label: "帅数量" },
        { prop: "howe_count", label: "豪数量" },
        {
          prop: "create_time",
          label: "创建时间",
          width: 150,
          render: (h, param) => {
            return h(MyTag, {
              props: {
                text: param.row.create_time
              }
            });
          }
        },
        {
          prop: "is_xiaohongshu",
          label: "是否来自小红书",
          render: (h, param) => {
            let is_xiaohongshu = param.row.is_xiaohongshu == 1 ? "是" : "否";
            return h(MyTag, {
              props: {
                text: is_xiaohongshu
              }
            });
          }
        },
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


            if (param.row.status == '0') {
              dropDownData.items = [
                { label: "审核通过", func: { func: "audit", id: param.row.id } }
              ];
            }else if(param.row.status == '1'){
              dropDownData.items = [
                { label: "屏蔽", func: { func: "shield", id: param.row.id } }
              ];
            }else {
                dropDownData.items = [
                { label: "上线", func: { func: "online", id: param.row.id } }
              ];
            }

            dropDownData.items = dropDownData.items.concat([
              { label: "删除", func: { func: "delete", id: param.row.id } },
              // { label: "详情", func: { func: "showDetail", id: param.row.id } }
            ]);

            // 触发MyDropDown的update和del事件
            return h(MyDropDown, {
              props: { dropDownData: dropDownData },
              on: {
                shield: this.shield,
                delete: this.delete,
                showDetail: this.showDetail,
                audit: this.audit,
                online: this.online
              }
            });
          }
        }
      ],
      statuses: [
          {key: 0, value: "全部"},
          {key: 1, value: "已上线"},
          {key: 2, value: "已屏蔽"},
          {key: 3, value: "已删除"},
          {key: 1, value: "待审核"},
      ],
      filter: {
          nickname: "",
          content: "",
          status: "全部"
      }
    };
  },

  created() {
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
            nickname: this.filter.nickname,
            status: getStatus(this.filter.status),
            content: this.filter.content,
      }

      if(this.date) {
        param = Object.assign(param, {
          start_time: this.date.start_time ,
          end_time: this.date.end_time
        })
      }

      console.log(this.date)

      let data = Object.assign({}, param, page)
      
      // 获取数据
      getList(data).then(r => {
        if (r.code == 200) {
          this.list = r.data.data;
          this.setPage(r.data);
        }
      });
    },

    shield(id) {
        this.update_status(id, 2, '屏蔽成功')
    },

    delete(id) {
      let that = this
      that.$messageConfirm('是否删除圈子, 不可恢复的那种', (r) => {
          del(id).then((r) => {
            that.$success_('删除成功')
            that.getList()
          })
      })
    },

    showDetail(id) {

    },

    audit(id) {
        this.update_status(id, 1, '审核成功')
    },

    online(id) {
        this.update_status(id, 1, "上线成功")
    },

    update_status(id, status, title) {
        let that = this
        update_status(id, status).then(function(r) {
            if(r.code == 200) {
                that.$success_(title)
                that.search()
            }else{
                that.$error_(r.msg)
            }
        })
    },

    search() {
        this.getList()
    },

    /**
     * 批量屏蔽
     */
    batch_lower() {
      batch_lower(this.selected).then(r => {
        this.$success_('屏蔽成功')
        this.getList()
      })
    },

    /**
     * 批量上线
     */
    batch_online() {
      batch_online(this.selected).then(r => {
        this.$success_('上线成功')
        this.getList()
      })
    },

    /**
     * 批量删除
     */
    batch_delete() {
      this.$messageConfirm('删除后不可恢复哦, 请谨慎选择', r => {
          batch_delete(this.selected).then(r => {
            this.$success_('删除成功')
            this.getList()
        })
      })
    },

    /**
     * 获取选中的值
     */
    getSelected(data) {
      let selected = []
      data.forEach(element => {
        selected.push(element.id)
      });
      this.selected = selected.join(',')
    }
  }
};
</script>
