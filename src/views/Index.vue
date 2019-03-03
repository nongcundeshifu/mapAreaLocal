<template>

    <div class="">
        <div class="shell">
            <div ref="areaWrapper" class="map-area-wrapper" :style="mapAreaStyle" :class="{ 'has-bg': hideImg }">
                <img v-show="!hideImg" src="../assets/images/test.png" @load="imgLoad" ondragstart="return false;"/>

                <!--存储所有area的元素-->
                <div class="area-wrapper">
                    <map-area :title="1" :local-x="localX" :local-y="localY"></map-area>
                </div>
            </div>
        </div>
        <el-button>我是按钮</el-button>
    </div>

</template>

<script>
    import MapArea from '../components/mapArea/MapArea';
    export default {
        name: "Index",
        data() {
            return {
                mapAreaH: 'auto',
                mapAreaW: 'auto',
                hideImg: false,
                localX: 0,
                localY: 0,
            }
        },
        mounted() {
            const offset = $(this.$refs.areaWrapper).offset();
            this.localX = offset.left;
            this.localY = offset.top;

        },
        methods: {
            imgLoad(e) {
                this.mapAreaH = e.path[0].naturalHeight;
                this.mapAreaW = e.path[0].naturalWidth;
                this.hideImg = true;

            },
        },
        computed: {
            mapAreaStyle() {
                return {
                    width: this.mapAreaW === 'auto' ? 'auto' : this.mapAreaW + 'px',
                    height: this.mapAreaH === 'auto' ? 'auto' : this.mapAreaH + 'px',
                    backgroundImage: `url(${MapArea})`,
                }
            },
        },

        components: {
            MapArea,
        },
    }
</script>

<style scoped lang="scss">
    .shell {
        padding: 20px;

    }

</style>
