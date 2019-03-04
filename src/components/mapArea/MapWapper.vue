<template>
    <div class="map-wrapper" :style="mapAreaStyle">

        <!--存储所有area的元素-->
        <div class="area-wrapper">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MapWapper",
        props: {
            imgSrc: String,
        },
        data() {
            return {
                mapAreaH: 'auto',
                mapAreaW: 'auto',
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
        created() {
            this.loadImg();
        },
        mounted() {

        },
        methods: {
            loadImg() {
                var img=new Image();
                img.onload = (e) => {
                    this.mapAreaH = e.path[0].naturalHeight;
                    this.mapAreaW = e.path[0].naturalWidth;
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
    .map-wrapper {
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