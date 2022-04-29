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
          prop="pmId"
          label="收费编号"
          width="175"
        ></el-table-column>
        <el-table-column fixed prop="pmType" label="收费类型" width="178">
          <template slot-scope="scope">
            <template v-if="scope.row.pmType == 'fix'"
              ><span>固定车位</span></template
            >
            <template v-if="scope.row.pmType == 'free'"
              ><span>自由车位</span></template
            >
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="carMsgId"
          label="车辆编号"
          width="175"
        ></el-table-column>
        <el-table-column
          fixed
          prop="userCarNum"
          label="车牌号"
          width="181"
        ></el-table-column>
        <el-table-column fixed prop="payMethod" label="收费方式" width="178">
          <template slot-scope="scope">
            <template v-if="scope.row.payMethod == 'year'"
              ><span>按年收费</span></template
            >
            <template v-if="scope.row.payMethod == 'month'"
              ><span>按月收费</span></template
            >
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="payMoney"
          label="收费金额(元)"
          width="181"
        ></el-table-column>
        <!-- 表单改删 -->
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              @click="updateRow(scope.$index, scope.row, tableData)"
              type="text"
              size="small"
              >修改</el-button
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
      <el-dialog title="新增固定车辆收费" :visible.sync="insert">
        <el-form :model="form" ref="form">
          <el-form-item
            label="收费类型（固定车位）"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.pmType"
              placeholder="固定车位"
              :disabled="true"
              clearable
              size="medium"
              style="width: 40%"
            ></el-input>
          </el-form-item>
          <el-form-item label="车辆编号" :label-width="formLabelWidth">
            <el-input
              v-model="form.carMsgId"
              placeholder="请输入车辆编号"
              clearable
              size="medium"
              style="width: 40%"
            ></el-input>
          </el-form-item>
          <el-form-item label="车牌号" :label-width="formLabelWidth">
            <el-input
              v-model="form.userCarNum"
              placeholder="自动"
              :disabled="true"
              clearable
              size="medium"
              style="width: 40%"
            ></el-input>
          </el-form-item>
          <el-form-item label="收费方式" :label-width="formLabelWidth">
            <el-switch
              style="display: block"
              v-model="form.payMethod"
              active-color="#13ce66"
              inactive-color="#409EFF"
              active-text="按月付费"
              inactive-text="按年付费"
            >
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="insert = false">取 消</el-button>
          <el-button type="primary" @click="fixPayMsgForm('form')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 修改 -->
      <el-dialog title="修改固定车辆收费方式" :visible.sync="update">
        <el-form :model="PayData" ref="PayData" :rules="rules">
          <el-form-item label="车辆编号" :label-width="formLabelWidth">
            <el-input
              v-model="PayData.carMsgId"
              placeholder="请输入车辆编号"
              :disabled="true"
              clearable
              size="medium"
              style="width: 40%"
            ></el-input>
          </el-form-item>
          <el-form-item label="车牌号" :label-width="formLabelWidth">
            <el-input
              v-model="PayData.userCarNum"
              placeholder="自动"
              :disabled="true"
              clearable
              size="medium"
              style="width: 40%"
            ></el-input>
          </el-form-item>
          <el-form-item label="收费方式" :label-width="formLabelWidth">
            <el-switch
              style="display: block"
              v-model="PayData.payMethod"
              active-color="#13ce66"
              inactive-color="#409EFF"
              active-text="按月付费"
              inactive-text="按年付费"
            >
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="insert = false">取 消</el-button>
          <el-button type="primary" @click="updateFixPayMsg('form')"
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
        carMsgId: [{ validator: validateNumber, trigger: "blur" }],
      },
      //查询
      select: "",
      //表单数据
      tableData: [
        {
          pmId: "",
          pmType: "",
          carMsgId: "",
          userCarNum: "",
          payMethod: "",
          payMoney: "",
        },
      ],
      insert: false,
      update: false,
      payMethod: true,
      form: {
        pmType: "fix",
        carMsgId: "",
        userCarNum: "",
        payMethod: "",
        payMoney: "",
      },
      PayData: {
        pmId: "",
        carMsgId: "",
        userCarNum: "",
        payMethod: "",
        payMoney: "",
      },
      formLabelWidth: "180px",
      pageCode: 1,//默认第一页
      pageSize: 7,//默认每页多少条
      total: 3,//总条数
      currentPage: 1,//默认显示第一页
    };
  },
  methods: {
    // 分页
    handleSizeChange(val) {

      this.fixPayMsg(this.pageCode, val);
    },
    handleCurrentChange(val) {
      this.fixPayMsg(val, this.pageSize);
    },
    fixPayMsg(pageCode, pageSize) {
      let pageMsg = new URLSearchParams();
      pageMsg.append("pageCode", pageCode);
      pageMsg.append("val", pageSize);
      this.axios({
        method: "get",
        url: "http://localhost:8088/carpark/queryFixPayMsg?" + pageMsg,
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
          "http://localhost:8088/carpark/queryFixPayMsgByUserCarNum?" +
          userCarNum,
        data: this.userCarNum,
      }).then((response) => {
        console.log(response.data);
        this.tableData = response.data;
      });
    },
    fixPayMsgForm() {
      let fixPayMsg = new URLSearchParams();
      fixPayMsg.append("pmType", this.form.pmType);
      fixPayMsg.append("carMsgId", this.form.carMsgId);
      fixPayMsg.append("userCarNum", this.form.userCarNum);
      fixPayMsg.append("payMethod", this.form.payMethod);
      fixPayMsg.append("payMoney", this.form.payMoney);
      this.axios({
        method: "post",
        url: "http://localhost:8088/carpark/insertFixPayMsg",
        data: fixPayMsg,
      }).then((response) => {
        console.log(response.data);
        if (response.data === true) {
          this.$message({
            message: "新增成功！",
            type: "success",
          });
          this.insert = false;
          this.fixPayMsg();
        } else if (response.data === "errorParkType") {
          this.$message.error("请输入固定车位的车辆编号！");
        } else if (response.data === "errorCarNum") {
          this.$message.error("车牌号不符!");
        } else if (response.data === false) {
          this.$message.error("新增信息失败！");
        } else if (response.data === "error") {
          this.$message.error("请正确输入！");
        }
      });
    },
    updateRow(index, row, tableData) {
      this.update = true;
      this.PayData.pmId = tableData[index].pmId;
      this.PayData.carMsgId = tableData[index].carMsgId;
      this.PayData.userCarNum = tableData[index].userCarNum;
      this.PayData.payMethod = tableData[index].payMethod;
      this.PayData.payMoney = tableData[index].payMoney;
    },
    updateFixPayMsg() {
      let updateMsg = new URLSearchParams();
      updateMsg.append("pmId", this.PayData.pmId);
      updateMsg.append("carMsgId", this.PayData.carMsgId);
      updateMsg.append("payMethod", this.PayData.payMethod);
      this.axios({
        method: "put",
        url: "http://localhost:8088/carpark/updateFixPayMsg",
        data: updateMsg,
      }).then((response) => {
        console.log(response.data);
        if (response.data) {
          this.$message({
            message: "收费方式修改成功！",
            type: "success",
          });
          this.update = false;
          this.fixPayMsg();
        } else {
          this.$message.error("收费方式修改失败！请重试！");
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
          let pmId = tableData[index].pmId;
          let deleteMsg = new URLSearchParams();
          deleteMsg.append("pmId", pmId);
          this.axios({
            method: "put",
            url: "http://localhost:8088/carpark/deleteFixPayMsg",
            data: deleteMsg,
          }).then((response) => {
            console.log(response.data);
            if (response.data) {
              this.$message({
                message: "删除成功！",
                type: "success",
              });
              this.fixPayMsg();
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
    this.fixPayMsg(this.pageCode, this.pageSize);
  },
};
</script>