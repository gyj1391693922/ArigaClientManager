<template>
  <div>
    <!-- 搜索表单 -->
    <div style="margin-bottom: 20px;">
      <el-input style="width: 240px;margin-left: 10px;margin-top: 10px;" placeholder="请输入tconst" v-model="params.tconst"></el-input>
      <el-input style="width: 240px; margin-left: 10px;" placeholder="请输入当前标题" v-model="params.primaryTitle"></el-input>
      <el-button style="margin-left: 15px;margin-top: 10px;" type="primary" @click="load"><i class="el-icon-search"></i>搜索</el-button>
      <el-button style="margin-left: 15px;margin-top: 10px;" type="warning" @click="reset"><i class="el-icon-refresh"></i>重置</el-button>
      <el-button style="margin-left: 15px;margin-top: 10px;" type="success" @click="dialogFormVisible = true"><i class="el-icon-circle-plus-outline"></i>添加</el-button>
    </div>


   


    <el-table :data="tableData" stripe>
      <el-table-column prop="tconst" label="tconst" disabled width="120px"></el-table-column>
      <el-table-column prop="titleType" label="播放类型" disabled width="150px"></el-table-column>
      <el-table-column prop="primaryTitle" label="当前标题" width="180px"></el-table-column>
      <el-table-column prop="oldTitle" label="原先标题" width="180px"></el-table-column>
      <el-table-column prop="isAdult" label="面向成年" width="120px"></el-table-column>
      <el-table-column prop="startYear" label="开播日期" width="150px"></el-table-column>
      <el-table-column prop="endYear" label="完结日期" width="150px"></el-table-column>
      <el-table-column prop="runtimeMinutes" label="视频时长" width="180px"></el-table-column>
      <el-table-column prop="genres" label="视频类型" width="180px"></el-table-column>


      <el-table-column label="操作">
        <template v-slot="scope">
          <!--scope.row就是当前行数据-->
          <el-button type="primary" @click="$router.push('/akasList?tconst=' + scope.row.tconst)">详细</el-button>
          <el-button type="primary" @click="$router.push('/basicsEdit?id=' + scope.row.id)">编辑</el-button>
            <el-popconfirm title="确定删除吗？" @confirm="del(scope.row.tconst)">
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
    <el-dialog title="添加电影" :visible.sync="dialogFormVisible">
      <el-form :inline="true" :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="电影编号" :label-width="formLabelWidth" prop="tconst">
          <el-input v-model="form.tconst" autocomplete="off"   maxlength="4"></el-input>
        </el-form-item>
        <el-form-item label="播放类型" :label-width="formLabelWidth" prop="titleType">
          <el-select v-model="form.titleType" placeholder="请选择">
            <el-option label="剧场上映" value="剧场上映"></el-option>
            <el-option label="电视播放" value="电视播放"></el-option>
            <el-option label="独家播放" value="独家播放"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="当前标题" prop="primaryTitle" :label-width="formLabelWidth" >
          <el-input v-model="form.primaryTitle" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="原先标题" :label-width="formLabelWidth" prop="oldTitle">
          <el-input v-model="form.oldTitle" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="面向成年" :label-width="formLabelWidth" prop="isAdult">
          <el-select v-model="form.isAdult" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开播日期" :label-width="formLabelWidth" prop="startYear">
          <el-date-picker
            v-model="form.startYear"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="完结日期" :label-width="formLabelWidth" prop="endYear">
          <el-date-picker
            v-model="form.endYear"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="时长" :label-width="formLabelWidth" prop="runtimeMinutes">
          <el-input v-model="form.runtimeMinutes" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="视频类型" :label-width="formLabelWidth" prop="genres">
          <el-select v-model="form.genres" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 上传 -->

        <el-upload
        drag
        action="http://localhost:9002/basics/file/upload"
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
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

import request from "@/utils/request";
import fileRequest from "@/utils/fileRequest";

export default {
  name: 'basics',
  data() {

    //日期是否被选择判断
    var tcon = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('编号不能为空'));
      }
      setTimeout(() => {
        if (!/^[0-9]+$/.test(value)) {
          callback(new Error('请输入4位数字值'));
        } else {
          callback(); // 验证通过，不传递任何参数
        }
      }, 1000);
    };

    return {
      //添加规则
      rules: {
        tconst: [
          {min: 4,max: 4, message: '请输入4位纯数字编号', trigger: 'blur'},
          {validator:tcon, trigger:'blur'}
        ],
        titleType: [
          {required: true, message: '请选择播放类型', trigger: 'blur'},
        ],
        primaryTitle: [
          {required: true, message: '请输入当前标题', trigger: 'blur'}
        ],
        oldTitle: [
          {required: true, message: '请输入原先标题', trigger: 'blur'}
        ],
        isAdult:[
          {required: true, message: '请选择面向群体', trigger: 'blur'},
        ],
        startYear:[
          {required: true, message: '请选择开播日期', trigger: 'blur'}
        ],
        runtimeMinutes:[
          {required: true, message: '请输入大概时长', trigger: 'blur'}
        ],
        genres:[
          {required: true, message: '请选择视频类型', trigger: 'blur'},
        ],
      },
      //添加规则end
      // 视频类型多选框
      options: [{
          value: '动作',
          label: '动作'
        }, {
          value: '科幻',
          label: '科幻'
        }, {
          value: '战争',
          label: '战争'
        }, {
          value: '爱情'
        }, {
          value: '喜剧',
          label: '喜剧'
        },{
          value: '恐怖',
          label: '恐怖'
        }, {
          value: '动画',
          label: '动画'
        }, {
          value: '历史',
          label: '历史'
        }, {
          value: '剧情',
          label: '剧情'
        }, {
          value: '记录',
          label: '记录'
        }],
        value1: [],
      // 视频类型 end
      
      // form
      dialogFormVisible: false,
      form: {
          tconst: '',
          titleType: '',
          primaryTitle: '',
          oldTitle: '',
          isAdult: '',
          startYear: '',
          endYear: null,
          runtimeMinutes: '',
          genres: ''
        },
        formLabelWidth: '120px',
      // form end

      tableData: [],
      total:0,
      params:{
        pageNum: 1,
        pageSize: 10,
        tconst: '',
        primaryTitle: ''
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
          alert('有效果');
          request.post("http://localhost:9090/basics/save", this.form).then(res => {
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
      request.get('/basics/page',{
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
    del(tconst){
      request.delete("/basics/del/" + tconst).then(res=>{
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