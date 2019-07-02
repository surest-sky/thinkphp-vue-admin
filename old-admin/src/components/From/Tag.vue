<template>
    <el-tag :size="size" :effect="effect">{{text}}</el-tag>
</template>


<script>
export default {
    name: 'Tag',
    props: {
        size: String,
        text: String,
        effect: {
            type: String,
            default: "dark"
        }
    }
}
</script>

<style>

</style>
