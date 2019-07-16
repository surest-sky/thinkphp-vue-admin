<template>
  <div class="dashboard-container">
    <header><h1>D88后台管理</h1></header>

    <!-- 折扣相关图表渲染 -->
    <div class="content">
      <h2>数据统计 - 每周</h2>
      <div ref="discount" id="discount"></div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import echarts from 'echarts'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

header {
  text-align: center;
}

.content {
  text-align: center;
}

#discount {
  width: 100%;
  height: 800px;
  margin: 0px auto;
}
</style>
