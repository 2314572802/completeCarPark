<template>
  <div>
    <el-main>
        <img :src="logo" class="welcomePic"/>
    </el-main>
  </div>
</template>
<script>
import logo from '@/assets/欢迎使用本系统.png'
export default {
    data(){
        return{
            logo
        };
    },
}
</script>

<style>
.welcomePic{
    margin-top: 15%;
}
</style>