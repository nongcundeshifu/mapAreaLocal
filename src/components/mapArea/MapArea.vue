<template>
    <div ref="area" class="map-area" :style="areaLocal" @mousedown="mousedown"
          @mousemove="mousemove">
        <div class="title"></div>
    </div>
</template>

<script>
    export default {
        name: "MapArea",
        props: {
            title: null,
            localX: {
                type: Number,
                default: 0,
                required: true,
            },
            localY: {
                type: Number,
                default: 0,
                required: true,
            },
        },
        data() {
            return {
                x: 0,
                y: 0,
            }
        },
        created() {

        },
        mounted() {
            const area = this.$refs.area;
            document.addEventListener('mouseup', () => {
                this.isMousedown = false;
            }, false);
        },
        methods: {
            mousedown(e) {
                this.isMousedown = true;
                this.local = {
                    layerX: e.layerX,
                    layerY: e.layerY,
                }
                console.l
                // 还需要计算鼠标位置 layerX layerY
            },
            mousemove(e) {
                if (!this.isMousedown) {
                    return;
                }

                // 需要使用clientX和clientY 他们会随滚动条进行变化
                const currentLocal = {
                    x: e.clientX,
                    y: e.clientY,
                }

                this.x = currentLocal.x - this.localX - this.local.layerX;
                this.y = currentLocal.y - this.localY - this.local.layerY;



            },
        },
        computed: {
            areaLocal() {
                return {
                    top: `${this.y}px`,
                    left: `${this.x}px`,
                }
            },
        },
    }
</script>

<style scoped>
    .map-area {

        width: 60px;
        height: 60px;
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