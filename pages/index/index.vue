<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
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
}
</style>
<template lang="pug">
.layout
  .group
    .label 이메일
    main-input(
      v-model="email"
      placeholder="이메일을 입력해주세요"
    )
  .group
    .label 비밀번호
    main-input(
      type="password"
      v-model="password"
      placeholder="비밀번호를 입력해주세요"
    )
  .group
    .label 확인
    main-input(
      v-model="check"
      type="password"
      placeholder="비밀번호를 한번더 입력해주세요"
    )
  main-button.button(@click="next") 다음
</template>

<script>
export default {
  mounted() {
    if (this.$store.state.info) {
      const infoData = this.$store.state.info;
      if (this.$store.state.info.email) this.email = this.$store.state.info.email;
    }
  },
  data() {
    return {
      email: '',
      password: '',
      check: '',
    };
  },
  methods: {
    async next() {
      if (this.password !== this.check) {
        alert('비밀번호가 다릅니다');
        return;
      }
      await this.$store.dispatch('fetchInfo', {
        email: this.email,
        password: this.password,
      });
      this.$router.push('/info');
    },
  },
};
</script>
