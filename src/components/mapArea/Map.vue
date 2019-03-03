<template>
    <div  class="map" :style="mapAreaStyle" :class="{ 'has-bg': hideImg }">
        <img v-show="!hideImg" src="../assets/images/test.png" @load="imgLoad" ondragstart="return false;"/>

        <!--存储所有area的元素-->
        <div class="area-wrapper">
            <map-area :title="1" :local-x="localX" :local-y="localY"></map-area>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Map",
        props: {
            imgSrc: String,
        },
        data() {
            return {
                mapAreaH: 'auto',
                mapAreaW: 'auto',
                localX: 0,
                localY: 0,
            }
        },
        computed: {
            mapAreaStyle() {
                return {
                    width: this.mapAreaW === 'auto' ? 'auto' : this.mapAreaW + 'px',
                    height: this.mapAreaH === 'auto' ? 'auto' : this.mapAreaH + 'px',
                    backgroundImage: `url(${this.imgSrc})`,
                }
            },
        },
        methods: {
            loadImg() {
                var img=new Image();
                img.onload = (e) => {
                    this.mapAreaH = e.naturalHeight;
                    this.mapAreaW = e.naturalWidth;
                };
                img.onerror=function(){

                };
                img.src = this.imgSrc;
            },
        },
        watch: {
            imgSrc(newVal, oldVal) {
                if (newVal === oldVal) {
                    return;
                }
                // 预加载图片
                this.loadImg();
            },
        },
    }
</script>

<style scoped lang="scss">
    .map-area-wrapper {
        font-size: 0;
        border: 1px solid red;
        position: relative;
        background-size: 100% 100%;
        background-repeat: no-repeat;


        .area-wrapper {
            font-size: 16px;
        }
    }
</style>