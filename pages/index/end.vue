<style lang="less" scoped>
.end-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .box {
    .title {
      text-align: center;
      margin-bottom: 20px;
    }
    .label {
      margin-bottom: 10px;
    }
  }
}
</style>
<template lang="pug">
.end-container
  .box
    h1.title '000'님#[br]회원가입 되었습니다
    .label 이메일 :
    .label 주소 :
    .label 연락처 :
</template>
