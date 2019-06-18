<template>
    <!-- ------表格内容-------- -->
      <el-table
        :data="tableData"
        style="width:100%"
        :row-key="tableDatahandle"
        v-loading="store_loading"
      >
        <el-table-column
            v-for="(column, index) in columns"
            :prop="column.prop"
            :key="index"
            :label="column.label">

            <template slot-scope="scope">
                <my-render v-if="column.render" :row="scope.row" :render="column.render"></my-render>
                <span v-else>
                    {{scope.row[column.prop]}}
                </span>
            </template>
            
        </el-table-column>

      </el-table>
</template>
