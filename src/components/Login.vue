<template>
  <div>
    <div class="container">
      <el-form
        :model="ruleForm2"
        status-icon
        :rules="rules"
        ref="ruleForm2"
        label-position="top"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="account">
          <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var checkAccount = (rule, value, callback) => {
        if(value === "") {
          callback(new Error("请输入用户名"))
        }else{
          callback();
        }
    };

    return {
      ruleForm2: {
        account: "",
        pass: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        account: [{ validator: checkAccount, trigger: "blur"}]
      }
    }


  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    
  }
};
</script>


<style>
  .container{
    max-width: 30%;
    margin: 0px auto;
    margin-top: 200px;
  }

  body {
    /* background: url('../../static/image/desktop.jpg') no-repeat; */
    background-size:100%;
  }

  @media screen and (max-width: 800px){
    .container{
      max-width: 100%;
    }
    body {
    background-size:100% 100%;
  }
  }
</style>

