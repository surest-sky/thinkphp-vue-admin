<template>
    <div class="content" >
    <my-header v-bind:title="title"></my-header>

    <my-table
        :tableData="data"
        :columns="columns"
        :loading="loading_"
      ></my-table>

    </div>
</template>

<script>
import myHeader from "@/components/admin/common/Header";
import { jsonRemove } from '@/components/unitls'
import myTag from "@/components/From/Tag";
import Button from "@/components/From/Button";
import MyDropDown from "@/components/From/MyDropDown";
import MyTable from "@/components/From/Table";
import Pagination from "@/components/From/Pagination";

export default {
    name: 'Message',
    data() {
        return {
            title: '消息管理',
            data: [],
            loading_: false,
            columns: [
                { prop: "id", label:"ID" },
                { prop: "content", label:"消息内容" },
                { prop: "title", label:"消息标题" },
                { prop: "type_", label:"消息类型" },
                { prop: "create_time", label:"创建时间" },
                { prop: "send_time", label:"发送时间" },
                { prop: "status_", label:"发送状态", 
                    render: (h, param) => {
                        return h(myTag, {
                            prop: {effect: "dark", text: param.row.id}
                        })
                    }
                },
                { prop: "", label:"操作", fixed:"right", width: "200",
                    render: (h, param) => {
                        const buttons = [
                            {func: "send", id: param.row.id, text: "立即发送", size: "small" },
                            {func: "with_draw", id: param.row.id, text: "撤回发送", size: "small"},
                        ]
                        return h(Button, {
                            props: { buttons: buttons },
                            on: {
                                send: this.send,
                                send: this.with_draw,
                            } 
                        })
                    }
                },
            ]
        }
    },

    mounted() {
        this.getList()
    },

    components: {
        myHeader,
        MyTable,
        Button
    },

    methods: {
        // 获取列表数据
        getList() {
            this.loading = true
            this.$get('/api/message', {
                page: 1,
                pagesize: 2
            }).then((r) => {
                if(r.code == 200) {
                    this.setData(r.data.list)
                }
            })
        },

        // 组装数据 
        setData(data) {
            this.data = data.map((item, key) => {
               item.status_ = this.getStatus_(item.status)
               item.type_ = this.getType_(item.type)

               return item
            });

            console.log(this.data)
            this.loading = false
        },

        // 发送消息
        send(id) {
            this.loading = true

            this.$post('/api/message/send/'+id)
                .then((r) => {
                    if(r.code == 200) {
                        this.$success_(r.msg)
                    }else{
                        this.$error_(r.msg)
                    }

                    this.loading = false
                })
        },

        // 删除消息
        deleted(id) {
            this.loading = true

            this.$deleteds('/api/message/'+id)
                .then((r) => {
                    if(r.code == 200) {
                        this.$success_(r.msg)
                    }else{
                        this.$error_(r.msg)
                    }
                    this.data = jsonRemove(this.data, 'id', id)
                    this.loading = false
                })
        },

        // 撤回发送消息
        with_draw() {
             this.$post('/api/message/send/'+id)
                .then((r) => {
                    if(r.code == 200) {
                        this.$success_(r.msg)
                    }else{
                        this.$error_(r.msg)
                    }
                })
        },
        
        getStatus_(status) {
            switch(parseInt(status)) {
                case 0:
                    return "等待发送"
                break;
                case 1:
                    return "发送成功"
                break;
                case 2:
                    return "已撤回"
                break;
            }
        },

        getType_(status) {
            switch(parseInt(status)) {
                case 0:
                    return "紧急通知"
                break;
                case 1:
                    return "系统通知"
                break;
                case 2:
                    return "用户通知"
                break;
            }
        }
    }
}
</script>
