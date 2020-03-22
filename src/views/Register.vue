<template>
  <div class="container d-flex flex-column align-items-center login-box mt-5">
    <form
      class="container-sm d-flex flex-column align-items-center rounded py-5 myform"
    >
      <i class="material-icons mb-3 custom-icon" style="font-size:60px">send</i>
      <span class="matchMsg" v-show="isMatch">Please double check password !</span>
      <FormItem
        ref="inputComponent"
        v-for="item in itemInfo"
        :setItem="item"
        :key="item.name"
        @judgeMatch="matchHandler"
      />
      <button type="button" class="btn btn-primary" @click="registerHandler">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import FormItem from "@/components/FormItem.vue";
const _console = window.console;
export default {
  data() {
    return {
      isMatch: false,
      itemInfo: [
        {
          msg: "User Name",
          name: "userName",
          type: "text",
          classStyle: "form-control",
          icon:{
            _class: 'material-icons',
            _text: 'account_box'
          }
        },
        {
          msg: "E-mail",
          name: "userEmail",
          type: "email",
          classStyle: "form-control",
          icon:{
            _class: 'material-icons',
            _text: 'email'
          }
        },
        {
          msg: "Birthday",
          name: "birthday",
          type: "date",
          classStyle: "form-control",
          icon:{
            _class: 'material-icons',
            _text: 'cake'
          }
        },
        {
          msg: "Password",
          name: "userPassword",
          type: "password",
          classStyle: "form-control",
          icon:{
            _class: 'material-icons',
            _text: 'lock'
          }
        },
        {
          msg: "Confirm Password",
          name: "confirmPassword",
          type: "password",
          classStyle: "form-control",
          icon:{
            _class: 'material-icons',
            _text: 'replay'
          }
        }
      ]
    };
  },
  methods: {
    matchHandler(){
      let password = this.$refs.inputComponent[3].$refs.inputElement.value;
      let dbc_password = this.$refs.inputComponent[4].$refs.inputElement.value;
      if(password !== dbc_password){
        this.isMatch = true;
      }else{
        this.isMatch = false;
      }
    },
    registerHandler() {
      let self = this;
      let username = this.$refs.inputComponent[0].$refs.inputElement.value;
      let email = this.$refs.inputComponent[1].$refs.inputElement.value;
      let birthday = this.$refs.inputComponent[2].$refs.inputElement.value;
      let password = this.$refs.inputComponent[3].$refs.inputElement.value;
      let dbc_password = this.$refs.inputComponent[4].$refs.inputElement.value;

      const isInputEmpty = inputComponent => {
        return inputComponent.$refs.inputElement.value.trim() !== "";
      };
  
      if (this.$refs.inputComponent.every(isInputEmpty) && !this.isMatch) {
        axios
          .post("http://127.0.0.1:7000/Blog/Register",{
            username,
            email,
            birthday,
            password,
            dbc_password
          })
          .then(res => {
            // 1. response token from server.
            // 2. save token in localStorage.
            // 3. if has token then redirect to /Blog/Profile/:userID.
            // 4. if no token that mean username/password has error then show error message to user.
           
          //  Token test
            _console.log('This is token: ',res);
            if(res.data.token) _console.log("your got token!")
            else _console.log("you need token...")
          //  Token test
            
            if (res.status) {
              // Fake User 'Jason'
              // modify redirect to /Blog/Profile/:userID
              // load user info from server , then save in Vuex. Maybe???
              self.$router.push({ name: "Profile",params:{userID:'Jason'} })
                          .catch(err=>{
                            if(err) _console.log(err)
                          });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        alert("請填寫完整資料");
        
      }
    }
  },
  components: {
    FormItem
  }
};
</script>

<style scoped>
.matchMsg {
  color: red;
}
.login-box {
  max-width: 500px;
}
.myform {
  border: solid 1px lightgrey;
  background-color: rgba(255, 255, 255, 0.5);
  overflow: hidden;
}
.custom-icon {
  animation-name: jumping;
  animation-duration: 2s;
  animation-delay: .5s;
  animation-fill-mode: backwards;
  animation-iteration-count: infinite;
}
@keyframes jumping {
  0% {
    transform: scale(1) rotate(-20deg) perspective(1px);
  }
  50% {
    transform: scale(1.1) rotate(-20deg) perspective(1px);
  }
  100% {
    transform: scale(1) rotate(-20deg) perspective(1px);
  }
}
@-webkit-keyframes jumping {
  0% {
    -webkit-transform: scale(1) rotate(-20deg) perspective(1px);
  }
  50% {
    -webkit-transform: scale(1.1) rotate(-20deg) perspective(1px);
  }
  100% {
    -webkit-transform: scale(1) rotate(-20deg) perspective(1px);
  }
}
@-moz-keyframes jumping {
  0% {
    -moz-transform: scale(1) rotate(-20deg) perspective(1px);
  }
  50% {
    -moz-transform: scale(1.1) rotate(-20deg) perspective(1px);
  }
  100% {
    -moz-transform: scale(1) rotate(-20deg) perspective(1px);
  }
}
</style>
