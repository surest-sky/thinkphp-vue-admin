<template>
  <span>
    <el-button
      v-for="(item, index) in buttons"
      @click="run_(`${item.func}`, `${item.id}`)"
      :key="index"
      size="small"
      :type="item.type"
    >{{item.text}}</el-button>
  </span>
</template>


<script>
export default {
  name: "Button",
  props: {
    buttons: Array
  },
  methods: {
    run_(func, id) {
      this.$emit(func, id);
    }
  }
};
</script>

<style>
</style>
