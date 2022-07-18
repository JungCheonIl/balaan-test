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
  .input {
    margin-bottom: 10px;
  }
}
</style>
<template lang="pug">
.layout
  .group
    .label 이름
    main-input(
      v-model="name"
      placeholder="이름을 입력해주세요"
    )
  .group
    .label 연락처
    main-input(
      v-model="number"
      placeholder="연락처를 입력해주세요"
    )
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
    main-button.button(@click="$router.go(-1)") 이전
    main-button.button 다음
</template>

<script>
export default {
  data() {
    return {
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
          console.log(data.jibunAddress);
          console.log(data.roadAddress);
          console.log(data);
        },
      }).open();
    },
  },
}
</script>
