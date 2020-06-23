<template>
  <div class="container-fluid">
    <h1>Login Page</h1>
    <strong v-show="errorStatus">{{errorMsg}}</strong>
    <form action="" class="login_form">
      <div class="form_row">
        <label class="form_item" for="user">User</label>
        <input class="form_item" type="text" name="user" v-model="username" required>
      </div>
      <div class="form_row">
        <label class="form_item" for="pwd">Password</label>
        <input class="form_item" type="password" name="pwd" v-model="pwd" required>
      </div>
      <div class="form_row">
        <button class="btn_login" type="button" @click="loginHandler">Login</button>
      </div>
    </form>
  </div>
</template>


<script>
const _console = window.console;
export default {
  data(){
    return {
      username: '',
      pwd: '',
      errorStatus: false,
      errorMsg: ''
    }
  },
  methods:{
    loginHandler(){
      let vm = this;
      let isEmpty = true;
    
      if(vm.username && vm.pwd){
        // _console.log("Enter is empty ==> ",isEmpty)
        isEmpty = false;
      }
      if(!isEmpty){
        this.axios.post('http://127.0.0.1:7000/login',
          {
            username: vm.username,
            password: vm.pwd
          }
        )
        .then(res=>{
          if(res.data['loginStatus']){
            vm.errorStatus = false;
            vm.$store.commit('setToken', res.data.token);
            vm.$store.commit('accountLogin');
            setTimeout(function(){
              let currentYear = new Date().getFullYear();
              vm.$router.push({path: '/Year/' + ;currentYear})
                          .catch(err=>{
                         if(err) _console.log(err);

                          });
            },100)
            _console.log('Login Status: ', vm.$store.getters.getLoginStatus);
            _console.log('localStorage:', window.localStorage.getItem('userToken'))
            // redirection to setting page.
          }else{
            vm.errorStatus = true;
            vm.errorMsg = res.data['errMsg'];
          }
          _console.log(res.data)
        })
      }
    }
  }
}
</script>

<style scoped>
* {
  /* border: 1px solid #000; */
}

strong{
  color: red;
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

.form_item{
  flex: 1 2 200px;
  margin: .5rem;
}

.btn_login{
  margin: 2rem auto .5rem auto;
  border-radius: 5px;
  background-color: lightgreen;
  color: #eee;
  padding: .1rem 1rem;
}
</style>