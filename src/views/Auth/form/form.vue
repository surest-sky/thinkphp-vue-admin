<template>
  <div class="form">
      <el-form>
        <el-form label-position="left" label-width="80px" :model="form">

          <el-form-item label="父级菜单">
            <SelectTree 
            :props="props"
            :options="list"
            :valueId="valueId"
            @getValue="getValue($event)"/>
            <span style="color: rgb(224, 62, 62); font-size: 12px;">! 可选, 不填写时默认为根节点</span>
          </el-form-item>

          <el-form-item label="路由名称">
            <el-input type="text" v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="路由地址">
            <el-input type="text" v-model="form.rule">
              <template slot="prepend">/admin/</template>
            </el-input>
          </el-form-item>

          <el-form-item label="请求方法">
             <el-select v-model="form.method" multiple placeholder="请选择" style="width: 200px">
              <el-option
                v-for="item in methods"
                :key="item.key"
                :label="item.value"
                :value="item.value">
              </el-option>
          </el-select>
          </el-form-item>

          <el-form-item label="状态">
            <el-select v-model="form.status">
              <el-option key="1" value="启用"></el-option>
              <el-option key="0" value="禁用"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="隐藏菜单">
            <el-select v-model="form.status">
              <el-option key="1" value="是"></el-option>
              <el-option key="0" value="否"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="备注信息">
            <el-input type="text" v-model="form.remark"></el-input>
          </el-form-item>

          <el-form-item>
            <!-- <el-button type="primary" v-if="true" @click="updateOrCreate(2)">更新</el-button> -->
            <el-button type="primary" @click="updateOrCreate(null)">新建</el-button>
            <el-button @click="addFormShow = !addFormShow">取消</el-button>
          </el-form-item>
        </el-form>
      </el-form>
  </div>
</template>

<script>


import SelectTree from './tree'
import { getPermissionAll, create, update } from "@/api/permission"

export default {
  name: "index",
  props: {
      form: Object
  },
  components: {
    SelectTree
  },
  data() {
    return {
      methods: [
        { key: "*", value: "*"},
        { key: "POST", value: "POST"},
        { key: "GET", value: "GET"},
        { key: "PATHCH", value: "PATCH"},
        { key: "PUT", value: "PUT"},
        { key: "DELETE", value: "DELETE"},
      ],
      props:{
        value: 'id',
        label: 'name',
        children: 'children',
        // disabled:true
      },
      list: [],
      valueId: 0,
    }
  },
  
  mounted() {
    this.getAllPermission()
  },

  methods: {
    getAllPermission() {
      let that = this
      getPermissionAll().then(r => {
        if(r.code ) {
            console.log(r)
            that.list = r.data
            that.setData()
        }else{
          this.$error_(r.msg)
        }
      })
    },

    getValue(value){
      this.valueId = value
      console.log(this.valueId);
    },

    setData() {
      let root = [
        {id: 0, name: "根节点", p_id: '#', children: this.list}
      ]
      this.list = root
    },

    updateOrCreate() {
      this.form.hidden = this.form.hidden == "否" ? 0 : 1;
      this.form.status = this.form.status == "启用" ? 1 : 0;
      let that = this
      if(this.form.id) {
        update(this.form.id, this.form).then(r => {
          console.log(r)
        })
      }
      this.setData()
      console.log(this.form)
    }


  }
};
</script>
