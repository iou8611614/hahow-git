<template>
  <div class="container d-flex flex-column align-items-center login-box mt-5">
    <form
      class="container-sm d-flex flex-column align-items-center rounded py-5 myform"
    >
      <i class="material-icons mb-3  custom-icon" style="font-size:60px">fingerprint</i>
      <FormItem
        ref="inputComponent"
        v-for="item in itemInfo"
        :setItem="item"
        :key="item.name"
      />
      <button type="button" class="btn btn-success btn-block" @click="loginHandler">
        LOGIN
      </button>
      <button type="button" class="btn btn-danger btn-block" @click="registerHandler">
        Sign up
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
          msg: "Password",
          name: "userEmail",
          type: "password",
          classStyle: "form-control",
          icon:{
            _class: 'material-icons',
            _text: 'lock'
          }
        }
      ]
    };
  },
  methods: {
    loginHandler() {
      let self = this;
      const isInputEmpty = inputComponent => {
        return inputComponent.$refs.inputElement.value.trim() !== "";
      };

      if (!this.$refs.inputComponent.every(isInputEmpty)) {
        alert("請輸入帳號密碼");
      } else {
        // if login direct to user page
        axios
          .get("http://127.0.0.1:7000/Login")
          .then(res => {
            _console.log('Msg from server: ',res);
            if (res.status) {
              self.$router.push({ name: "Blog" });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    registerHandler() {
      this.$router.push({name:'Register'})
      // alert('導向註冊頁面')
    }
  },
  components: {
    FormItem
  }
};
</script>

<style scoped>
.login-box {
  max-width: 500px;
}
.myform {
  border: solid 1px lightgrey;
  background-color: rgba(255, 255, 255, 0.5);
  overflow: hidden;
}
.btn-block {
    display: block;
    width: 30%!important;
    padding: .5rem 1rem!important;
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
    transform: scale(1) perspective(1px);
  }
  50% {
    transform: scale(1.1) perspective(1px);
  }
  100% {
    transform: scale(1) perspective(1px);
  }
}
@-webkit-keyframes jumping {
  0% {
    -webkit-transform: scale(1) perspective(1px);
  }
  50% {
    -webkit-transform: scale(1.1) perspective(1px);
  }
  100% {
    -webkit-transform: scale(1) perspective(1px);
  }
}
@-moz-keyframes jumping {
  0% {
    -moz-transform: scale(1) perspective(1px);
  }
  50% {
    -moz-transform: scale(1.1) perspective(1px);
  }
  100% {
    -moz-transform: scale(1) perspective(1px);
  }
}
</style>
