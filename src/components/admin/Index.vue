<template>
    <div class="container">
      <el-container style="height: 100%;">
        <el-header class="header">
          <router-link :to="{name: 'admin'}"><span class="title">线上商场后台</span></router-link>
          
          <transition name="el-fade-in-linear">
            <i :class="fold_icon" @click="changeFold"></i>
          </transition>
        </el-header>

        <el-container>
          <el-aside class="lside">
            <el-menu
              :collapse="collapse"
              style="height:100%;"
              :default-active="default_active"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#001529"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <el-menu-item v-for="(item, index) in routers" :key="index" :index="item.path" @click="swich_(item.path)">
                <i class="el-icon-menu"></i>
                <span slot="title">{{item.name}}</span>
              </el-menu-item>
            </el-menu>
          </el-aside>

          <el-container>
            <el-main>
              <router-view></router-view>
            </el-main>
            <!-- <el-footer>
              <h1>Footer</h1>
            </el-footer> -->
          </el-container>

        </el-container>
      </el-container>
    </div>
</template>

<script>
export default {
  name: "Index",
  data: function() {
    return {
      default_active: '/admin/home',
      routers: new Array,
      isCollapse: true,
      fold_icon: "el-icon-s-fold",
      collapse: true
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
    
    changeFold() {
      this.collapse = !this.collapse
      if(this.fold_icon == "el-icon-s-fold") {
        this.fold_icon = "el-icon-s-unfold"
      }else{
        this.fold_icon = 'el-icon-s-fold'
      }
      console.log(this.collapse)
    }
  }
};
</script>

<style lang="less">
.container {
  height: 100%;
  box-sizing: border-box
}

.header {
  height: 5%;
  width: 100%;
  background-color: #001529;

  .title {
    line-height: 60px;
    height: 100%;
    font-weight: bolder;
    float: left;
    color: white;
    padding-left: 10px;
  }

  i {
   color: white;
   float: left; 
    line-height: 60px;
    padding-left: 20px;
    font-size: 20px;
    cursor: pointer;
  }
}

.lside{

  ul{
    height: 100%;
  }
}

.content {
  height: 95%;

  .el-col {
    height: 100%;
  }
}

.lside {
  width: auto !important;
  text-align: left;
  min-width: 65px;
}
</style>

