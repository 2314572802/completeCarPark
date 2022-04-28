<template>
  <div>
    <el-main>
      <div class="from-left">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <el-descriptions class="margin-top" :column="1" :size="size" border>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user"></i>
                用户名
              </template>
              {{ ruleForm.admName }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-mobile-phone"></i>
                手机号
              </template>
              {{ ruleForm.admPhone }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-female"></i>
                性别
              </template>
              {{ ruleForm.admGender == 1 ? "男" : "女" }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-location-outline"></i>
                年龄
              </template>
              {{ ruleForm.admAge }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-chat-dot-round"></i>
                邮箱
              </template>
              {{ ruleForm.admEmail }}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </div>

      <div class="from-right">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>基本资料</span>
          </div>
          <template>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="个人信息" name="first"></el-tab-pane>
              <el-tab-pane label="修改密码" name="second"></el-tab-pane>
            </el-tabs>
          </template>
          <div v-show="showUser">
            <el-form
              label-width="80px"
              class="demo-ruleForm"
              :rules="rules"
              ref="ruleForm"
              :model="ruleForm"
            >
              <!--vue,如果key就不会渲染;所以,在添加和修改不同的状态下,都需要2个资产编号框,给不同prop属性-->
              <el-row>
                <el-col :span="10">
                  <el-form-item label="账号" prop="admName">
                    <el-input
                      v-model="ruleForm.admName"
                      size="medium"
                      :readonly="true"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2">&nbsp;&nbsp;</el-col>
                <el-col :span="10">
                  <el-form-item label="手机号" prop="admPhone">
                    <el-input
                      v-model="ruleForm.admPhone"
                      size="medium"
                      clearable
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="邮箱" prop="admEmail">
                    <el-input
                      v-model="ruleForm.admEmail"
                      size="medium"
                      clearable
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2">&nbsp;&nbsp;</el-col>
                <el-col :span="10">
                  <el-form-item label="性别" prop="admGender">
                    <el-radio-group v-model="ruleForm.admGender" size="medium">
                      <el-radio :label="1">男</el-radio>
                      <el-radio :label="0">女</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="年龄" prop="admAge">
                    <el-input
                      v-model="ruleForm.admAge"
                      size="medium"
                      clearable
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item>
                <!--注册的提交按钮-->
                <el-button>取消</el-button>
                <el-button type="primary" @click="handleUpdateUser('ruleForm')"
                  >保存</el-button
                >
              </el-form-item>
            </el-form>
          </div>
          <div v-show="showPwd">
            <el-form
              :model="ruleFormPwd"
              status-icon
              :rules="rulesPwd"
              ref="ruleFormPwd"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-row>
                <el-col :span="10">
                  <el-form-item label="原密码" prop="oldPwd">
                    <el-input
                      type="password"
                      v-model="ruleFormPwd.oldPwd"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="新密码" prop="newPwd">
                    <el-input
                      type="password"
                      v-model="ruleFormPwd.newPwd"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="确认密码" prop="confirmPwd">
                    <el-input
                      type="password"
                      v-model="ruleFormPwd.confirmPwd"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item>
                <el-button @click="resetForm('ruleFormPwd')">重置</el-button>
                <el-button type="primary" @click="updateAdmPwd('ruleFormPwd')"
                  >提交</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </div>
    </el-main>
  </div>
</template>

<script>
export default {
  name: "admInfo",
  data() {
    let validateOldPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入原密码"));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleFormPwd.confirmPwd !== "") {
          this.$refs.ruleFormPwd.validateField("confirmPwd");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleFormPwd.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    // 设置手机号的验证规则
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入联系方式"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的电话"));
        }
      }
    };
    // 验证邮箱
    const validateEmail = (rule, value, callback) => {
      if (
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(value) ||
        !value
      ) {
        callback();
      } else {
        callback(new Error("请输入正确邮箱"));
      }
    };
    return {
      size: "medium",
      activeName: "",
      showUser: true,
      showPwd: false,
      ruleForm: {
        admId: "",
        admName: "",
        admPwd: "",
        admPhone: "",
        admEmail: "",
        admGender: "",
        admAge: "",
      },
      ruleFormPwd: {
        newPwd: "",
        confirmPwd: "",
        oldPwd: "",
      },
      rules: {
        /*对应el-form-item的prop属性*/
        userName: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        admPhone: [
          {
            type: "string",
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          }, // 必填校验
          { validator: checkPhone, trigger: "blur" },
        ],
        admAge: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        admGender: [
          { required: true, message: "请选择性别", trigger: "change" },
        ],
        admEmail: [
          { required: true, message: "请输入邮箱", trigger: "blur" }, // 必填校验
          { validator: validateEmail, trigger: "blur" },
        ],
      },
      rulesPwd: {
        oldPwd: [{ validator: validateOldPwd, trigger: "blur" }],
        newPwd: [{ validator: validatePass, trigger: "blur" }],
        confirmPwd: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    findAdminInfo() {
      this.axios({
        method: "get",
        url: "http://localhost:8088/carpark/queryAdminByName4Info",
      }).then((response) => {
        console.log(response.data);
        this.ruleForm.admId = response.data.admId;
        this.ruleForm.admName = response.data.admName;
        this.ruleForm.admPhone = response.data.admPhone;
        this.ruleForm.admEmail = response.data.admEmail;
        this.ruleForm.admGender = response.data.admGender;
        this.ruleForm.admAge = response.data.admAge;
      });
    },
    handleUpdateUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let admInfo = new URLSearchParams();
          admInfo.append("admName", this.ruleForm.admName);
          admInfo.append("admPhone", this.ruleForm.admPhone);
          admInfo.append("admEmail", this.ruleForm.admEmail);
          admInfo.append("admGender", this.ruleForm.admGender);
          admInfo.append("admAge", this.ruleForm.admAge);
          //添加部门信息
          this.axios({
            method: "put",
            url: "http://localhost:8088/carpark/updateAdmInfo",
            data: admInfo,
          })
            .then((response) => {
              //判断是否成功
              if (response.data == 1) {
                //添加成功后,刷新页面
                this.$message.success("个人信息修改成功");
                this.findAccountInfo();
              } else if (response.data == 0) {
                this.$message.error("个人信息修改失败");
              }
            })
            .catch((err) => {
              //输出错误消息
              console.info(err);
            });
        } else {
          console.log("error update!!");
          return false;
        }
      });
    },
    updateAdmPwd(formName) {
      this.$confirm("此操作将修改密码, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let admPWds = new URLSearchParams();
              admPWds.append("admName", this.ruleForm.admName);
              admPWds.append("oldPwd", this.ruleFormPwd.oldPwd);
              //设置修改后的密码
              admPWds.append("pwd", this.ruleFormPwd.newPwd);
              axios({
                method: "put",
                url: "http://localhost:8088/carpark/updateAdmPwd",
                data: admPWds,
              })
                .then((response) => {
                  //判断是否成功
                  if (response.data == 1) {
                    this.$message.success("密码修改成功！请重新登陆");
                    setTimeout("top.location.href = 'logout'", 1000);
                  } else if (response.data == 0) {
                    this.$message.error("密码修改失败");
                  } else if (response.data == -1) {
                    this.$message.error("原密码错误，密码修改失败");
                  }
                })
                .catch((err) => {
                  console.info(err);
                });
            } else {
              console.log("error update!");
              return false;
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "密码暂不支持修改",
          });
        });
    },
    handleClick(tab, event) {
      if (tab.index == 0) {
        this.showUser = true;
        this.showPwd = false;
      } else if (tab.index == 1) {
        this.showUser = false;
        this.showPwd = true;
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created: function () {
    this.findAdminInfo();
  },
};
</script>

<style>
.from-left {
  float: left;
  min-width: 30%;
}

.from-right {
  float: left;
  padding-left: 30px;
  min-width: 60%;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 132px;
  height: 132px;
  line-height: 132px;
  text-align: center;
}
.avatar {
  width: 132px;
  height: 132px;
  display: block;
}
</style>