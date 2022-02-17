<template>
  <div class="home">
    <img class="title-img" src="../assets/img/top_title.png" alt="">
    <img @click="goToUrl(1)" class="prepare-img" src="../assets/img/btn_prepare.png" alt="">
    <img @click="goToUrl(4)" class="already-img" src="../assets/img/btn_already.png" alt="">
  </div>

</template>

<script lang="ts">
  import {defineComponent,onMounted} from 'vue'
  import {useRouter} from 'vue-router'
  export default defineComponent( {
    name: 'Home',
    setup(){
      onMounted(()=>{
        document.title = '补贴试算'
      })

      const router = useRouter()

      function goToUrl(id:number) {
        router.replace({
          path: `/MatchCondition/${id}`
        })
      }
      return {
        goToUrl
      }
    },
    beforeRouteLeave(to,from,next){
      // to.meta.keepAlive = false
      next()
      console.log(to)
      console.log(from)
      console.log(next)
    },
  })
</script>
<style lang="less">
  .home {
    width: 100%;
    min-height: 100%;
    .title-img{
      width: 100%;
      height: auto;
    }
    .prepare-img{
      width: 96.4vw;
      height: auto;
      margin: -18.1vw 1.8vw 16vw 1.8vw;
    }
    .already-img{
      width: 96.4vw;
      height: auto;
      margin: -16vw 1.8vw 0 1.8vw;
    }
  }
</style>
