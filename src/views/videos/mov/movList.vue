<template>
  <div>
    <!-- 搜索表单 -->
    <div style="margin-bottom: 20px;">
      <el-input style="width: 240px;margin-left: 10px;margin-top: 10px;" placeholder="请输入id" v-model="params.id"></el-input>
      <el-input style="width: 240px; margin-left: 10px;" placeholder="请输入电影名" v-model="params.movName"></el-input>
      <el-button style="margin-left: 15px;margin-top: 10px;" type="primary" @click="load"><i class="el-icon-search"></i>搜索</el-button>
      <el-button style="margin-left: 15px;margin-top: 10px;" type="warning" @click="reset"><i class="el-icon-refresh"></i>重置</el-button>
      <el-button style="margin-left: 15px;margin-top: 10px;" type="success" @click="dialogFormVisible = true"><i class="el-icon-circle-plus-outline"></i>添加</el-button>
    </div>


   


    <el-table :data="tableData" stripe lazy>
      <el-table-column prop="id" label="id" disabled width="120px"></el-table-column>
      <el-table-column prop="movName" label="番名" disabled width="250px"></el-table-column>
      <el-table-column prop="types" label="类型" width="80px"></el-table-column>
      <el-table-column prop="stu" label="当前状态" width="100px"></el-table-column>
      <el-table-column prop="region" label="地区" width="120px"></el-table-column>
      <el-table-column prop="times" label="集数" width="120px"></el-table-column>
      <el-table-column  label="封面" width="200px">
        <template v-slot="scope">
          <el-image :src="require('@/assets/images/' + scope.row.img)" :preview-src-list="[require('@/assets/images/' + scope.row.img)]" style="width:100px"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="mvs" label="电影视频地址" width="200px"></el-table-column>
      <el-table-column prop="createTime" label="上架时间" width="180px"></el-table-column>


      <el-table-column label="操作">
        <template v-slot="scope">
          <!--scope.row就是当前行数据-->
          <el-button type="primary" @click="$router.push('/movEdit?id=' + scope.row.id)">编辑</el-button>
            <el-popconfirm title="确定删除吗？" @confirm="del(scope.row.id)">
              <el-button type="danger" slot="reference" style="margin-left: 10px">删除</el-button>
            </el-popconfirm>
        </template>
      </el-table-column>


    </el-table>
    <!-- 分页 -->
    <div style="margin-top:20px">
      <el-pagination
          :current-page="params.pageNum"
          :page-size="params.pageSize"
          small
          layout="prev, pager, next"
          :total="total">
      </el-pagination>
    </div>


     <!-- Form -->
    <el-dialog title="添加视频" :visible.sync="dialogFormVisible">
      <el-form :inline="true" :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="番名" :label-width="formLabelWidth" prop="movName">
          <el-input v-model="form.movName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="视频类型" :label-width="formLabelWidth" prop="types">
          <el-select v-model="form.types" placeholder="请选择">
            <el-option label="动漫" value="动漫"></el-option>
            <el-option label="动漫-电影" value="动漫-电影"></el-option>
            <el-option label="电影" value="电影"></el-option>
            <el-option label="电视剧" value="电视剧"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="当前状态" :label-width="formLabelWidth" prop="stu">
          <el-select v-model="form.stu" placeholder="请选择">
            <el-option label="已上架" value="已上架"></el-option>
            <el-option label="待上架" value="待上架"></el-option>
            <el-option label="已下架" value="已下架"></el-option>
          </el-select>
        </el-form-item>
      
        <el-form-item label="地区" :label-width="formLabelWidth" prop="region">
          <el-input v-model="form.region" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="集数" :label-width="formLabelWidth" prop="times">
          <el-input v-model="form.times" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="封面文件名" :label-width="formLabelWidth" prop="img">
          <el-input v-model="form.img" autocomplete="off"></el-input>
        </el-form-item>
        
        <el-form-item label="视频文件名" :label-width="formLabelWidth" prop="mvs">
          <el-input v-model="form.mvs" autocomplete="off"></el-input>
        </el-form-item>
        
        <!-- 上传 -->

        <el-upload
            drag
            action="http://localhost:9002/mov/file/upload"
            :on-success="handleUploadSuccess"
            :on-error="handleUploadError"
            style="margin-left:30%"
          >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">拖拽文件到此处上传</div>
      </el-upload>
        <!-- 上传 end-->
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
    <!-- form end -->
  </div>
</template>

<script>

import request from "@/utils/movRequest";
import fileRequest from "@/utils/fileRequest";

export default {
  name: 'basics',
  data() {
    return {
      imgBase64: '',
      //添加规则
      rules: {
        movName: [
          {required: true, message: '请输入番名', trigger: 'blur'},
        ],
        types: [
          {required: true, message: '请选择视频类型', trigger: 'blur'},
        ],
        stu: [
          {required: true, message: '请选择当前状态', trigger: 'blur'}
        ],
        region: [
          {required: true, message: '请输入地区', trigger: 'blur'}
        ],
        times:[
          {required: true, message: '请输入集数', trigger: 'blur'},
        ],
        img:[
          {required: true, message: '请输入封面文件名', trigger: 'blur'}
        ],
        mvs:[
          {required: true, message: '请输入视频文件名', trigger: 'blur'}
        ],
      },
      //添加规则end
      
      
      // form
      dialogFormVisible: false,
      form: {
          id: '',
          movName: '',
          types: '',
          stu: '',
          region: '',
          times: '',
          img: '',
          mvs: '',
          createTime: ''
        },
        formLabelWidth: '120px',
      // form end

      tableData: [],
      total:0,
      params:{
        pageNum: 1,
        pageSize: 10,
        id: '',
        movName: ''
      }
    }
  },
  created() {
    this.load()
  },
  methods:{
    save(){
      console.log('按钮被点击' + this.form.startYear);

      this.$refs['ruleForm'].validate((valid) => {
        console.log(typeof valid);
        if (valid) {
          request.post("http://localhost:9093/mov/save", this.form).then(res => {
            if (res.code === "200") {
              this.$notify.success('新增成功');
              this.form = {endYear: null};
              this.dialogFormVisible = false
            } else {
              this.$notify.error(res.msg);
              this.dialogFormVisible = false

            }
          });
        } else {
          alert("数据不合法");
          }
        })
      },

    handleUploadSuccess(response, file) {
      this.$message.success('文件上传成功');
    },
    handleUploadError(err, file) {
      this.$message.error('文件上传失败');
    },

    
    load(){
      request.get('/mov/page',{
        params: this.params
      }).then(res => {
        if (res.code === '200'){
          this.tableData = res.data.list
          this.total = res.data.total
        }else {
          alert("传输失败")
        }
      })
    },
    reset(){
      this.params = {
        pageNum: 1,
        pageSize: 10,
        tconst: '',
        primaryTitle: ''
      }
    },
    del(id){
      request.delete("/mov/del/" + id).then(res=>{
        if (res.code === "200"){
          this.$notify.success("删除成功,您可以在页面刷新前查看或记录被删除信息,以免误删")
          
        }else {
          this.$notify.error(res.msg)
        }
      })
    },
    
  }
}
</script>

<style>
 
</style>