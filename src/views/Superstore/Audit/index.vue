<template>
    <div style="width:95%">
        <my-table :tableData="list" :columns="columns"/>
        <el-dialog :visible.sync="show_img_show" class="img_dialog"
             :modal-append-to-body='false'
        >
            <img :src="img_src" :alt="img_src" class="img_dialog">
        </el-dialog>
    </div>
</template>

<script>
import { MyTag, MyDropDown, MyTable } from "@/layout/components/index";

export default {
  name: "index",
  data() {
    return {
      list: [],
      id: '',
      columns: [
        { prop: "id", label: "ID" },
        { prop: "super_store_banner", label: "商圈图", width: "600",
            render: (h, param) => {
                return h('img', {
                    func: { 
                        func: "show_img", 
                        id: param.row.super_store_banner 
                    } ,
                    attrs: {
                        src: param.row.super_store_banner,
                        title: param.row.super_store_banner,
                        class: 'imgSrc'
                    },
                    on: {
                        click: this.show_img
                    }
                })
            }
        },
        {
          prop: "is_enable",
          label: "是否被启用",
          render: (h, param) => {
            let text = "";
            if (parseInt(param.row.is_enable) == 1) {
              text = "是";
            } else {
              text = "否";
            }
            return h(MyTag, {
              props: { effect: "dark", text: text }
            });
          }
        },
        { prop: "create_time", label: "申请时间" },
        {
          prop: "",
          label: "操作",
          fixed: "right",
          width: "200",
          render: (h, param) => {
            let dropDownData = {
                label: "操作"
            }
            if (parseInt(param.row.is_enable) == 0) {
              dropDownData.items = [
                { label: "启用", func: { func: "enable", id: param.row.id } }
              ];
              // 触发MyDropDown的update和del事件
                return h(MyDropDown, {
                props: { dropDownData: dropDownData},
                on: {
                    enable: this.enable
                }
                });
            }
          }
        }
      ],
      show_img_show: false,
      img_src: ""
    };
  },
  props: {
      audit_on: Boolean
  },
  components: {
    MyTag,
    MyDropDown,
    MyTable
  },
  watch: {
      audit_on() {
          this.getList()
      }
  },
  created() {
      this.getList()
  },
  methods: {
    getList() {
      this.id = this.$store.state.superstore.superstore_id
      this.$get("/api/superstore/feedbackbanner/" + this.id).then(r => {
        if (r.code == 200) {
          this.list = r.data.banner_list;
        }
      });
    },

    // 启用
    enable(id) {
        let banner_id = id
        this.$put(`/api/superstore/feedbackbanner/${this.id}`, {
            banner_id: banner_id
        }).then((r) => {
            if(r.code == 200) {
                this.$success_('设置成功')
                this.getList()
            }else{
                this.$error_(r.msg)
            }
        })
    },

    // 图片展示
    show_img(e) {
        console.log(e)
        console.log(e.srcElement.currentSrc)
        this.show_img_show = true
        this.img_src = e.srcElement.currentSrc
    }
  }
};
</script>

<style>
    .imgSrc {
        width: 100%;
        height: 150px;
    }
    .img_dialog {
        max-width: 100%;
        max-height: 100%;
    }
</style>
