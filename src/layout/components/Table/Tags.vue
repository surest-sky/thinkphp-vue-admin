<template>
    <el-tag v-for="(item, index) in tags" :key="index" :size="item.size" :type="item.type" :effect="item.effect">{{item.text}}</el-tag>
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

<style>

</style>
