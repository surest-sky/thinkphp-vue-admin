<template>
  <!-- ------表格内容-------- -->
  <el-table
    ref="multipleTable"
    :data="tableData"
    v-loading="loading"
    :row-class-name="tableRowClassName"
    class="table_"
    @selection-change="handleSelectionChange"
    border
    highlight-current-row
  >
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column
      v-for="(column, index) in columns"
      :prop="column.prop"
      :key="index"
      :label="column.label"
      :fixed="column.fixed"
      :width="column.width"
      :show-overflow-tooltip="true"
    >
      <template slot-scope="scope">
        <my-render v-if="column.render" :row="scope.row" :render="column.render"></my-render>
        <span v-else>{{scope.row[column.prop]}}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import MyRender from "@/layout/components/Table/MyRender";

export default {
  props: {
    tableData: {
      type: Array,
      default: []
    },
    columns: Array,
    store_loading: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  mounted() {},
  methods: {
    headerStyle() {
      return { "text-align": "center" };
    },
    tableRowClassName({ row }) {
      if (row.status == 2) {
        return "color-lower";
      }
    },
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    }
  },
  components: {
    MyRender
  }
};
</script>

<style>
.table_ {
  margin-top: 20px;
  box-sizing: border-box !important;
  width: 97% !important;
}
</style>


