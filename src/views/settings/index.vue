<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <!-- 角色管理 -->
          <el-tab-pane label="角色管理" name="first">
            <el-button
              size="small"
              type="primary"
              @click="$refs.addRole.dialogFormVisible = true"
              >新增角色</el-button
            >
            <!-- 列表区域 -->
            <el-table :data="tableData" style="width: 100%">
              <el-table-column
                header-align="center"
                align="center"
                type="index"
                label="序号"
              >
              </el-table-column>
              <el-table-column
                header-align="center"
                align="center"
                prop="name"
                label="角色"
              >
              </el-table-column>
              <el-table-column
                header-align="center"
                align="center"
                prop="description"
                label="描述"
              >
              </el-table-column>
              <el-table-column
                header-align="center"
                align="center"
                label="操作"
              >
                <template slot-scope="{ row }">
                  <el-button
                    size="small"
                    type="success"
                    @click="assignAuthFn(row.id)"
                    >分配权限</el-button
                  >
                  <el-button
                    size="small"
                    type="primary"
                    @click="editHandler(row.id)"
                    >编辑</el-button
                  >
                  <el-button
                    size="small"
                    type="danger"
                    @click="delHandler(row.id)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <!-- 公司信息 -->
          <el-tab-pane label="公司信息" name="second">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top: 50px">
              <el-form-item label="公司名称">
                <el-input
                  v-model="companyInfo.name"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  v-model="companyInfo.companyAddress"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  v-model="companyInfo.mailbox"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="companyInfo.remarks"
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <!-- 分页区域 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryData.page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="queryData.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
        <!-- 新增/修改弹窗 -->
        <add-role ref="addRole" @updateList="initData" />
      </el-card>
    </div>
    <!-- 编辑权限弹窗 -->
    <assign-auth ref="assignAuth" @updateList="initData" />
  </div>
</template>

<script>
import {
  getcompanyInfoApi,
  getRoleListApi,
  getRoleInfoApi,
  delRoleApi,
} from "@/api/setting";
import AddRole from "./components/addRole.vue";
import AssignAuth from "./components/assign-auth.vue";
export default {
  name: "settings",
  components: {
    AddRole,
    AssignAuth,
  },
  data() {
    return {
      activeName: "first",
      // 列表
      tableData: [],
      // 总数
      total: 0,
      queryData: {
        page: 1,
        pagesize: 5,
      },
      // 公司信息
      companyInfo: {},
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      try {
        let { rows, total } = await getRoleListApi(this.queryData);
        this.companyInfo = await getcompanyInfoApi(
          this.$store.getters.conpanyId
        );
        this.tableData = rows;
        this.total = total;
      } catch (error) {
        return console.log(error);
      }
    },
    // 编辑
    async editHandler(id) {
      let res = await getRoleInfoApi(id);
      this.$refs.addRole.formData = res;
      this.$refs.addRole.dialogFormVisible = true;
    },
    // 删除
    async delHandler(id) {
      try {
        await this.$confirm("确认删除吗");
      } catch (error) {
        return;
      }
      await delRoleApi(id);
      this.$message.success("删除成功");
      // 边缘问题--当前页最后一个数据删除成功处理
      if (this.tableData.length === 1 && this.queryData.page > 1) {
        this.queryData.page--;
      }
      this.initData();
    },
    // 每页数量切换
    handleSizeChange(val) {
      this.queryData.pagesize = val;
      this.initData();
    },
    // 当前页码切换
    handleCurrentChange(val) {
      this.queryData.page = val;
      this.initData();
    },
    // 编辑权限
    async assignAuthFn(id) {
      let res = await getRoleInfoApi(id);
      this.$refs.assignAuth.checkedAuth = res.permIds;
      this.$refs.assignAuth.roleId = id;
      this.$refs.assignAuth.isDialogShow = true;
    },
  },
};
</script>

<style></style>
