<template>
  <div>
    <el-dropdown trigger="click" @command="handleCommand" >
      <el-button type="primary" size="medium">
        <span v-text="dropDownData.label"></span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
         size="medium"
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
  name: 'DropDown',
  props: {
    dropDownData: {
      type: Object
    }
  },
  methods: {
    handleCommand(command) {
      this.$emit(command);
    }
  }
};
</script>

<style>
</style>