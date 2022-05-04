<template>
  <div>
    <el-main>
      <!-- 模糊查询 -->
      <el-select v-model="value" filterable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
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
          prop="parkId"
          label="车位编号"
          width="320"
        ></el-table-column>
        <el-table-column prop="parkType" label="车位类型" width="320">
          <template slot-scope="scope">
            <template v-if="scope.row.parkType == 'fix'"
              ><span>固定车位</span></template
            >
            <template v-if="scope.row.parkType == 'free'"
              ><span>自由车位</span></template
            >
          </template>
        </el-table-column>
        <el-table-column prop="parkStatus" label="车位状态" width="320">
          <template slot-scope="scope">
            <template v-if="scope.row.parkStatus == '1'"
              ><span>使用中</span></template
            >
            <template v-if="scope.row.parkStatus == '0'"
              ><span>未使用</span></template
            >
          </template>
        </el-table-column>
        <!-- 表单改删 -->
        <el-table-column fixed="right" label="操作" width="210">
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
      <el-dialog title="新增车位" :visible.sync="insert">
        <el-form :model="form" ref="form">
          <el-form-item label="车位类型" :label-width="formLabelWidth">
            <el-select
              v-model="form.region"
              filterable
              placeholder="请选择车位类型"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="insert = false">取 消</el-button>
          <el-button type="primary" @click="parkForm('form')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改 -->
      <el-dialog title="更改车位" :visible.sync="update">
        <el-form :model="parkData" ref="parkData">
          <el-form-item label="车位类型" :label-width="formLabelWidth">
            <el-select
              v-model="parkData.region"
              filterable
              placeholder="请选择车位类型"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车位状态" :label-width="formLabelWidth">
            <el-select
              v-model="parkData.status"
              filterable
              placeholder="请选择车位状态"
            >
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="update = false">取 消</el-button>
          <el-button type="primary" @click="updatePark('parkData')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </el-main>
  </div>
</template>

<script>
export default {
  //表单数据
  data() {
    //新增
    var checkParkType = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("类型不能为空"));
      }
      callback();
    };
    //修改
    var checkUpadteType = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("修改类型不能为空"));
      }
      callback();
    };
    var checkUpadteStatus = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("修改状态不能为空"));
      }
      callback();
    };
    return {
      tableData: [
        {
          parkId: "",
          parkType: "",
          parkStatus: "",
        },
      ],

      rules: {
        parkType: [{ validator: checkParkType, trigger: "blur" }],
      },
      rules: {
        parkType: [{ validator: checkUpadteType, trigger: "blur" }],
        parkStatus: [{ validator: checkUpadteStatus, trigger: "blue" }],
      },
      //新增
      update: false,
      insert: false,
      form: {
        region: "",
      },
      parkData: {
        parkId: "",
        region: "",
        status: "",
      },
      formLabelWidth: "90px",
      pageCode: 1,//默认第一页
      pageSize: 7,//默认每页多少条
      total: 3,//总条数
      currentPage: 1,//默认显示第一页
      //类型选择框
      options: [
        {
          value: "fix",
          label: "固定车位",
        },
        {
          value: "free",
          label: "自由车位",
        },
      ],
      value: "",
      //状态选择框
      options1: [
        {
          value: "0",
          label: "未使用",
        },
        {
          value: "1",
          label: "使用中",
        },
      ],
      value: "",
    };
  },
  methods: {
    // 分页
    handleSizeChange(val) {

      this.parkInfo(this.pageCode, val);
    },
    handleCurrentChange(val) {
      this.parkInfo(val, this.pageSize);
    },
    parkInfo(pageCode, pageSize) {
      let pageMsg = new URLSearchParams();
      pageMsg.append("pageCode", pageCode);
      pageMsg.append("val", pageSize);
      this.axios({
        method: "get",
        url: "http://localhost:8088/carpark/queryPark?" + pageMsg,
        data: pageMsg,
      }).then((response) => {
        console.log(response.data);
        this.tableData = response.data.pageData;
        this.total = response.data.total;
      });
    },
    conditionQuery() {
      let parkType = new URLSearchParams();
      parkType.append("parkType", this.value);
      this.axios({
        method: "get",
        url: "http://localhost:8088/carpark/queryParkByType?" + parkType,
        data: parkType,
      }).then((response) => {
        console.log(response.data);
        this.tableData = response.data;
      });
    },
    parkForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let parkMsg = new URLSearchParams();
          parkMsg.append("parkType", this.form.region);
          this.axios({
            method: "post",
            url: "http://localhost:8088/carpark/insertParkInfo",
            data: parkMsg,
          }).then((response) => {
            console.log(response.data);
            if (response.data) {
              this.$message({
                message: "新增成功！",
                type: "success",
              });
              this.insert = false;
              this.parkInfo(this.pageCode, this.pageSize);
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
      this.parkData.parkId = tableData[index].parkId;
      this.parkData.region = tableData[index].parkType;
      this.parkData.status = tableData[index].parkStatus;
    },
    updatePark(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let updateMsg = new URLSearchParams();
          updateMsg.append("parkId", this.parkData.parkId);
          updateMsg.append("parkType", this.parkData.region);
          updateMsg.append("parkStatus", this.parkData.status);
          this.axios({
            method: "put",
            url: "http://localhost:8088/carpark/updateParkInfo",
            data: updateMsg,
          }).then((response) => {
            console.log(response.data);
            if (response.data) {
              this.$message({
                message: "修改成功！",
                type: "success",
              });
              this.update = false;
              this.parkInfo(this.pageCode, this.pageSize);
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
          let parkId = tableData[index].parkId;
          let parkStatus = tableData[index].parkStatus;

          if (parkStatus == "1") {
            this.$message({
              message: "使用中车位不能删除！",
              type: "error",
            });
            return;
          } else {
            let deleteMsg = new URLSearchParams();
            deleteMsg.append("parkId", parkId);
            this.axios({
              method: "put",
              url: "http://localhost:8088/carpark/deleteParkInfo",
              data: deleteMsg,
            }).then((response) => {
              console.log(response.data);
              if (response.data) {
                this.$message({
                  message: "删除成功！",
                  type: "success",
                });
                this.parkInfo(this.pageCode, this.pageSize);
              } else {
                this.$message.error("删除失败！");
              }
            });
          }
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
    this.parkInfo(this.pageCode, this.pageSize);
  },
};
</script>
<style>
.el-main {
  color: #333;
  text-align: center;
}
</style>
