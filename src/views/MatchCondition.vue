<template>
    <div class="home">
        <div class="condition-item" v-for="(item,idx) in showData" :key="item.id">
            <div class="item-label"><span>*</span>{{item.name}}</div>
            <div class="item-right" @click="changeFlag(idx)">
                <div :class="{'name':selectedVal[idx].name}">{{selectedVal[idx].name?selectedVal[idx].name:'请选择'}}</div>
                <img src="../assets/img/icon_enter@2x.png" alt="">
            </div>
        </div>

        <div v-show="allData.length>0" class="assessment-btn" @click="goToUrl">立即评估</div>
        <van-popup v-for="(item,idx) in allData" :show="allFlag[idx]" round position="bottom" :key="item.id">
            <van-cascader
                    :closeable="false"
                    :title="item.name"
                    :options="ansData[idx]"
                    :field-names="fieldNames"
                    @change="onChangeData($event,idx)"
            ></van-cascader>
        </van-popup>
    </div>

</template>

<script lang="ts">
    import {getEnumData, getChildQuestionAnswerNew, policyMatch} from "@/utils/api";
    import {defineComponent, ref, reactive, onMounted, toRefs, computed, watch, watchEffect} from 'vue'
    import {useRoute, useRouter} from 'vue-router'
    import {Toast, Cascader, Popup} from 'vant'
    import 'vant/lib/cascader/style/index'
    import 'vant/lib/popup/style/index'
    import 'vant/lib/toast/style/index'

    export default defineComponent({
        name: 'Home',
        components: {
            [Cascader.name]: Cascader,
            [Popup.name]: Popup
        },
        setup() {
            const route = useRoute()
            const router = useRouter()
            let classifyId: unknown

            let additionStr = ref('')

            let isShowFlag = ref(false)


            onMounted(() => {
                document.title = '政策试算'
                classifyId = route.params['id']
                initData()
            })
            const fieldNames = {
                text: 'name',
                value: 'id',
                children: 'answerBOList'
            }

            interface arrayData {
                allData: Array<any>,
                allFlag: Array<boolean>,
                ansData: Array<any>,
                selectedVal: Array<string>,

                [prop: string]: any
            }

            let arrData: arrayData = reactive({
                allData: [],
                allFlag: [],
                ansData: [],
                selectedVal: [],
                additionData: [],
                showData: []
            })

            // 显示非附加条件
           /* let showData = computed({
                get: () => {
                    return arrData.allData.filter(item => {
                        return item.additionalConditions.length === 0 || isShowFlag.value
                    })
                },
                set: (value) => {
                    console.log('set', value[value.length - 1])
                },
            })*/



            // 初始化数据
            function initData() {
                let prm = {
                    classifyId: classifyId
                }
                getEnumData(prm).then(res => {
                    const {result} = res.data
                    arrData.allData = result
                    arrData.allData.forEach((item) => {
                        if (item.additionalConditions && item.additionalConditions.length > 0) {
                            additionStr.value = item.additionalConditions
                            arrData.additionData.push(item)
                        }else{
                            arrData.showData.push(item)
                        }
                        arrData.ansData.push(item.answerBOList)
                        arrData.allFlag.push(false)
                        arrData.selectedVal.push("$")
                    })
                })
            }

            // 控制弹出框
            function changeFlag(idx: number, flag = true) {
                arrData.allFlag[idx] = flag
            }

            interface optionsData {
                selectedOptions: Array<any>,
                tabIndex: number,
                value: string
            }

            // 选择条件改变时
            function onChangeData(options: optionsData, idx: number) {
                const {selectedOptions, tabIndex, value} = options
                console.log(selectedOptions, idx)
                let len = selectedOptions.length - 1
                if (!selectedOptions[len].isSub) {
                    arrData.selectedVal[idx] = selectedOptions[len]
                    changeFlag(idx, false)
                    // if (additionStr.value.length > 0) {
                    if (arrData.additionData.length > 0) {
                        let additionNum = arrData.selectedVal.filter(item=>{
                            return item==='$'
                        }).length
                        if (additionNum <= arrData.additionData.length) {
                            let newArr:Array<any> = []
                            for (let j = 0; j < arrData.allData.length; j++) {
                                if (arrData.allData[j].additionalConditions.length > 0) {
                                    for (let i = 0; i < arrData.selectedVal.length; i++) {
                                        // if (additionStr.value.includes(arrData.selectedVal[i]['id'])) {
                                        if (arrData.allData[j].additionalConditions.includes(arrData.selectedVal[i]['id'])) {
                                            console.log('包含值了吗')
                                            newArr.push(arrData.allData[j])
                                            // isShowFlag.value = true
                                            break
                                        } else {
                                            // isShowFlag.value = false
                                        }
                                        // if (isShowFlag) break
                                    }
                                }else{
                                    newArr.push(arrData.allData[j])
                                }

                            }
                            arrData.showData = newArr
                        }
                    }
                }
            }

            function goToUrl() {
                console.log('classifyId', classifyId)
                /*if (arrData.selectedVal.includes('$')) {
                    Toast('请填写完所有的条件');
                    return
                }*/
                let normalArr = arrData.selectedVal.filter(item=>{
                    return item !== '$'
                })
                // console.log(arrData.selectedVal.length)
                // console.log(normalArr)
                // console.log(arrData.showData.length)
                if (normalArr.length !== arrData.showData.length) {
                    Toast('请填写完所有的条件');
                    return
                }
                const selectedArr = normalArr.map((item: any) => {
                    return item.id
                })
                const prm = {
                    "policyClassifyId": classifyId,
                    "selectConditions": selectedArr,
                    "userCode": localStorage.getItem('policyMatchUserCode')
                }
                policyMatch(prm).then(res => {
                    const {data} = res
                    if (data.code === 200) {
                        router.push({
                            path: '/matchList',
                            query: {
                                id: data.result.recordId
                            }
                        })
                    }
                })
            }

            return {
                classifyId,
                fieldNames,
                ...toRefs(arrData),

                // showData,

                // 方法
                changeFlag,
                onChangeData,
                goToUrl
            }

        },
    })
</script>
<style lang="less">
    .home {
        width: 100%;
        height: 100%;

        .condition-item {
            border-bottom: 1px solid #eee;
            height: 66px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            font-size: 16px;
            font-family: "Microsoft YaHei UI";
            color: #333;

            .item-label {
                min-width: 140px;
                flex: 0 140px;

                span {
                    color: red;
                }

                &.item-input-label {
                    min-width: 70px;
                    flex: 0 70px;
                }
            }

            .item-right {
                &.input-item-right {
                    flex: 1;
                }

                .van-field {
                    padding: 10px 0;
                }

                display: flex;
                align-items: center;
                font-size: 16px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #A8A7A7;

                .name {
                    color: #333;
                }

                img {
                    width: 6px;
                    height: 12px;
                    margin-left: 7px;
                }
            }
        }

        .assessment-btn {
            width: 68%;
            margin: 20px 0 0 16%;
            height: 50px;
            text-align: center;
            line-height: 50px;
            font-size: 17px;
            background: #1989fa;
            color: #fff;
            border-radius: 4px;
        }
    }
</style>
