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
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .label {
    width: 100px;
  }
  .juso-button {
    width: 120px;
    height: 30px;
    border-radius: 4px;
    color: #ffffff;
    background-color: #323232;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .button-group {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
  }
  .button {
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
  }
  .box {
    width: 100%;
    margin-bottom: 10px;
  }
  .input {
    margin-bottom: 10px;
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
      .label 이름
      main-input(
        v-model="name"
        placeholder="이름을 입력해주세요"
      )
    .error(v-if="isKorCheck") 한글은 2글자 이상적어주세요
    .error(v-if="isComplete") 한글을 완성해주세요
    .error(v-if="isEngCheck") 영어는 3글자 이상적어주세요
    .error(v-if="isSpcCheck") 특수문자, 공백, 숫자는 사용하실 수 없습니다
  .box
    .group
      .label 연락처
      main-input(
        v-model="number"
        placeholder="연락처를 입력해주세요"
      )
    .error(v-if="isNumberCheck") 사용할 수 없는 번호입니다
  .group
    .label 주소
    .juso-button(
      @click="juso"
    ) 우편번호
  main-input.input(
    v-model="post"
    disabled
    placeholder="주소를 검색해주세요"
  )
  main-input(
    v-model="postDetail"
    placeholder="상세주소를 입력해주세요"
  )
  .button-group
    main-button.button.active(@click="$router.go(-1)") 이전
    main-button.button(
      :class="{ active: isNext }"
      @click="next") 다음
</template>

<script>
export default {
  mounted() {
    if (this.$store.state.name) this.name = this.$store.state.name;
    if (this.$store.state.number) this.number = this.$store.state.number;
    if (this.$store.state.post) this.post = this.$store.state.post;
    if (this.$store.state.postDetail) this.postDetail = this.$store.state.postDetail;
  },
  computed: {
    isNext() {
      if (this.name && this.number && this.post && this.postDetail) {
        return true;
      }
      return false;
    },
  },
  data() {
    return {
      isKorCheck: false,
      isComplete: false,
      isEngCheck: false,
      isSpcCheck: false,
      isNumberCheck: false,
      name: '',
      number: '',
      post: '',
      postDetail: '',
    };
  },
  methods: {
    juso() {
      new daum.Postcode({
        oncomplete: (data) => {
          this.post = data.address;
        },
      }).open();
    },
    async next() {
      // 적힌거 체크
      if (!this.isNext) return;
      // 정규식 체크
      if (this.nameRegCheck() || this.numberRegCheck()) {
        return;
      }
      await this.$store.dispatch('fetchInfo', {
        name: this.name,
        number: this.number,
        post: this.post,
        postDetail: this.postDetail,
      });
      this.$router.push('/card');
    },
    numberRegCheck() {
      this.isNumberCheck = false;
      const number_reg = /^01([0|1|6|7|8|9])[-\s]?([0-9]{3,4})[-\s]?([0-9]{4})$/;
      if (number_reg.test(this.number)) {
        const newNumber = this.number.replace(/^(\d{2,3})[-\s]?(\d{3,4})[-\s]?(\d{4})$/, '$1-$2-$3');
        this.number = newNumber;
      } else {
        this.isNumberCheck = true;
        return true;
      }
    },
    nameRegCheck() {
      const kor_reg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
      const kor_complete_reg = /^[가-힣]+$/;
      const eng_reg = /[a-zA-Z]/;
      const spc_reg = /[~!@#$%^&*()_+|<>?:{}]/;
      const num_reg = /[0-9]/;
      const blank_reg = /[\s]/g;
      if (blank_reg.test(this.name) || spc_reg.test(this.name) || num_reg.test(this.name)) {
        this.isSpcCheck = true;
        return true;
      } else {
        this.isSpcCheck = false;
      }

      if (kor_reg.test(this.name)) {
        if (!kor_complete_reg.test(this.name)) {
          this.isComplete = true;
          this.isKorCheck = false;
          return true;
        } else if (this.name.length < 2) {
          this.isKorCheck = true;
          this.isComplete = false;
          return true;
        } else {
          this.isComplete = false;
          this.isKorCheck = false;
        }
      } else if (eng_reg.test(this.name)) {
        if (this.name.length < 3) {
          this.isEngCheck = true;
          return true;
        } else {
          this.isEngCheck = false;
        }
      }
      return false;
    },
  },
}
</script>
