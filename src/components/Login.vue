<template>
  <div class="container">
    <h1>后台登录</h1>
  <el-col :xl="10" :lg="10" :md="14" class="form">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
    <el-form-item label="用户名" prop="user">
      <el-input type="text" v-model="ruleForm.user" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
  </el-col>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      var validateUser = (rule, value, callback) => {
        if (value === '' || value === undefined) {
          callback(new Error('请输入用户名'))
        }else{
          callback()
        }
      }
      return {
        ruleForm: {
          pass: '',
          user: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          user: [
            { validator: validateUser, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if((this.ruleForm.user == 'admin') && (this.ruleForm.pass == '2012Dibaba')) {
              this.$router.push({'path': '/admin'})
              localStorage.setItem('d88_user', JSON.stringify(this.ruleForm))
            }else{
              this.$error_('账号密码错误')
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="less" scoped>
  .container {
    width: 100%;
    height: 100%;
    padding-top: 150px;
    box-sizing: border-box;
    padding-left: 10px;
    padding-right: 10px;

    .form {
      margin: 0px auto;
      float: none;
    }
  }
</style>




