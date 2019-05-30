<template>

    <div class="container">
      <el-row class="header">
        <el-col :span=3 class="title">
            <router-link :to="{name: 'admin'}">线上商场后台</router-link>
        </el-col>
      </el-row>
      <el-row class="content">
        <el-col :span="3" class="lside">
          <el-menu
            :default-active="default_active"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item v-for="(item, index) in routers" :key="index" :index="item.path" @click="swich_(item.path)">
              <i class="el-icon-menu"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="20">
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>
</template>

<script>
export default {
  name: "Index",
  data: function() {
    return {
      default_active: '/admin/home',
      routers: new Array,
      isCollapse: true
    }
  },
  created() {
    this.readRouters()
    console.log(this.routers)
  },
  methods: {
    handleOpen(key, path) {
      console.log(arguments)
    },
    handleClose(key, path) {
      console.log(arguments)
    },
    swich_(path){
      console.log(path);
      this.$router.push(path)
    },
    readRouters() {
      var AllRouters = this.$router.options.routes
      var routers = new Array()
      // console.log(this.$router.options.routers)
      for (const i in AllRouters) {
        // console.log(AllRouters[i])
        if(AllRouters[i].name == 'admin') {
          var temp = AllRouters[i].children
          for (const key in temp) {
            var route = {
              'path' : temp[key].path,
              'name' : temp[key].name
            }

            routers.push(route)
          }
        }
      }
      this.routers = routers
      console.log(this.routers)
    },

  }
};
</script>

<style lang="less">
.container {
  height: 100%;
}

.header {
  height: 8%;
  width: 100%;
  background-color: #545c64;

  .title {
    line-height: 60px;
    height: 100%;
    font-weight: bolder;
    a{
      text-decoration: none;
      color: white;
    }
  }
}

.lside{

  ul{
    height: 100%;
  }
}

.content {
  height: 92%;

  .el-col {
    height: 100%;
  }
}
</style>

