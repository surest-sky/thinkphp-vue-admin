<template>
  <div>
    <el-form label-position="left" label-width="80px" :model="form">
      <el-form-item label="用户账号">
        <el-input type="text" v-model="form.username"></el-input>
      </el-form-item>

      <el-form-item label="用户昵称">
        <el-input type="text" v-model="form.user_nickname"></el-input>
      </el-form-item>

      <el-form-item label="用户密码">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item label="备注">
        <el-input type="text" v-model="form.description"></el-input>
      </el-form-item>

      <el-form-item label="用户头像">
        <el-input type="text" v-model="form.user_avatar"></el-input>
      </el-form-item>
      
      <el-form-item label="用户邮箱">
        <el-input type="email" v-model="form.email"></el-input>
      </el-form-item>

      <el-form-item label="是否开启邮件通知">
        <el-radio v-model="form.isNotice" label="1">是</el-radio>
        <el-radio v-model="form.isNotice" label="2">否</el-radio>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="createOrUpdateRole"
        >{{ submit }}</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

import { createOrUpdateRole } from "@/api/admin-user"

export default {
    name: 'index',
    props: {
        form: Object,
        submit: String
    },
    methods: {
        createOrUpdateRole() {
            let that = this
            createOrUpdateRole(this.form.id, this.form).then((r) => {
                if(r.code == 200) {
                    this.$success_(r.msg)
                    this.$emit('submited', false)
                }else{
                    this.$error_(r.msg)
                }
            })
        }
    }
}
</script>
