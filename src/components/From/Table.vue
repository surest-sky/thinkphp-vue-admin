<template>
  <!-- ------表格内容-------- -->
  <el-table 
  :data="tableData" 
  v-loading="store_loading"
  :row-class-name="tableRowClassName"
  style="width:100%">
    <el-table-column
      v-for="(column, index) in columns"
      :prop="column.prop"
      :key="index"
      :label="column.label"
      :fixed="column.fixed"
      :width="column.width"
    >
      <template slot-scope="scope">
        <my-render v-if="column.render" :row="scope.row" :render="column.render"></my-render>
        <span v-else>{{scope.row[column.prop]}}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import MyRender from "@/components/From/MyRender";

export default {
  props: {
    tableData: Array,
    columns: Array,
    store_loading: {
        type: Boolean,
    }
  },
  methods: {
    headerStyle() {
      return { "text-align": "center" };
    },
    tableRowClassName({ row }) {
      if (row.status == 2) {
        return "color-lower";
      }
    },
  },
  components: {
    MyRender
  }
};
</script>

