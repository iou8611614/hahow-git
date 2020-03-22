<template>
  <div class="form-group">
    <transition>
      <div class="input-group">
        <i :class="setItem.icon._class" class="google-icon mx-1 my-2" style="font-size:40px">{{setItem.icon._text}}</i>
        <input
          @blur="checkColumnStatus"
          ref="inputElement"
          :type="setItem.type"
          class="form-control mx-1 my-2"
          :id="setItem.name"
          :placeholder="setItem.msg"
        />
      </div>
    </transition>
    <span v-show="isEmpty" class="empty_prompt">Empty Column!</span>
  </div>
</template>

<script>
export default {
  name: "FormItem",
  props: ["setItem"],
  data() {
    return {
      isEmpty: false,
    };
  },

  methods: {
    checkColumnStatus() {
      if (this.$refs.inputElement.value.trim()) {
        this.isEmpty = false;
      } else {
        this.isEmpty = true;
      }

      if(this.$refs.inputElement.id === 'userPassword'){
        this.$emit('judgeMatch');
      }
      if(this.$refs.inputElement.id === 'confirmPassword'){
        this.$emit('judgeMatch');
      }
    }
  }
};
</script>

<style scoped>
input {
  position: relative;
  animation-name: custom-fadein;
  animation-duration: 1s;
  animation-delay: 0.1s;
  animation-fill-mode: backwards;
  min-width: 100%;
  width: 250px;
}

.empty_prompt, .notMatch_prompt {
  color: red;
}

@keyframes custom-fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

</style>
