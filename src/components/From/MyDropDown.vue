<template>
  <div>
    <el-button
      v-for="(item, key) in buttons"
      :key="key"
      type="text"
      :size="item.size"
      @click="run_(`${item.func.func}`, `${item.func.id}`)"
    >{{item.label}}</el-button>

    <el-dropdown size="small" trigger="click" @command="handleCommand" >
      <el-button type="primary">
        <span v-text="dropDownData.label"></span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
        :command="item.func"
          v-text="item.label"
          v-for="(item,index) in dropDownData.items"
          :key="index"
        ></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  props: {
    dropDownData: {
      type: Object
    },
    buttons: Array
  },
  methods: {
    handleCommand(command) {
      this.$emit(command.func, command.id);
    },
    run_(method, id) {
      console.log(arguments)
      this.$emit(method, id);
    }
  }
};
</script>

<style>
</style>