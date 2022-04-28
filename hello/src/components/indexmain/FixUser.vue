<template>
  <div>
    <el-main>
      <!-- 模糊查询 -->
      <el-input
        v-model="select"
        placeholder="请输入车牌号"
        clearable
        size="medium"
        style="width: 20%"
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        size="medium" 
        @click="conditionQuery" 
        >搜索</el-button
      >
      <!-- 新增 -->
      <el-button type="text" style="float: right" @click="insert = true"
        >新增</el-button
      >
      <!-- 表单 -->
      <el-table :data="tableData" style="width: 100%" max-height="450">
        <el-table-column
          fixed
          prop="userId"
          label="车主编号"
          width="166"
        ></el-table-column>
        <el-table-column
          prop="userName"
          label="车主姓名"
          width="166"
        ></el-table-column>
        <el-table-column
          prop="userPhone"
          label="车主电话"
          width="196"
        ></el-table-column>
        <el-table-column
          prop="userAge"
          label="车主年龄"
          width="166"
        ></el-table-column>
        <el-table-column prop="userGender" label="车主性别" width="166">
          <template slot-scope="scope">
            <template v-if="scope.row.userGender == 0"
              ><span>女</span></template
            >
            <template v-if="scope.row.userGender == 1"
              ><span>男</span></template
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="userCarNum"
          label="车牌号"
          width="196"
        ></el-table-column>
        <!-- 表单改删 -->
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              @click="updateRow(scope.$index, scope.row, tableData)"
              type="text"
              size="small"
              >更改</el-button
            >
            <el-button
              @click="deleteRow(scope.$index, scope.row, tableData)"
              type="text"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div style="float:left; padding-top: 10px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[7, 14, 21, 28]"
        :page-size="7"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      </div>
      <!-- 新增 -->
      <el-dialog title="新增车主" :visible.sync="insert">
        <el-form :model="form" ref="form">
          <el-form-item label="车主姓名" :label-width="formLabelWidth">
            <el-input
              v-model="form.userName"
              placeholder="请输入车主姓名"
              clearable
              size="medium"
              style="width: 40%"
            ></el-input>
          </el-form-item>
          <el-form-item label="车主电话" :label-width="formLabelWidth">
            <el-input
              v-model="form.userPhone"
              placeholder="请输入车主电话"
              clearable
              size="medium"
              style="width: 40%"
            ></el-input>
          </el-form-item>
          <el-form-item label="车主年龄" :label-width="formLabelWidth">
            <el-input
              v-model="form.userAge"
              placeholder="请输入车主年龄"
              clearable
              size="medium"
              style="width: 40%"
            ></el-input>
          </el-form-item>
          <el-form-item label="车主性别" :label-width="formLabelWidth">
            <el-input
              v-model="form.userGender"
              placeholder="请输入车主性别（1：男  0：女）"
              clearable
              size="medium"
              style="width: 40%"
            ></el-input>
          </el-form-item>
          <el-form-item label="车牌号" :label-width="formLabelWidth">
            <el-input
              v-model="form.userCarNum"
              placeholder="请输入车牌号"
              clearable
              size="medium"
              style="width: 40%"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="insert = false">取 消</el-button>
          <el-button type="primary" @click="userForm('form')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改 -->
      <el-dialog title="更改车主信息" :visible.sync="update">
        <el-form :model="userData" ref="userData" :rules="rules">
          <el-form-item
            label="车主姓名"
            prop="userName"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="userData.userName"
              placeholder="请输入车主姓名"
              clearable
              size="medium"
              style="width: 40%"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="车主电话"
            prop="userPhone"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="userData.userPhone"
              placeholder="请输入车主电话"
              clearable
              size="medium"
              style="width: 40%"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="车主年龄"
            prop="userAge"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="userData.userAge"
              placeholder="请输入车主年龄（1：男  0：女）"
              clearable
              size="medium"
              style="width: 40%"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="车主性别"
            prop="userGender"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="userData.userGender"
              placeholder="请输入车主性别"
              clearable
              size="medium"
              style="width: 40%"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="车牌号"
            prop="userCarNum"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="userData.userCarNum"
              placeholder="请输入车牌号"
              clearable
              size="medium"
              style="width: 40%"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="update = false">取 消</el-button>
          <el-button type="primary" @click="updateUser('userData')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
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

    return {
      rules: {
        userName: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" },
        ],
        userPhone: [
          {
            type: "string",
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          }, // 必填校验
          { validator: checkPhone, trigger: "blur" },
        ],
        userAge: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        userGender: [
          { required: true, message: "请选择性别", trigger: "change" },
        ],
      },
      select: "",
      tableData: [
        {
          userId: "",
          userName: "",
          userPhone: "",
          userAge: "",
          userGender: "",
          userCarNum: "",
        },
      ],
      insert: false,
      update: false,
      form: {
        userName: "",
        userPhone: "",
        userAge: "",
        userGender: "",
        userCarNum: "",
      },
      userData: {
        userName: "",
        userPhone: "",
        userAge: "",
        userGender: "",
        userCarNum: "",
      },
      formLabelWidth: "80px",
      pageCode: 1,//默认第一页
      pageSize: 7,//默认每页多少条
      total: 3,//总条数
      currentPage: 1,//默认显示第一页
    };
  },
  methods: {
    // 分页
    handleSizeChange(val) {

      this.userInfo(this.pageCode, val);
    },
    handleCurrentChange(val) {
      this.userInfo(val, this.pageSize);
    },
    userInfo(pageCode, pageSize) {
      let pageMsg = new URLSearchParams();
      pageMsg.append("pageCode", pageCode);
      pageMsg.append("val", pageSize);
      this.axios({
        method: "get",
        url: "http://localhost:8088/carpark/queryUserInfo?" + pageMsg,
        data: pageMsg,
      }).then((response) => {
        console.log(response.data);
        this.tableData = response.data.pageData;
        this.total = response.data.total;
      });
    },
    conditionQuery() {
      let userCarNum = new URLSearchParams();
      userCarNum.append("userCarNum", this.select);
      this.axios({
        method: "get",
        url:
          "http://localhost:8088/carpark/queryUserInfoByCarNum?" + userCarNum,
        data: this.userCarNum,
      }).then((response) => {
        console.log(response.data);
        this.tableData = response.data;
      });
    },
    userForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let userMsg = new URLSearchParams();
          userMsg.append("userName", this.form.userName);
          userMsg.append("userPhone", this.form.userPhone);
          userMsg.append("userAge", this.form.userAge);
          userMsg.append("userGender", this.form.userGender);
          userMsg.append("userCarNum", this.form.userCarNum);
          this.axios({
            method: "post",
            url: "http://localhost:8088/carpark/insertUserInfo",
            data: userMsg,
          }).then((response) => {
            console.log(response.data);
            if (response.data) {
              this.$message({
                message: "新增成功！",
                type: "success",
              });
              this.insert = false;
              this.userInfo();
            } else {
              this.$message.error("新增失败！请重试！");
            }
          });
        } else {
          console.log(valid);
          this.$message.error("新增失败！");
          console.log("error submit!!");
          return false;
        }
      });
    },
    updateRow(index, row, tableData) {
      this.update = true;
      this.userData.userId = tableData[index].userId;
      this.userData.userName = tableData[index].userName;
      this.userData.userPhone = tableData[index].userPhone;
      this.userData.userAge = tableData[index].userAge;
      this.userData.userGender = tableData[index].userGender;
      this.userData.userCarNum = tableData[index].userCarNum;
    },
    updateUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let updateMsg = new URLSearchParams();
          updateMsg.append("userId", this.userData.userId);
          updateMsg.append("userName", this.userData.userName);
          updateMsg.append("userPhone", this.userData.userPhone);
          updateMsg.append("userAge", this.userData.userAge);
          updateMsg.append("userGender", this.userData.userGender);
          updateMsg.append("userCarNum", this.userData.userCarNum);
          this.axios({
            method: "put",
            url: "http://localhost:8088/carpark/updateUserInfo",
            data: updateMsg,
          }).then((response) => {
            console.log(response.data);
            if (response.data) {
              this.$message({
                message: "修改成功！",
                type: "success",
              });
              this.update = false;
              this.userInfo();
            } else {
              this.$message.error("修改失败！请重试！");
            }
          });
        } else {
          console.log(valid);
          this.$message.error("修改失败！");
          console.log("error update!!");
          return false;
        }
      });
    },
    deleteRow(index, row, tableData) {
      this.$confirm("确定删除？", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "danger",
      })
        .then(() => {
          let userId = tableData[index].userId;
          let deleteMsg = new URLSearchParams();
          deleteMsg.append("userId", userId);
          this.axios({
            method: "put",
            url: "http://localhost:8088/carpark/deleteUserInfo",
            data: deleteMsg,
          }).then((response) => {
            console.log(response.data);
            if (response.data) {
              this.$message({
                message: "删除成功！",
                type: "success",
              });
              this.userInfo();
            } else {
              this.$message.error("删除失败！");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
  },
  created: function () {
    this.userInfo(this.pageCode, this.pageSize);
  },
};
</script>
