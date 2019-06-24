<template>
  <el-form-item :label="label" :prop="prop">
    <el-select class="select_" v-model="select" placeholder="请选择活动区域">
      <el-option v-for="(item, key) in options" 
        :key="key" 
        :label="item.key"
        :value="item.value"></el-option>
    </el-select>
  </el-form-item>
</template>
<script>
export default {
  name: "Select",
  data() {
    return {
      select: ""
    };
  },
  props: {
    label: String,
    prop: String,
    options: Array
  },
  watch: {
    select(value) {
      this.$emit('update:select', value)
    }
  }
};
</script>

<style>
.select_ {
  float: left;
  overflow: hidden;
}
</style>

