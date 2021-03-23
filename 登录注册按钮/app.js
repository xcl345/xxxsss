let com1 = {
    template: `<div align="center" class="login">
        <h1 style="color: #394353;">{{s}}</h1>
        <br>
        <div class="inp">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <div class="icon">
                    <el-input placeholder="输入用户名" v-model="input1" prefix-icon="el-icon-s-custom" clearable></el-input>
                </div><br>
                <div>
                    <el-input placeholder="输入密码" prefix-icon="el-icon-lock" type="password" v-model="input2"  clearable show-password></el-input>
                </div>
            </el-form><br>
            <el-row>
                <el-button type="warning" icon="el-icon-circle-check" plain>登录</el-button>
                <el-button type="danger" plain icon="el-icon-circle-close">取消</el-button>
            </el-row>
        </div>
    </div>`,
    data() {
        return {
            s: '登录页面',
            input1: '',
            input2: ''
        }
    },
}

let com2 = {
    template: `<div align="center"">
    <h1 style="color: #394353; font-size: 40px; font-family: 楷体;">注册页面</h1>
        <br>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名:" >
                <el-input placeholder="输入用户名" v-model="input" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="pass">
                <el-input placeholder="输入密码" type="password" v-model="ruleForm.pass" autocomplete="off" show-password>
                </el-input>
            </el-form-item>
            <el-form-item label="确认密码:" prop="checkPass">
                <el-input placeholder="再次输入密码" type="password" v-model="ruleForm.checkPass" autocomplete="off"
                    show-password>
                </el-input>
            </el-form-item>
            <el-form-item label="年龄:" prop="age">
                <el-input v-model.number="ruleForm.age"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>`,
    data() {
        var checkAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('年龄不能为空'));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    if (value < 18) {
                        callback(new Error('必须年满18岁'));
                    } else {
                        callback();
                    }
                }
            }, 1000);
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                pass: '',
                checkPass: '',
                age: ''
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                age: [
                    { validator: checkAge, trigger: 'blur' }
                ]
            },
            input: ''
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('注册成功!');
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

//根组件
new Vue({
    el: '#app',
    data() {
        return {
            componentId: 'com1',

        }
    },
    methods: {
        turn() {
            this.componentId = this.componentId === 'com1' ? 'com2' : 'com1'
        }
    },

    //局部注册
    components: {
        com1,
        com2
    }
})



