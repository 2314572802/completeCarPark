  <<template>
    <div id="app">
    <img :src="logo">
      <el-row :gutter="20">
        <el-col :span="8" :offset="8">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
            <el-form-item label="账号" prop="admName">
              <el-input placeholder="请输入账号" v-model.number="ruleForm.admName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="admPwd">
              <el-input type="password" placeholder="请输入密码" v-model="ruleForm.admPwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" placeholder="请再次输入密码" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        </el-col>
      </el-row>
    </div>
</template>
<script>
import logo from "../assets/停车场logo.png";

export default {
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.admPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        admName: "",
        admPwd: "",
        checkPass: "",
      },
      rules: {
        admName: [{ validator: checkName, trigger: "blur" }],
        admPwd: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      logo,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios({
            method: "post",
            url: "http://localhost:8088/carpark/insertAdmin",
            data: this.ruleForm,
          }).then((response) => {
            console.log(response.data);
            if (response.data) {
              this.$message({
                message: "注册成功！",
                type: "success",
              });
              this.$router.push({ path: "/log" });
            } else {
              this.$message.error("注册失败！请重置！");
            }
          });
        } else {
          console.log(valid);
          this.$message.error("注册失败！");
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
</style>