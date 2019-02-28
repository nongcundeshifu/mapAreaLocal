<template>

    <div class="">
        <div class="shell">
            <div class="map-area-wrapper" :style="mapAreaStyle">
                <img src="../assets/images/test.png" @load="imgLoad" ondragstart="return false;"/>

                <!--存储所有area的元素-->
                <div class="area-wrapper">
                    <map-area :title="1"></map-area>
                </div>
            </div>
        </div>




    </div>

</template>

<script>
    import MapArea from '../components/MapArea';
    export default {
        name: "Index",
        data() {
            return {
                mapAreaH: 'auto',
                mapAreaW: 'auto',
            }
        },
        methods: {
            imgLoad(e) {
                console.log(e);
                this.mapAreaH = e.path[0].naturalHeight;
                this.mapAreaW = e.path[0].naturalWidth;
                console.log(e.path[0].naturalWidth)

            },
        },
        computed: {
            mapAreaStyle() {
                return {
                    width: this.mapAreaW === 'auto' ? 'auto' : this.mapAreaW + 'px',
                    height: this.mapAreaH === 'auto' ? 'auto' : this.mapAreaH + 'px',
                }
            },
        },

        components: {
            MapArea,
        },
    }
</script>

<style scoped>
    .shell {
        padding: 20px;

    }
    .map-area-wrapper {
        font-size: 0;
        border: 1px solid red;
        position: relative;

        .area-wrapper {
            font-size: 16px;
        }
    }
</style>