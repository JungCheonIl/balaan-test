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
      placeholder="이메일을 입력해주세요"
    )
  .group
    .label 비밀번호
    main-input(
      type="password"
      placeholder="비밀번호를 입력해주세요"
    )
  .group
    .label 확인
    main-input(
      type="password"
      placeholder="비밀번호를 한번더 입력해주세요"
    )
  main-button.button 다음
</template>

<script>
export default {
}
</script>
