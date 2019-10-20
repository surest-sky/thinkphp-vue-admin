<template>
    <div>
        <el-tag class="tag" v-for="(item, index) in tags" :key="index" size="small" >{{item.text}}</el-tag>
    </div>
</template>


<script>
export default {
    name: 'Tag',
    props: {
        tags: {
            type: Array,
        }
    }
}
</script>

<style scoped>
    .tag + .tag {
        margin-left: 5px;
    }
</style>
