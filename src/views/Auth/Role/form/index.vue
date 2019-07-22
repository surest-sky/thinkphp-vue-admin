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
          size="medium"
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
        label: "name",
      },
      actived: [],
      formData: {}
    };
  },
  props: {
    tree: Array,
    form: Object
  },
  watch: {
    form: {
      handler(newValue, oldValue) {
        this.getActived()
      }
    }
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
      }else{
        this.formData = {}
        this.actived = []
      }
    },

    setData(data) {
      let tmp = [];
      data.permissions.forEach(element => {
        if(element.rule !== '#') {
          tmp.push(element.id);
        }
      });

      this.formData = Object.assign({}, {
          name: data.name,
          reamrk: data.reamrk,
      })

      this.actived = tmp;
    },

    createOrUpdateRole() {
      let that = this;
      let actived = this.$refs.tree.getCheckedNodes()
      let tmp_id = []
      let tmp_pid = []
      actived.forEach(function(r) {
          tmp_id.push(r.id)
      })
      actived.forEach(function(r) {
          tmp_pid.push(r.p_id)
      })
      
      let tmp = tmp_id.concat(tmp_pid)



      tmp = tmp.filter((item, index, self) => {
        return self.indexOf(item) == index
      })

      tmp = tmp.filter((item, index, self) => {
        return item !== 0
      })

      tmp = tmp.join(',')

      var data = Object.assign({}, {
            permission_ids: tmp,
            name: this.formData.name,
            remark: this.formData.remark
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
