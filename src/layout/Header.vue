<template>
    <div class="header_">
        <span>{{title}}</span>
        <div>
            <h2>{{title}}</h2>        
        </div>
        <div class="line"></div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    props: {
        title: {
            default: "首页",
            type: String
        }
    }
}
</script>

<style lang="scss">
    .header_{
        box-sizing: border-box;
        background-color: white;
        text-align: left;
        padding-left: 30px;
        padding-top: 10px;
        span {
            font-size: 15px;
        }
    }
</style>

