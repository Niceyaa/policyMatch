<template>
    <div class="home">
        <img class="banner-img" src="../assets/img/banner@2x.png" alt="">
        <div class="home-main">
            <router-link replace to="/MatchCondition/1" class="link-item">
                <div class="sign"></div>
                <div class="item-left">
                    <img src="../assets/img/icon_prepare@2x.png" alt="">
                    <span>准备创业</span>
                </div>
                <div class="item-right">
                    <span>进入试算</span>
                    <img src="../assets/img/icon_enter@2x.png" alt="">
                </div>
            </router-link>
            <router-link replace to="/MatchCondition/4" class="link-item">
                <div class="sign complete"></div>
                <div class="item-left complete">
                    <img src="../assets/img/icon_complete@2x.png" alt="">
                    <span>已经创业</span>
                </div>
                <div class="item-right">
                    <span>进入试算</span>
                    <img src="../assets/img/icon_enter@2x.png" alt="">
                </div>
            </router-link>
        </div>
        <div class="btm-info">
            <div class="info">试算结果仅供参考，具体详情请咨询：</div>
            <div class="info">上海市浦东新区三林镇社区事务受理服务中心</div>
            <div class="info">服务电话：<a :href="'tel:'+tel">{{tel}}</a></div>

        </div>
    </div>

</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from 'vue'
    import {useRouter} from 'vue-router'
    import {getTelephone} from "@/utils/api";


    export default defineComponent({
        name: 'Home',
        setup() {
            onMounted(() => {
                document.title = '创业指南'
                getTel()
            })

            let tel = ref(0)
            function getTel() {
                getTelephone().then(res=>{
                    tel.value = res.data.result
                })
            }

            const router = useRouter()

            function goToUrl(id: number) {
                router.replace({
                    path: `/MatchCondition/${id}`
                })
            }

            return {
                tel,
                goToUrl
            }
        },
    })
</script>
<style lang="less">
    .home {
        width: 100%;
        min-height: 100%;
        padding-bottom: 50px;

        .banner-img {
            width: 100%;
            height: auto;
            margin-bottom: 30px;
        }

        .home-main {

            padding: 0 2.6vw;

            .link-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                height: 24vw;
                background: #FFFFFF;
                box-shadow: 0px 0px 10px 0px rgba(18, 119, 136, 0.13);
                border-radius: 8px;
                position: relative;
                margin-bottom: 16px;
                padding: 0 8vw 0 3.73vw;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                text-decoration: none;

                .sign {
                    position: absolute;
                    left: 0;
                    top: 4vw;
                    width: 3px;
                    height: 16vw;
                    background: #039BF9;

                    &.complete {
                        background: #23D3D5;
                    }
                }

                .item-left {
                    display: flex;
                    align-items: center;
                    font-size: 21px;
                    font-family: PingFangSC-Semibold, PingFang SC;
                    font-weight: 600;
                    color: #039BF9;

                    &.complete {
                        color: #36C9C5;
                    }

                    img {
                        width: 17.06vw;
                        height: auto;
                        margin-right: 2.6vw;
                    }
                }

                .item-right {
                    font-size: 13px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #A8A7A7;
                    display: flex;
                    align-items: center;

                    img {
                        width: 1.6vw;
                        height: auto;
                        margin-left: 2.6vw;
                    }
                }

            }
        }

        .btm-info{
            position: fixed;
            bottom: 60px;
            left: 0;
            -margin-top: 18vh;
            width: 100%;
            .info{
                display: block;
                text-align: center;
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #A9ABAC;
                margin-bottom: 4px;
                text-decoration: none;
                a{
                    text-decoration: none;
                    color: #039BF9;
                }
            }

        }

    }
</style>
