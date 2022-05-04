<template>
  <div>
    <el-main>
      <!-- 模糊查询 -->
      <el-input
        v-model="select"
        placeholder="请输入车主姓名"
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
          prop="carId"
          label="车辆编号"
          width="160"
        ></el-table-column>
        <el-table-column
          fixed
          prop="parkId"
          label="车位编号"
          width="160"
        ></el-table-column>
        <el-table-column fixed prop="parkType" label="车位类型" width="160">
          <template slot-scope="scope">
            <template v-if="scope.row.parkType == 'fix'"
              ><span>固定车位</span></template
            >
            <template v-if="scope.row.parkType == 'free'"
              ><span>自由车位</span></template
            >
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="userName"
          label="车主姓名"
          width="160"
        ></el-table-column>
        <el-table-column
          fixed
          prop="gmtStart"
          label="开始时间"
          width="210"
        ></el-table-column>
        <el-table-column
          fixed
          prop="gmtEnd"
          label="结束时间"
          width="210"
        ></el-table-column>
        <!-- 表单改删 -->
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              @click="updateRow(scope.$index, scope.row, tableData)"
              type="text"
              size="small"
              >出库</el-button
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
      <el-dialog title="新增车辆" :visible.sync="insert">
        <el-form :model="form" ref="form">
          <el-form-item label="车位编号" :label-width="formLabelWidth">
            <el-input
              v-model="form.parkId"
              placeholder="请输入车位编号"
              clearable
              size="medium"
              style="width: 40%"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="车位类型（固定车位）"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.parkType"
              placeholder="固定车位"
              :disabled="true"
              clearable
              size="medium"
              style="width: 40%"
            ></el-input>
          </el-form-item>
          <el-form-item label="车主姓名" :label-width="formLabelWidth">
            <el-input
              v-model="form.userName"
              placeholder="请输入车主姓名"
              clearable
              size="medium"
              style="width: 40%"
            ></el-input>
            <el-button type="primary" size="mini" @click="selectUserName"
              >校验姓名</el-button
            >
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="insert = false">取 消</el-button>
          <el-button type="primary" @click="fixCarMsgForm('form')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 修改 -->
      <el-dialog title="出库" :visible.sync="update">
        <el-form :model="CarData" ref="CarData" :rules="rules">
          <el-form-item
            label="车位编号"
            prop="parkId"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="CarData.parkId"
              placeholder="请输入车位编号"
              :disabled="true"
              clearable
              size="medium"
              style="width: 40%"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="车位类型"
            prop="parkType"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="CarData.parkType"
              placeholder="请输入车位类型"
              :disabled="true"
              clearable
              size="medium"
              style="width: 40%"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="车主姓名"
            prop="userName"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="CarData.userName"
              placeholder="请输入车主姓名"
              :disabled="true"
              clearable
              size="medium"
              style="width: 40%"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="开始时间"
            prop="gmtStart"
            :label-width="formLabelWidth"
          >
            <div class="block">
              <el-date-picker
                v-model="CarData.gmtStart"
                type="datetime"
                placeholder="选择开始的日期时间"
                align="right"
                :picker-options="pickerOptions"
                :disabled="true"
              >
              </el-date-picker>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="update = false">取 消</el-button>
          <el-button type="primary" @click="updateCarMsg('CarData')"
            >出 库</el-button
          >
        </div>
      </el-dialog>
    </el-main>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    var validateNumber = (rule, value, callback) => {
      console.log("value:" + value);
      if (!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)) {
        callback(new Error("请输入数字值"));
      } else {
        callback();
      }
    };
    return {
      //校验规则
      rules: {
        userName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" },
        ],
        parkId: [{ validator: validateNumber, trigger: "blur" }],
      },
      //设置时间
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      gmtStart: "",
      gmtEnd: "",
      //查询
      select: "",
      //表单数据
      tableData: [
        {
          carId: "",
          parkId: "",
          parkType: "",
          userName: "",
          gmtStart: "",
          gmtEnd: "",
        },
      ],
      insert: false,
      update: false,
      form: {
        parkId: "",
        parkType: "fix",
        userName: "",
        gmtStart: "",
        gmtEnd: "",
      },
      CarData: {
        carId: "",
        parkId: "",
        parkType: "",
        userName: "",
        gmtStart: "",
        gmtEnd: "",
      },
      formLabelWidth: "180px",
      pageCode: 1,//默认第一页
      pageSize: 7,//默认每页多少条
      total: 3,//总条数
      currentPage: 1,//默认显示第一页
    };
  },
  methods: {
    /**
     * 时间处理
     */
    dateFormat(row, column) {
      var date = row[column.property];
      if (date === undefined) {
        return "";
      }
      return moment(date).format("yyyy-MM-dd HH:mm:ss");
    },
    // 分页
    handleSizeChange(val) {

      this.fixCarMsg(this.pageCode, val);
    },
    handleCurrentChange(val) {
      this.fixCarMsg(val, this.pageSize);
    },
    fixCarMsg(pageCode, pageSize) {
      let pageMsg = new URLSearchParams();
      pageMsg.append("pageCode", pageCode);
      pageMsg.append("val", pageSize);
      this.axios({
        method: "get",
        url: "http://localhost:8088/carpark/queryFixCarInfo?" + pageMsg,
        data: pageMsg,
      }).then((response) => {
        console.log(response.data);
        this.tableData = response.data.pageData;
        this.total = response.data.total;
      });
    },
    conditionQuery() {
      let userName = new URLSearchParams();
      userName.append("userName", this.select);
      this.axios({
        method: "get",
        url: "http://localhost:8088/carpark/queryCarMsgByUserName?" + userName,
        data: this.userName,
      }).then((response) => {
        console.log(response.data);
        this.tableData = response.data;
      });
    },
    selectUserName() {
      let userName = new URLSearchParams();
      userName.append("userName", this.form.userName);
      this.axios({
        method: "get",
        url:
          "http://localhost:8088/carpark/queryUserNameByInputUserName?" +
          userName,
        data: this.userName,
      }).then((response) => {
        console.log(response.data);
        if (response.data) {
          this.$message({
            message: "校验成功！",
            type: "success",
          });
        } else {
          this.$message({
            message: "车主姓名错误",
            type: "error",
          });
        }
      });
    },
    fixCarMsgForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let fixCarMsg = new URLSearchParams();
          fixCarMsg.append("parkId", this.form.parkId);
          fixCarMsg.append("parkType", this.form.parkType);
          fixCarMsg.append("userName", this.form.userName);
          this.axios({
            method: "post",
            url: "http://localhost:8088/carpark/insertFixCarMsg",
            data: fixCarMsg,
          }).then((response) => {
            console.log(response.data);
            if (response.data === true) {
              this.$message({
                message: "新增成功！",
                type: "success",
              });
              this.insert = false;
              this.fixCarMsg(this.pageCode, this.pageSize);
            } else if (response.data === "reParkId") {
              this.$message.error("新增车辆时所选车位已有车！");
            } else if (response.data === "errorUserName") {
              this.$message.error("车主姓名校验未通过！");
            } else if (response.data === "errorParkType") {
              this.$message.error(
                "新增车辆时所选车位类型不符!请选择固定车位！"
              );
            } else if (response.data === false) {
              this.$message.error("新增车辆失败！");
            } else if (response.data === "errorParkId") {
              this.$message.error("车位不存在！");
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
      this.CarData.carId = tableData[index].carId;
      this.CarData.parkId = tableData[index].parkId;
      this.CarData.parkType = tableData[index].parkType;
      this.CarData.userName = tableData[index].userName;
      this.CarData.gmtStart = tableData[index].gmtStart;
      this.CarData.gmtEnd = tableData[index].gmtEnd;
    },
    updateCarMsg() {
      let updateMsg = new URLSearchParams();
      updateMsg.append("carId", this.CarData.carId);
      this.axios({
        method: "put",
        url: "http://localhost:8088/carpark/updateCarMsg",
        data: updateMsg,
      }).then((response) => {
        console.log(response.data);
        if (response.data) {
          this.$message({
            message: "出库成功！",
            type: "success",
          });
          this.update = false;
          this.fixCarMsg(this.pageCode, this.pageSize);
        } else {
          this.$message.error("出库失败！请重试！");
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
          let carId = tableData[index].carId;
          let deleteMsg = new URLSearchParams();
          deleteMsg.append("carId", carId);
          this.axios({
            method: "put",
            url: "http://localhost:8088/carpark/deleteCarMsg",
            data: deleteMsg,
          }).then((response) => {
            console.log(response.data);
            if (response.data) {
              this.$message({
                message: "删除成功！",
                type: "success",
              });
              this.fixCarMsg(this.pageCode, this.pageSize);
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
    this.fixCarMsg(this.pageCode, this.pageSize);
  },
};
</script>