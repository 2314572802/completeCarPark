<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8" :offset="8">
        <el-form label-width="80px" :model="formLabelAlign">
          <el-form-item label="账号">
            <el-input
              placeholder="请输入账号"
              v-model="formLabelAlign.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              placeholder="请输入密码"
              v-model="formLabelAlign.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="primary" @click="register">注册</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//const axios = require('axios');

export default {
  name: "HelloWorld",
  data() {
    return {
      formLabelAlign: {
        name: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      let name = this.formLabelAlign.name;
      let password = this.formLabelAlign.password;
      let params = new URLSearchParams();
      params.append("admName", name);
      params.append("admPwd", password);
      // axios({
      //   method: "POST",
      //   url: "carpark/queryParkInfo",
      //   data: params,
      // })
      // .then((res) => {
      //   //console.log(res.data);
      //   //if

      // })
    },
    register(){
        this.$router.push({path:"/reg"})
    }
  },
};
</script>
<style scoped>
</style>
