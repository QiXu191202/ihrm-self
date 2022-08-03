<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :leftText="'共' + total + '条记录'">
        <el-button size="small" type="danger" @click="exportExcelHandler"
          >普通excel导出</el-button
        >
        <el-button
          size="small"
          type="info"
          :disabled="checkList.length === 0"
          @click="multiExportExcelHandler"
          >复杂表头excel导出</el-button
        >
        <el-button
          size="small"
          type="success"
          @click="$router.push('/import?type=user')"
          >excel导入</el-button
        >
        <el-button
          size="small"
          type="primary"
          @click="$refs.addEmployee.isDialogShow = true"
          >新增员工</el-button
        >
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table :data="list" border @selection-change="checkList = $event">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            align="center"
            header-align="center"
            type="index"
            label="序号"
            sortable=""
          />
          <el-table-column
            align="center"
            header-align="center"
            prop="username"
            label="姓名"
            sortable=""
          />
          <el-table-column
            align="center"
            header-align="center"
            prop="mobile"
            label="手机号"
            sortable=""
          />
          <el-table-column
            align="center"
            header-align="center"
            prop="workNumber"
            label="工号"
            sortable=""
          />
          <el-table-column
            align="center"
            header-align="center"
            prop="formOfEmployment"
            :formatter="formatterFn"
            label="聘用形式"
            sortable=""
          />
          <el-table-column
            align="center"
            header-align="center"
            prop="departmentName"
            label="部门"
            sortable=""
          />
          <el-table-column
            align="center"
            header-align="center"
            prop="timeOfEntry"
            label="入职时间"
            sortable=""
          >
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            header-align="center"
            label="账户状态"
            sortable=""
          />
          <el-table-column
            align="center"
            header-align="center"
            label="操作"
            sortable=""
            fixed="right"
            width="280"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="$router.push('/employees/detail/' + scope.row.id)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button
                type="text"
                size="small"
                @click="delHandler(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <!-- 分页区域 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryData.page"
            :page-sizes="[10, 50, 100, 150]"
            :page-size="queryData.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </el-row>
      </el-card>
    </div>
    <!-- 弹窗 -->
    <add-employee ref="addEmployee" @updateList="initData"></add-employee>
  </div>
</template>

<script>
import { getEmployeeListApi, delEmployeeApi } from "@/api/employees";
import EmoloyeeConstant from "@/api/constant/employees";
import AddEmployee from "./components/add-employee.vue";
import { formatDate } from "@/filters";
export default {
  name: "Employee",
  components: {
    AddEmployee,
  },
  data() {
    return {
      list: [],
      queryData: {
        page: 1,
        size: 10,
      },
      total: 0,
      checkList: [],
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      let { rows, total } = await getEmployeeListApi(this.queryData);
      this.list = rows;
      this.total = total;
    },
    // 每页数量
    handleSizeChange(val) {
      this.queryData.size = val;
      this.initData();
    },
    // 当前页面
    handleCurrentChange(val) {
      this.queryData.page = val;
      this.initData();
    },
    // 格式化时间
    formatterFn(row, column, cellValue, index) {
      let res = EmoloyeeConstant.hireType.find(
        (item) => item.id === cellValue * 1
      );
      return res ? res.value : "未知";
    },
    // 删除员工
    async delHandler(id) {
      await this.$confirm("确认删除嘛");
      await delEmployeeApi(id);
      this.$message.success("删除成功");
      if (this.queryData.page > 1 && this.list.length === 1) {
        this.queryData.page--;
      }
      this.initData();
    },
    // 导出表格--简单导出
    exportExcelHandler() {
      // 导出
      import("@/vendor/Export2Excel").then(async (excel) => {
        // 准备数据
        let { rows } = await getEmployeeListApi({ page: 1, size: 1000000 });
        const headers = {
          手机号: "mobile",
          姓名: "username",
          入职日期: "timeOfEntry",
          聘用形式: "formOfEmployment",
          转正日期: "correctionTime",
          工号: "workNumber",
          部门: "departmentName",
        };
        // 处理数据
        let result = this.handleData(rows);
        excel.export_json_to_excel({
          header: result.tableHeader, //表头 必填
          data: result.tableData, //具体数据 必填
          filename: "exp", //非必填
          autoWidth: true, //非必填
          bookType: "xlsx", //非必填
        });
      });
    },
    // 导出表格--复杂导出
    multiExportExcelHandler() {
      import("@/vendor/Export2Excel").then(async (excel) => {
        // 准备数据
        let { rows } = await getEmployeeListApi({ page: 1, size: 1000000 });

        // 处理数据
        let result = this.handleData(this.checkList);
        excel.export_json_to_excel({
          header: result.tableHeader, //表头 必填
          data: result.tableData, //具体数据 必填
          multiHeader: [["姓名", "主要信息", "", "", "", "", "部门"]], //复杂表头
          merges: ["A1:A2", "B1:F1", "G1:G2"], //合并规则
          filename: "exp", //非必填
          autoWidth: true, //非必填
          bookType: "xlsx", //非必填
        });
      });
    },
    // 处理数据
    handleData(rows) {
      let arr = [];
      const headers = {
        手机号: "mobile",
        姓名: "username",
        入职日期: "timeOfEntry",
        聘用形式: "formOfEmployment",
        转正日期: "correctionTime",
        工号: "workNumber",
        部门: "departmentName",
      };
      rows.forEach((item) => {
        let temp = [];
        Object.keys(headers).forEach((val) => {
          if (headers[val] === "formOfEmployment") {
            const findRes = EmoloyeeConstant.hireType.find(
              (v) => v.id === item[headers[val]] * 1
            );
            temp.push(findRes ? findRes.value : "未知");
          } else if (
            headers[val] === "timeOfEntry" ||
            headers[val] === "correctionTime"
          ) {
            temp.push(formatDate(item[headers[val]]));
          } else {
            temp.push(item[headers[val]]);
          }
        });
        arr.push(temp);
      });
      return { tableData: arr, tableHeader: Object.keys(headers) };
    },
  },
};
</script>

<style></style>
