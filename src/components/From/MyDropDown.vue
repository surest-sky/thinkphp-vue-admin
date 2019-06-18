<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <el-button type="primary">
      <span v-text="dropDownData.label"></span><i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :command="item.func" v-text="item.label" v-for="(item,index) in dropDownData.items" :key="index"></el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  export default {
    props: ["dropDownData"],
    methods: {
      handleCommand(command) {
        this.$emit(command.func, command.uuid);
      }
    }
  };
</script>

<style>

</style>