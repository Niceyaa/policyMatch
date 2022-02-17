<template>
    <div class="projectDetail">
        <div v-html="dataInfo.snapshot"></div>
        <div class="back-wrapper" @click="back">返回</div>
    </div>

</template>

<script>
    import {getDetail} from "@/utils/api";
    import {useRouter, useRoute} from 'vue-router'
    import {reactive, defineComponent, onMounted, toRefs, ref} from 'vue'

    export default defineComponent({
        name: 'detail',
        setup() {
            /*interface data{
                snapshot:any,
                [prop:string]:any
            }*/
            const recordId = ref(0)

            const router = useRouter()
            const route = useRoute()
            let reactiveData = reactive({
                dataInfo: {}
            })

            onMounted(() => {
                recordId.value = route.query['recordId']
                initData()
            })


            function back() {
                router.replace({
                    path: '/matchList',
                    query: {
                        id: recordId.value
                    }
                })
            }

            function initData() {
                let prm = {
                    policyId: route.query['id']
                }
                getDetail(prm).then(res => {
                    reactiveData.dataInfo = res.data.result
                    document.title = reactiveData.dataInfo['title']
                })
            }

            return {
                router,
                recordId,
                back,
                ...toRefs(reactiveData)
            }
        },
    })
</script>
<style lang="less">
    .projectDetail {
        width: 100%;
        min-height: 100%;
        padding: 10px 10px 80px 10px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        color: #333;
        font-size: 14px;


        ul {
            list-style-type: disc;
            list-style-position: inside;
        }

        ol {
            list-style-type: decimal;
            list-style-position: inside;
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

        .title {
            padding: 0 0 20px 0;
            font-size: 20px;
            color: #000;
            font-weight: bold;
        }

        .info-wrapper {
            margin-bottom: 20px;
            padding: 20px 10px;
            border-radius: 10px;
            background: #d7efff;

            .info-title {
                font-weight: bold;
                font-size: 16px;
                color: #000;
                margin-bottom: 8px;
            }

            .info-content {
                font-size: 14px;
                line-height: 26px;
            }

            .download-wrapper {
                span {
                    line-height: 26px;
                    margin-right: 20px;
                }
            }
        }
    }
</style>
