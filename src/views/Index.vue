<template>

    <div class="">
        <div class="shell">
            <map-wapper ref="map" :img-src="imgSrc">
                <map-area v-for="(item, index) in area" :key="index" :show-panel="showPanel"
                          :local-x="localX" :local-y="localY" :local-type="item.panelLocalType"
                          :x.sync="item.x" :y.sync="item.y" :flag="index" ></map-area>
            </map-wapper>
        </div>
        <div>
            <el-button >重新导入图片</el-button>
            <input type="file" @change="imgChange"/>
        </div>

        <el-button @click="addItem">添加节点</el-button>
        <div>
            删除节点的下标: <el-input v-model="delNumber" placeholder="请输入内容"></el-input>
            <el-button @click="delItem">删除此节点</el-button>
        </div>
        <div>
            设置panel节点的下标: <el-input v-model="panelNumber" placeholder="请输入内容"></el-input>
            设置panel节点的位置: <el-input v-model="panelType" placeholder="请输入内容"></el-input>
            <el-button @click="updatePanelType">更新此节点的panel位置</el-button>
        </div>

        <div>
            导出位置信息的倍数：<el-input v-model="zoomNum" placeholder="设置导出位置信息的倍数"></el-input>
        </div>
        <el-button>导出位置信息</el-button>
        <el-button @click="showPanel = !showPanel">切换panel面板显示</el-button>


        <json-viewer :value="resultJSONData" copyable></json-viewer>
    </div>

</template>

<script>
    import MapArea from '../components/mapArea/MapArea';
    import MapWapper from '../components/mapArea/MapWapper';
    import testImg from '../assets/images/test.png';
    import JsonViewer from 'vue-json-viewer';

    const itemFactory = () => {
        return {
            data: {},
            x: 0,
            y: 0,
            // 1 2 3 4 5 6 7 8从左到右的8种顺序
            //         // 1是左上，2是上中 3是右上
            //         // 4是做中，5是左中
            //         // 6是左下，7是下中，8是右下
            panelLocalType: 8,
        };
    }

    export default {
        name: "Index",
        data() {
            return {
                imgSrc: testImg,
                // area: [
                //     {
                //         data: {},
                //         x: 0,
                //         y: 0,
                //
                //
                //         panelLocalType: 1,
                //
                //     },
                //
                // ],
                area: [
                    {
                        "data": {},
                        "x": 0,
                        "y": 0,
                        "panelLocalType": 1
                    },
                    {
                        "data": {},
                        "x": 170,
                        "y": 210,
                        "panelLocalType": 8
                    },
                    {
                        "data": {},
                        "x": 305,
                        "y": 310,
                        "panelLocalType": 8
                    }
                ],
                localX: 0,
                localY: 0,
                delNumber: 0,
                zoomNum: 1,
                showPanel: false,
                panelNumber: 0,
                panelType: 8,

            }
        },
        mounted() {
            const offset = $(this.$refs.map.$el).offset();
            this.localX = offset.left;
            this.localY = offset.top;

        },
        methods: {
            addItem() {
                this.area.push(itemFactory());
            },
            delItem(index) {
                this.area.splice(index, 1);
            },
            updatePanelType() {
                this.area[this.panelNumber].panelLocalType = +this.panelType;
            },



            imgChange(e) {
                const file = e.path[0].files[0];
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) => {
                    this.imgSrc = e.target.result;
                    this.area = [];
                }
            },

        },
        computed: {
            resultJSONData() {
                const copy = JSON.parse(JSON.stringify(this.area));
                copy.forEach((value) => {
                    value.x = Math.round(this.zoomNum * value.x);
                    value.y = Math.round(this.zoomNum * value.y);
                    return value;
                });
                return copy;
            },
        },

        components: {
            MapArea,
            MapWapper,
            JsonViewer,
        },
    }
</script>

<style scoped lang="scss">
    .shell {
        padding: 20px;

    }

</style>
