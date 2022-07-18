<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
  .box {
    width: 100%;
    margin-bottom: 10px;
  }
  .group {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .label {
    width: 100px;
  }
  .button {
    margin-top: 20px;
  }
  .error {
    color: #dc2121;
  }
}
</style>
<template lang="pug">
.layout
  .box
    .group
      .label 이메일
      main-input(
        v-model="email"
        placeholder="이메일을 입력해주세요"
      )
    .error(v-if="isEmail") 이메일이 정상적이지 않습니다.
  .box
    .group
      .label 비밀번호
      main-input(
        type="password"
        v-model="password"
        placeholder="비밀번호를 입력해주세요"
      )
    .error(v-if="isPassword") 비밀번호는 8자 이상으로 설정해주세요
  .box
    .group
      .label 확인
      main-input(
        v-model="check"
        type="password"
        placeholder="비밀번호를 한번더 입력해주세요"
      )
    .error(v-if="isCheck") 비밀번호가 서로 다릅니다
  main-button.button(
    :class="{ active: email && password && check && !isEmail && !isCheck && !isPassword }"
    @click="next") 다음
</template>

<script>
export default {
  mounted() {
    if (this.$store.state.email) this.email = this.$store.state.email;
  },
  watch: {
    email(val) {
      if (!val) {
        this.isEmail = false;
        return;
      }
      const reg = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
      if (!reg.test(val)) this.isEmail = true;
      else this.isEmail = false;
    },
    password(val) {
      if (val.length < 8) this.isPassword = true;
      else this.isPassword = false;
    },
    check(val) {
      if (this.password !== val) this.isCheck = true;
      else this.isCheck = false;
    },
  },
  data() {
    return {
      isEmail: false,
      isCheck: false,
      isPassword: false,
      email: '',
      password: '',
      check: '',
    };
  },
  methods: {
    async next() {
      if (this.isEmail || this.isCheck || this.isPassword) return;
      await this.$store.dispatch('fetchInfo', {
        email: this.email,
        password: this.password,
      });
      this.$router.push('/info');
    },
  },
};
</script>
