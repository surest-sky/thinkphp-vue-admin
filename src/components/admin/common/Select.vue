<template>
  <el-form-item :label="label" :prop="prop"
  
        :labelWidth="labelWidth">
    <el-select class="select_" v-model="select">
      <el-option v-for="(item, key) in options" 
        :key="key" 
        :label="item.key"
        :value="item.value"
        ></el-option>
    </el-select>
  </el-form-item>
</template>
<script>
export default {
  name: "Select",
  props: {
    label: String,
    prop: String,
    options: Array,
    labelWidth: String,
    select: String
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

