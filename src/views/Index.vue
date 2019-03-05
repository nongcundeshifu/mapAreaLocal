<template>

    <div class="">
        <div class="shell">
            <map-wapper ref="map" :img-src="imgSrc">
                <map-area v-for="(item, index) in area" :key="index" :show-panel="item.isShowPanel"
                          :local-x="localX" :local-y="localY" :local-type="item.panelLocalType"
                          :x.sync="item.x" :y.sync="item.y" :flag="index"
                          :panel-x.sync="item.panelX" :panel-y.sync="item.panelY"></map-area>
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
        <div>
            <el-input v-model="panelIndex" placeholder="设置导出位置信息的倍数"></el-input>
            <el-button @click="area[panelIndex].isShowPanel = !area[panelIndex].isShowPanel">切换panel面板显示</el-button>
        </div>
        


        <json-viewer :value="resultJSONData" copyable></json-viewer>
    </div>

</template>

<script>
    import MapArea from '../components/mapArea/MapArea';
    import MapWapper from '../components/mapArea/MapWapper';
    import testImg from '../assets/images/test5.jpg';
    import JsonViewer from 'vue-json-viewer';

    const itemFactory = () => {
        return {
            data: {},
            x: 0,
            y: 0,
            isShowPanel: false,
            panelX: 0,
            panelY: 0,
        };
    }
    
    /*
    
    [
                    {
                        "data": {},
                        "x": 69,
                        "y": 48,
                        "panelLocalType": 8,
                        "isShowPanel": false,
                        "panelX": -1,
                        "panelY": 44
                    },
                    {
                        "data": {},
                        "x": 49,
                        "y": 97,
                        "panelLocalType": 8,
                        "isShowPanel": false,
                        "panelX": 2,
                        "panelY": 39
                    },
                    {
                        "data": {},
                        "x": 125,
                        "y": 133,
                        "panelLocalType": 8,
                        "isShowPanel": false,
                        "panelX": -2,
                        "panelY": 42
                    },
                    {
                        "data": {},
                        "x": 186,
                        "y": 109,
                        "panelLocalType": 8,
                        "isShowPanel": false,
                        "panelX": -109,
                        "panelY": 45
                    },
                    {
                        "data": {},
                        "x": 228,
                        "y": 93,
                        "panelLocalType": 8,
                        "isShowPanel": false,
                        "panelX": -135,
                        "panelY": 37
                    },
                    {
                        "data": {},
                        "x": 260,
                        "y": 88,
                        "panelLocalType": 8,
                        "isShowPanel": false,
                        "panelX": -1,
                        "panelY": 44
                    },
                    {
                        "data": {},
                        "x": 367,
                        "y": 114,
                        "panelLocalType": 8,
                        "isShowPanel": false,
                        "panelX": -1,
                        "panelY": 44
                    },
                    {
                        "data": {},
                        "x": 329,
                        "y": 117,
                        "panelLocalType": 8,
                        "isShowPanel": false,
                        "panelX": -1,
                        "panelY": 44
                    },
                    {
                        "data": {},
                        "x": 513,
                        "y": 145,
                        "panelLocalType": 8,
                        "isShowPanel": false,
                        "panelX": -1,
                        "panelY": 44
                    },
                    {
                        "data": {},
                        "x": 515,
                        "y": 199,
                        "panelLocalType": 8,
                        "isShowPanel": false,
                        "panelX": -1,
                        "panelY": 44
                    }
                ]
    
    */
    
    
    

    export default {
        name: "Index",
        data() {
            return {
                imgSrc: testImg,
                
                area: [],
                localX: 0,
                localY: 0,
                delNumber: 0,
                zoomNum: 1,
                showPanel: false,
                panelNumber: 0,
                panelType: 8,
                panelIndex: 0,

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
