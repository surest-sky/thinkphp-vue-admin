<template>
  <el-date-picker
      v-model="date_"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      >
    </el-date-picker>
</template>

<script>
import moment from "moment"

export default {
  name: "Date",
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              const end = new Date();
              const start = moment(moment().format('L')).format();
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "上周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "上月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
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
        let start_time = moment(val[0]).unix()
        let end_time = moment(val[0]).unix()
        this.$emit('update:date', {start_time, end_time})
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
