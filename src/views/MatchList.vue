<template>
    <div class="detail">
        <div class="red-tips">该结果仅供参考，具体详情请咨询：{{tel}}</div>
        <div @click="goToUrl(item)" class="show-item" v-for="item in listData" :key="item.projectId">
            <div class="item-title">{{item.title}}</div>
            <div class="amount-wrapper">
                <div class="average-amount">补贴标准：{{item.subsidyStandard}}</div>
                <div class="high-amount">查看
                    <img src="../assets/img/icon_details@2x.png" alt="">
                </div>
            </div>
        </div>
        <div class="no-content" v-if="!listData">根据你提交的条件，暂无符合的补贴政策。</div>

        <div class="back-wrapper" @click="router.push({path:'/'})">返回</div>

    </div>

</template>

<script>
    import {getMatchDetail, getTelephone} from "@/utils/api";
    import {ref, defineComponent, reactive, onMounted, toRef} from 'vue'
    import {useRoute,useRouter} from 'vue-router'

    export default defineComponent({
        name: 'detail',
        setup() {
            let tel = ref(0)
            let recordId = ref(0)
            const route = useRoute()
            const router = useRouter()
            let reactiveData = reactive({
                listData: []
            })
            onMounted(() => {
                document.title = '可补贴政策'
                initData()
                getTel()
            })

            function initData() {
                recordId.value = route.query.id
                let prm = {
                    recordId: recordId.value
                }
                getMatchDetail(prm).then(res => {
                    reactiveData.listData = res.data.result
                })
            }

            function getTel() {
                getTelephone().then(res => {
                    tel.value = res.data.result
                })
            }

            function goToUrl(info) {
                router.push({
                    path: '/projectDetail',
                    query: {
                        id: info.policyId
                    }
                })
            }

            return {
                recordId,
                tel,
                listData: toRef(reactiveData, 'listData'),
                router,

                goToUrl
            }
        },
    })
</script>
<style lang="less">
    .detail {
        width: 100%;
        min-height: 100%;
        padding: 10px 10px 100px 10px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;

        .red-tips {
            font-size: 14px;
            color: red;
            margin-bottom: 10px;
        }

        .back {
            font-size: 20px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;

            span {
                font-size: 16px;
                color: gray;
            }
        }

        .back-wrapper {
            width: 80vw;
            height: 40px;
            position: fixed;
            left: 10vw;
            bottom: 40px;
            border-radius: 20vw;
            color: #fff;
            background: #0084ff;
            text-align: center;
            line-height: 40px;
        }

        .show-item {
            padding: 15px;
            font-size: 14px;
            background: #d7efff;
            margin-bottom: 15px;
            border-radius: 10px;
            color: #333;

            .item-title {
                margin-bottom: 10px;
                font-weight: bold;
            }

            .amount-wrapper {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .high-amount {
                    width: 50px;
                    min-width: 50px;
                    color: #0084ff;
                    font-size: 14px;
                    img{
                        width: 6px;
                        height: auto;
                        margin-left: 4px;
                    }
                }
            }
        }

        .no-content {
            text-align: center;
        }
    }
</style>
