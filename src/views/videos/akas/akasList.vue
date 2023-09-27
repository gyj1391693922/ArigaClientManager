<template>
    <div>
      <!-- 搜索表单 -->
      <div style="margin-bottom: 20px;">
        <el-input style="width: 240px;margin-left: 10px;margin-top: 10px;" placeholder="请输入tconst" v-model="params.tconst"></el-input>
        <el-input style="width: 240px; margin-left: 10px;" placeholder="请输入当前标题" v-model="params.title"></el-input>
        <el-button style="margin-left: 15px;margin-top: 10px;" type="primary" @click="load"><i class="el-icon-search"></i>搜索</el-button>
        <el-button style="margin-left: 15px;margin-top: 10px;" type="warning" @click="reset"><i class="el-icon-refresh"></i>重置</el-button>
        <el-button style="margin-left: 15px;margin-top: 10px;" type="success" @click="dialogFormVisible = true"><i class="el-icon-circle-plus-outline"></i>添加</el-button>
      </div>
  
      <el-table :data="tableData" stripe>
        <el-table-column prop="tconst" label="tconst" disabled width="120px"></el-table-column>
        <el-table-column prop="title" label="当前标题" disabled width="150px"></el-table-column>
        <el-table-column prop="region" label="语言地区" width="180px"></el-table-column>
        <el-table-column prop="language" label="使用语言" width="180px"></el-table-column>
        <el-table-column prop="types" label="播放形式" width="120px"></el-table-column>
        <el-table-column prop="attributes" label="其他特征" width="150px"></el-table-column>
        <el-table-column prop="isOrlginalTitle" label="是否为原始标题" width="150px"></el-table-column>
  
  
        <el-table-column label="操作">
          <template v-slot="scope">
            <!--scope.row就是当前行数据-->
            <el-button type="primary" @click="$router.push('/akasEdit?id=' + scope.row.id)">编辑</el-button>
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


      <!-- form -->
      <!-- Form -->
    <el-dialog title="添加电影" :visible.sync="dialogFormVisible">
      <el-form :inline="true" :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="电影编号" :label-width="formLabelWidth" prop="tconst">
          <el-input v-model="form.tconst" autocomplete="off"   maxlength="4"></el-input>
        </el-form-item>
        <el-form-item label="当前标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="语言地区" prop="region" :label-width="formLabelWidth" >
          <el-input v-model="form.region" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="使用语言" :label-width="formLabelWidth" prop="language">
          <el-input v-model="form.language" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="播放形式" :label-width="formLabelWidth" prop="types">
          <el-select v-model="form.types" placeholder="请选择">
            <el-option label="剧场上映" value="剧场上映"></el-option>
            <el-option label="电视播放" value="电视播放"></el-option>
            <el-option label="独家播放" value="独家播放"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="其他特征" :label-width="formLabelWidth" prop="attributes">
          <el-select v-model="form.attributes" placeholder="请选择">
            <el-option label="加长版" value="加长版"></el-option>
            <el-option label="修订版" value="修订版"></el-option>
            <el-option label="加更版" value="加更版"></el-option>
            <el-option label="普通版" value="普通版"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否为原标题" :label-width="formLabelWidth" prop="isOrlginalTitle">
          <el-select v-model="form.isOrlginalTitle" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
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
  
  import request from "@/utils/akasRequest";
  
  export default {
    name: 'akas',
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
        title: [
          {required: true, message: '请输入当前标题', trigger: 'blur'},
        ],
        region: [
          {required: true, message: '请输入语言地区', trigger: 'blur'}
        ],
        language: [
          {required: true, message: '请输入使用语言', trigger: 'blur'}
        ],
        types:[
          {required: true, message: '请输入播放形式', trigger: 'blur'},
        ],
        attributes:[
          {required: true, message: '请输入其他特征', trigger: 'blur'}
        ],
        isOrlginalTitle:[
          {required: true, message: '请输入是否为原标题', trigger: 'blur'}
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
      forms: {
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
        form:{},
        total:0,
        params:{
          pageNum: 1,
          pageSize: 10,
          tconst: '',
          title: ''
        }
      }
    },
    created(){
      
    const tconst = this.$route.query.tconst
    request.get(('/akas/akaslists/' + tconst),{
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
    methods:{

      save(){
      console.log('按钮被点击' + this.forms.startYear);

      this.$refs['ruleForm'].validate((valid) => {
        console.log(typeof valid);
        if (valid) {
          alert('有效果');
          request.post("http://localhost:9090/basics/save", this.forms).then(res => {
            if (res.code === "200") {
              this.$notify.success('新增成功');
              this.forms = {endYear: null};
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

      del(id){
      request.delete("/akas/del/" + id).then(res=>{
        if (res.code === "200"){
          this.$notify.success("删除成功,您可以在页面刷新前查看或记录被删除信息,以免误删")
          
        }else {
          this.$notify.error(res.msg)
        }
      })
    },
      load(){        
      },
      reset(){
        this.params = {
          pageNum: 1,
          pageSize: 10,
          tconst: '',
          title: ''
        }
      }
    }
  }
  </script>
  