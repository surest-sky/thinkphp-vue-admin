<template>
  <div>
    <el-form label-position="left" label-width="80px" :model="form">
      <el-form-item label="用户账号">
        <el-input type="text" v-model="formData.username"></el-input>
      </el-form-item>

      <el-form-item label="用户昵称">
        <el-input type="text" v-model="formData.user_nickname"></el-input>
      </el-form-item>

      <el-form-item label="用户密码">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>

      <el-form-item label="备注">
        <el-input type="text" v-model="formData.description"></el-input>
      </el-form-item>

      <el-form-item label="用户头像">
        <el-input type="text" v-model="formData.user_avatar"></el-input>
      </el-form-item>
      
      <el-form-item label="用户邮箱">
        <el-input type="email" v-model="formData.email"></el-input>
      </el-form-item>

      <el-form-item label="邮件通知">
        <el-radio v-model="formData.isNotice" label="1">是</el-radio>
        <el-radio v-model="formData.isNotice" label="2">否</el-radio>
      </el-form-item>

      <el-form-item label="角色">
        <el-checkbox-group v-model="role_ids">
        <el-checkbox v-for="(item, key) in roles" :key="key" :label="item.id" >{{ item.name }}</el-checkbox>
      </el-checkbox-group>
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
import { getRoleList } from "@/api/role"

import { mapGetters } from 'vuex'

export default {
    name: 'index',
    data() {
      return {
        roles: [],
        checkRoles: [],
        formData: {},
        role_ids: []
      }
    },
    props: {
        form: Object,
        submit: String
    },
    mounted() {
      this.getRoleList()
    },
    watch: {
      form: {
        handler() {
          this.formData = this.form
          this.role_ids = this.form.role_ids
        }
      }
    },
    methods: {
        createOrUpdateRole() {
            let that = this
            this.formData.role_ids = this.role_ids.join(',')

            createOrUpdateRole(that.form.id, this.formData).then((r) => {
                if(r.code == 200) {
                    this.$success_(r.msg)
                    this.$emit('submited', false)
                }else{
                    this.$error_(r.msg)
                }
            })
        },

        // 获取角色
        getRoleList() {
          let that = this
          getRoleList().then(r => {
            if(r.code == 200) {
              this.roles = r.data
          console.log(this.roles)
            }
          })
        }
    }
}
</script>
