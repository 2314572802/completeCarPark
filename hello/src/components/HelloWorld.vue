<template>
<!-- <div class="background_style"> -->
  <div id="app">
    <img :src="logo" />
    <el-row :gutter="20">
      <el-col :span="8" :offset="8">
        <el-form label-width="80px" :model="formLabelAlign">
          <el-form-item label="账号">
            <el-input
              placeholder="请输入账号"
              v-model="formLabelAlign.admName"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              placeholder="请输入密码"
              v-model="formLabelAlign.admPwd"
              show-password
            ></el-input>
          </el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="primary" @click="register">注册</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
<!-- </div> -->
</template>

<script>
import logo from "../assets/停车场logo.png";

export default {
  name: "HelloWorld",
  data() {
    return {
      formLabelAlign: {
        admName: "",
        admPwd: "",
      },
      logo,
    };
  },
  methods: {
    login() {
      this.axios({
        method: "post",
        url: "http://localhost:8088/carpark/queryParkInfo",
        data: this.formLabelAlign,
      }).then((response) => {
        console.log(response.data);
        if (response.data) {
          this.$message({
            message: "登录成功",
            type: "success",
          });
          this.$router.push({ path: "/main" });
        } else {
          this.$message.error("登录失败！请重试！");
        }
      });
    },
    register() {
      this.$router.push({ path: "/reg" });
    },
  },
};
</script>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
/* .background_style{
width:100%;
height:100%;
position:fixed;
background-size:100% 100%;
background-repeat: no-repeat;
background-image: url("../assets/登录背景.png");
} */
</style>
