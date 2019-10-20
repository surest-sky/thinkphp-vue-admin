<template>
  <el-date-picker
  class="select_"
    v-model="date_"
    align="right"
    type="datetime"
    :placeholder="placeholder"
    :picker-options="pickerOptions"
  ></el-date-picker>
</template>

<script>
import moment from "moment"

export default {
  name: "Date",
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "明天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      date_: "",
    };
  },

  props: {
      placeholder: {
          type: String,
          default: "请输入日期"
      }
  },

  watch: {
      date_(val) {
        val = moment(val).unix()
        this.$emit('update:date', val)
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
