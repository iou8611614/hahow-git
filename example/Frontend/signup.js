<template>
  <div class="container-fluid">
    <h1>Register Page</h1>
    <form action="" class="login_form">
      <div class="form_row">
        <label class="form_item" for="user">User</label>
        <input class="form_item" type="text" name="user" v-model="formInfo.username" required>
      </div>
      <div class="form_row">
        <label class="form_item" for="email">E-Mail</label>
        <input class="form_item" type="email" v-model="formInfo.email" required>
      </div>
      <div class="form_row">
        <label class="form_item" for="phone">Phone</label>
        <input class="form_item" type="text" v-model="formInfo.phone" required>
      </div>
      <div class="form_row">
        <label class="form_item" for="pwd">Password</label>
        <input class="form_item" type="password" v-model="formInfo.password" required>
      </div>
      <div class="form_row">
        <label class="form_item" for="db_pwd">Confirm Password</label>
        <input class="form_item" type="password" v-model="formInfo.confirmPwd" required>
      </div>
      <div class="btn_row">
        <button class="btn btn-success mx-1" type="button" @click="signUpHandler">Sign Up</button>
        <button class="btn btn-danger mx-1" type="button" @click="initForm">Reset</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      errorStatus: false,
      errorMsg: '',
      formInfo:{
        id: null,
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPwd: ''
      }
    }
  },
  methods: {
    initForm(){
      this.formInfo = {
        id: null,
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPwd: ''
      }
    },
    setLoginSuccessStatus(token){
      this.errorStatus = false;
      this.errorMsg = '';
      this.$store.commit('setToken', token);
      this.$store.commit('accountLogin');
    },
    signUpHandler(){
      let vm = this;
      this.axios.post('http://127.0.0.1:7000/signup',{
        formData: this.formInfo

      })
      .then(res=>{
        window.console.log(res.data);
        if(res.data['loginStatus']){
          let {token, msg} = res.data;
          vm.errorMsg = msg;
          vm.setLoginSuccessStatus(token);
          setTimeout(function(){
            let currentYear = new Date().getFullYear();
            vm.$router.push({path: '/Year/'&#43;currentYear})
                      .catch(err=>{
                        if(err) window.console.log(err);
                      });
          },100)
        }else{
          // vm.$router.path('/')
        }
      })
      .catch(err=>{
        window.console.log(err);
      })
    }
  }
}
</script>

<style scoped>
* {
  /* border: 1px solid #000; */
}

.login_form {
  display: flex;
  border: 1px solid lightgrey;
  flex-direction: column;
  max-width: 500px;
  min-width: 500px;
  margin: 0 auto;
  border-radius: 5px;
  padding: 1rem;
  background: rgb(247, 233, 235);
}

.form_row{
  display: flex;
}

.btn_row{
  display: flex;
  margin: 0 auto;
}

.form_item{
  flex: 1 2 200px;
  margin: .5rem;
}

.btn_singup{
  margin: 2rem auto .5rem auto;
  border-radius: 5px;
  background-color: lightgreen;
  color: #eee;
  padding: .1rem 1rem;
}
</style>