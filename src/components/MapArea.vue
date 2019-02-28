<template>
    <div class="map-area" :style="areaLocal" @mousedown.stop="mousedown"
         @mousemove.stop="mousemove" @mouseup.stop="mouseup">
        <div class="title">{{title}}</div>
    </div>
</template>

<script>
    export default {
        name: "MapArea",
        props: {
            title: null,
        },
        data() {
            return {
                top: 0,
                left: 0,
            }
        },
        methods: {
            mousedown(e) {
                this.isMousedown = true;
                console.log(true);
            },
            mouseup(e) {
                this.isMousedown = false;
                console.log(false);
            },
            mousemove(e) {
                if (!this.isMousedown) {
                    return;
                }
                console.log('移动', e);
            },
        },
        computed: {
            areaLocal() {
                return {
                    top: `${this.top}px`,
                    left: `${this.left}px`,
                }
            },
        },
    }
</script>

<style scoped>
    .map-area {

        width: 30px;
        height: 30px;
        background-color: yellow;
        border-radius: 100%;
        position: absolute;

        .title {
            position: absolute;
            top: -120%;
            right: -120%;

        }
    }
</style>