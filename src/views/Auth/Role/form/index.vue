<template>
  <div>
    <el-form label-position="left" label-width="80px" :model="form">
      <el-form-item label="角色名称">
        <el-input type="text" v-model="formData.name"></el-input>
      </el-form-item>

      <el-form-item label="选择权限">
        <el-tree
        ref="tree"
          v-model="formData.permissions"
          :data="tree"
          show-checkbox
          node-key="id"
          :props="props"
          :default-checked-keys="actived"
        ></el-tree>
      </el-form-item>

      <el-form-item label="备注">
        <el-input type="text" v-model="formData.remark"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="createOrUpdateRole"
        >{{ this.form.submit ? this.form.submit : "创建" }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getPermissionAll,
  getRoleInfo,
  createOrUpdateRole
} from "@/api/role";

export default {
  name: "index",
  data() {
    return {
      props: {
        label: "name"
      },
      actived: [],
      formData: {}
    };
  },
  props: {
    tree: Array,
    form: Object
  },
  mounted() {
    this.getActived();
  },
  methods: {
    getActived() {
      let that = this;
      if (this.form.id) {
        getRoleInfo(this.form.id).then(function(r) {
          that.setData(r.data);
        });
      }
    },

    setData(data) {
      let tmp = [];
      data.permissions.forEach(element => {
        tmp.push(element.id);
      });

      this.formData = Object.assign({}, {
          name: data.name,
          reamrk: data.reamrk,
      }, this.form)

      this.actived = tmp;
    },

    createOrUpdateRole() {
      let that = this;
      let actived = this.$refs.tree.getCheckedNodes()
      let tmp = []
      actived.forEach(function(r) {
          tmp.push(r.id)
      })

      tmp = tmp.join(',')

      var data = Object.assign({}, {
            permission_ids: tmp,
            name: this.form.name,
            remark: this.form.remark
      })


      createOrUpdateRole(this.form.id, data).then((r) => {
          if(r.code == 200) {
              that.$success_('更新成功')
              that.$emit('submited')
          }else{
              that.$error_(r.msg)
          }
      })
    },
  }
};
</script>
