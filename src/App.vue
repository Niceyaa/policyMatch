<template>
    <div class="app">
        <router-view v-slot="{ Component }">
            <keep-alive v-if="route.meta.keepAlive">
                <component :is="Component" />
            </keep-alive>
            <component :is="Component" v-else/>
            <!--<div v-if="route.meta.keepAlive">
                <keep-alive>
                    <component :is="Component" />
                </keep-alive>
            </div>
            <div v-else>
                <component :is="Component" />
            </div>-->
        </router-view>
       <!-- <keep-alive>
            <router-view v-if="route.meta.keepAlive" :key="$route.path"></router-view>
        </keep-alive>
        <router-view v-if="!route.meta.keepAlive" :key="route.path"></router-view>-->
        <div v-show="route.meta.showTabBar" class="footer-tab">
            <router-link to="/" :class="{'tab-item':true,'active':route.name==='Index'}">
                <img class="default-icon" src="./assets/img/icon_policy_normal@2x.png" alt="">
                <img class="active-icon" src="./assets/img/icon_policy_selected@2x.png" alt="">
                <div>政策试算</div>
            </router-link>
            <router-link to="/RecordPage" :class="{'tab-item':true,'active':route.name==='RecordPage'}">
                <img class="default-icon" src="./assets/img/icon_record_normal@2x.png" alt="">
                <img class="active-icon" src="./assets/img/icon_record_selected@2x.png" alt="">
                <div>试算记录</div>
            </router-link>
        </div>
        <!--<van-tabbar v-show="route.meta.showTabBar" route>
            <van-tabbar-item to="/">
                <span>政策试算</span>
                <template #icon="props">
                    <img :src="props.active ? iconPolicy.active : iconPolicy.inactive"/>
                </template>
            </van-tabbar-item>
            <van-tabbar-item to="/RecordPage">
                <span>试算记录</span>
                <template #icon="props">
                    <img :src="props.active ? iconRecord.active : iconRecord.inactive"/>
                </template>
            </van-tabbar-item>
        </van-tabbar>-->
    </div>


</template>

<script lang="ts">
    import {getUserCode} from "@/utils/api";
    import {defineComponent, onMounted} from 'vue';
    import {useRoute} from 'vue-router'

    // import {Tabbar, TabbarItem} from 'vant'
    // import 'vant/es/tabbar/style/index'
    // import 'vant/es/tabbar-item/style/index'

    import defaultPolicyIcon from './assets/img/icon_policy_normal@2x.png'
    import activePolicyIcon from './assets/img/icon_policy_selected@2x.png'

    import defaultRecordIcon from './assets/img/icon_record_normal@2x.png'
    import activeRecordIcon from './assets/img/icon_record_selected@2x.png'

    export default defineComponent({
        name: 'App',
        // components: {
        //     [Tabbar.name]: Tabbar,
        //     [TabbarItem.name]: TabbarItem
        // },
        setup() {
            onMounted(() => {
                const userCode = localStorage.getItem('policyMatchUserCode')
                if (!userCode) {
                    getUserCode().then(res => {
                        localStorage.setItem('policyMatchUserCode', res.data.result)
                    })
                }
            })

            const route = useRoute()

            console.log('route',route.meta)

            const iconPolicy = {
                active: activePolicyIcon,
                inactive: defaultPolicyIcon,
            };
            const iconRecord = {
                active: activeRecordIcon,
                inactive: defaultRecordIcon,
            };
            return {
                iconPolicy,
                iconRecord,
                route,
            };
        },
    });
</script>

<style lang="less">
    .app {
        height: 100%;

        .footer-tab {
            width: 100%;
            position: fixed;
            left: 0;
            bottom: 0;
            height: 50px;
            background: #FFFFFF;
            border-top: 1px solid #eee;
            display: flex;
            align-items: center;

            .tab-item {
                text-decoration: none;
                flex: 1;
                text-align: center;
                font-size: 13px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #666666;

                &.active {
                    color: #039BF9;

                    img {
                        width: 26px;
                        height: 26px;

                        &.default-icon {
                            display: none;
                        }

                        &.active-icon {
                            display: block;
                        }
                    }
                }
                img {
                    width: 26px;
                    height: 26px;
                    margin: 0 auto;

                    &.default-icon {
                        display: block;
                    }

                    &.active-icon {
                        display: none;
                    }
                }
            }
        }
    }

</style>
