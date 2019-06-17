<template>
    <div class="content" >
    <my-header v-bind:title="title"></my-header>

    <el-table
        :data="data"
        style="width:100%"
        v-loading="loading"
      >
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="content" label="消息内容"></el-table-column>
        <el-table-column prop="title" label="消息标题"></el-table-column>
        <el-table-column prop="type_" label="消息类型" width="680"></el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
        <el-table-column prop="send_time" label="发送时间"></el-table-column>
        <el-table-column prop="status_" label="发送状态">
            <template slot-scope="scope">
                <el-tag
                    effect="dark">
                    {{scope.row.status_}}
                </el-tag>
            </template>
        </el-table-column>

        <el-table-column fixed="right" width="200" label="操作">
          <template slot-scope="scope">
            <el-button @click="send(scope.row.id)" type="text" size="small">立即发送</el-button>
            <el-button @click="with_draw(scope.row.id)" type="text" size="small">撤回发送</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
</template>

<script>
import myHeader from "./common/Header";
import { jsonRemove } from '@/components/unitls'

export default {
    name: 'Message',
    data() {
        return {
            title: '消息管理',
            data: [],
            loading: false
        }
    },

    mounted() {
        this.getList()
    },

    components: {
        myHeader
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
