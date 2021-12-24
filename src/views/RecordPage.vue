<template>
    <div class="record-container" v-if="listData.length>0">
        <div class="record-list">
            <router-link :to="'/matchList?id='+item.recordId" class="list-item" v-for="item in listData">
                <div class="date">试算时间：<span>{{item.accessTime}}</span></div>
                <div class="item-btm">
                    <div class="num">可补贴政策数：<span>{{item.projectNum}}条</span></div>
                    <div class="detail-btn">
                        <span>查看详情</span>
                        <img src="../assets/img/icon_details@2x.png" alt="">
                    </div>
                </div>
            </router-link>
        </div>
    </div>
    <div class="none-container" v-else>
        <div class="empty-list">
            <img src="../assets/img/empty@2x.png" alt="">
            <div>暂无试算记录</div>
        </div>
    </div>
</template>

<script lang="ts">
    import {getRecordList} from "@/utils/api";
    import {defineComponent, onMounted, reactive, toRef} from 'vue'

    export default defineComponent({
        name: 'RecordPage',
        setup() {

            let reactiveData = reactive({
                listData: []
            })

            onMounted(() => {
                document.title = '试算记录'
                let userCode = localStorage.getItem('policyMatchUserCode')
                let prm = {
                    userCode
                }
                getRecordList(prm).then(res => {
                    reactiveData.listData = res.data.result
                })
            })
            return {
                listData: toRef(reactiveData, 'listData')
            }
        }
    })
</script>
<style lang="less">
    .record-container {
        width: 100%;
        min-height: 100%;
        padding: 4.2vw 4.2vw 50px 4.2vw;
        background: #F4F4F4;

        .record-list {
            .list-item {
                display: block;
                text-decoration: none;
                height: 25.6vw;
                width: 100%;
                background: #FFFFFF;
                border-radius: 10px;
                padding: 6.5vw 4.2vw 0 4.2vw;
                font-size: 15px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #8B8B8B;
                margin-bottom: 4.2vw;

                .date {
                    margin: 0 0 4vw 0;
                }

                span {
                    color: #272626;
                }

                .item-btm {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .detail-btn {
                        span {
                            font-size: 14px;
                            font-family: PingFangSC-Regular, PingFang SC;
                            color: #039BF9;
                        }

                        img {
                            width: 1.6vw;
                            height: auto;
                            margin-left: 1.6vw;

                        }
                    }
                }
            }
        }

    }
    .none-container {
        width: 100%;
        min-height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #F4F4F4;
        padding:0 0 50px 0;


        .empty-list {
            width: 100%;
            text-align: center;
            font-size: 15px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #4F4F4F;

            img {
                width: 55.2vw;
                height: auto;
                margin-bottom: 2.1vw;
            }

        }


    }
</style>
