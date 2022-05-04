<template>
  <div>
    <el-main>
      <!-- 模糊查询 -->
      <el-input
        v-model="select"
        placeholder="请输入车辆编号"
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
          width="178"
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
          width="178"
        ></el-table-column>
        <el-table-column
          fixed
          prop="gmtTime"
          label="停车时长(h)"
          width="178"
        ></el-table-column>
        <el-table-column
          fixed
          prop="pmRate"
          label="费率"
          width="178"
        ></el-table-column>
        <el-table-column
          fixed
          prop="payMoney"
          label="收费金额(元)"
          width="178"
        ></el-table-column>
        <!-- 表单改删 -->
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              @click="updateRow(scope.$index, scope.row, tableData)"
              type="text"
              disabled
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
      <el-dialog title="新增自由车辆收费" :visible.sync="insert">
        <el-form :model="form" ref="form">
          <el-form-item
            label="收费类型（自由车位）"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.pmType"
              placeholder="自由车位"
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
          <el-form-item label="收费费率/h" :label-width="formLabelWidth">
            <el-input
              v-model="form.pmRate"
              placeholder="请输入收费费率/h"
              clearable
              size="medium"
              style="width: 40%"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="insert = false">取 消</el-button>
          <el-button type="primary" @click="freePayMsgForm('form')"
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
    return {
      //查询
      select: "",
      //表单数据
      tableData: [
        {
          pmId: "",
          pmType: "",
          carMsgId: "",
          gmtTime: "",
          pmRate: "",
          payMoney: "",
        },
      ],
      insert: false,
      form: {
        pmType: "free",
        carMsgId: "",
        pmRate: "",
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

      this.freePayMsg(this.pageCode, val);
    },
    handleCurrentChange(val) {
      this.freePayMsg(val, this.pageSize);
    },
    freePayMsg(pageCode, pageSize) {
      let pageMsg = new URLSearchParams();
      pageMsg.append("pageCode", pageCode);
      pageMsg.append("val", pageSize);
      this.axios({
        method: "get",
        url: "http://localhost:8088/carpark/queryFreePayMsg?" + pageMsg,
        data: pageMsg,
      }).then((response) => {
        console.log(response.data);
        this.tableData = response.data.pageData;
        this.total = response.data.total;
      });
    },
    conditionQuery() {
      let carMsgId = new URLSearchParams();
      carMsgId.append("carMsgId", this.select);
      this.axios({
        method: "get",
        url:
          "http://localhost:8088/carpark/queryFreePayMsgByCarMsgId?" + carMsgId,
        data: this.carMsgId,
      }).then((response) => {
        console.log(response.data);
        this.tableData = response.data;
      });
    },
    freePayMsgForm() {
      let freePayMsg = new URLSearchParams();
      freePayMsg.append("pmType", this.form.pmType);
      freePayMsg.append("carMsgId", this.form.carMsgId);
      freePayMsg.append("pmRate", this.form.pmRate);
      this.axios({
        method: "post",
        url: "http://localhost:8088/carpark/insertFreePayMsg",
        data: freePayMsg,
      }).then((response) => {
        console.log(response.data);
        if (response.data === true) {
          this.$message({
            message: "新增成功！",
            type: "success",
          });
          this.insert = false;
          this.freePayMsg(this.pageCode, this.pageSize);
        } else if (response.data === "errorCarId") {
          this.$message.error("请输入正确的自由车辆编号！");
        } else if (response.data === "error") {
          this.$message.error("新增失败！");
        }
      });
    },
  },
  created: function () {
    this.freePayMsg(this.pageCode, this.pageSize);
  },
};
</script>