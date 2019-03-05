<template>
    <div ref="area" class="map-area" :style="areaLocal" @mousedown.stop="mousedown"
          @mousemove.stop="mousemove" @click="showPanelFn">
        {{flag}}
        <div class="panel" :style="areaPanelLocal" v-show="showPanel"
             @mousedown.stop="mousedownPanel"
             @mousemove.stop="mousemovePanel">{{flag}}</div>
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
            x: {
                type: Number,
                default: 0,
            },
            y: {
                type: Number,
                default: 0,
            },
            panelX: {
                type: Number,
                default: 0,
            },
            panelY: {
                type: Number,
                default: 0,
            },
            flag: [String, Number],
            // panel的位置信息
            localType: {
                type: Number,
                default: 8,
            },
            showPanel: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                isMousedown: false,
                isPanelDown: false,
            }
        },
        computed: {
            areaLocal() {
                return {
                    top: `${this.y}px`,
                    left: `${this.x}px`,
                    zIndex: this.isMousedown ? '100' : 'auto',
                }
            },
            areaPanelLocal() {
                return {
                    top: `${this.panelY}px`,
                    left: `${this.panelX}px`,
                    zIndex: this.isMousedown ? '100' : 'auto',
                }
            },
            panelLocalStyle() {
                const styleObj = {};
                const offsetMin = '110%';
                const offsetMax = '110%';
                const centerOffset = '50%';
                switch (this.localType) {
                    case 1: {
                        styleObj.right = offsetMin;
                        styleObj.bottom = offsetMin;
                        break;
                    }
                    case 2: {
                        styleObj.left = centerOffset;
                        styleObj.bottom = offsetMin;
                        break;
                    }
                    case 3: {
                        styleObj.left = offsetMax;
                        styleObj.bottom = offsetMin;
                        break;
                    }
                    case 4: {
                        styleObj.right = offsetMin;
                        styleObj.top = `-${centerOffset}`;
                        break;
                    }
                    case 5: {
                        styleObj.left = offsetMin;
                        styleObj.top = `-${centerOffset}`;
                        break;
                    }
                    case 6: {
                        styleObj.right = offsetMin;
                        styleObj.top = offsetMin;
                        break;
                    }
                    case 7: {
                        styleObj.right = centerOffset;
                        styleObj.top = offsetMin;
                        break;
                    }
                    case 8: {
                        styleObj.left = offsetMax;
                        styleObj.top = offsetMin;
                        break;
                    }
                    default: {
                        styleObj.left = offsetMax;
                        styleObj.top = offsetMin;
                    }
                }

                return styleObj;
            },
        },
        created() {

        },
        mounted() {
            const area = this.$refs.area;
            document.addEventListener('mouseup', () => {
                this.isMousedown = false;
                this.isMousedownPanel = false;
            }, false);
        },
        methods: {
            showPanelFn() {

            },
            mousedown(e) {
                this.isMousedown = true;
                this.local = {
                    layerX: e.layerX,
                    layerY: e.layerY,
                }
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

                const x = currentLocal.x - this.localX - this.local.layerX;
                const y = currentLocal.y - this.localY - this.local.layerY;
                this.$emit('update:x', x);
                this.$emit('update:y', y);






            },
            
            // panel
            mousedownPanel(e) {
                this.isMousedownPanel = true;
                this.local = {
                    layerX: e.layerX,
                    layerY: e.layerY,
                }
                // 还需要计算鼠标位置 layerX layerY
            },
            mousemovePanel(e) {
                if (!this.isMousedownPanel) {
                    return;
                }

                // 需要使用clientX和clientY 他们会随滚动条进行变化
                const currentLocal = {
                    x: e.clientX,
                    y: e.clientY,
                }

                const x = currentLocal.x - this.localX - this.x - this.local.layerX;
                const y = currentLocal.y - this.localY - this.y - this.local.layerY;
                this.$emit('update:panelX', x);
                this.$emit('update:panelY', y);






            },
        },

    }
</script>

<style scoped lang="scss">
    .map-area {

        width: 30px;
        height: 30px;
        background-color: yellow;
        border-radius: 100%;
        position: absolute;
        text-align: center;

        .panel {
            width: 550px;
            height: 400px;
            border: 1px solid green;
            position: absolute;
            background-color: #e3e3e3;
            /*top: 120%;*/
            /*left: 120%;*/
        }
    }
</style>
