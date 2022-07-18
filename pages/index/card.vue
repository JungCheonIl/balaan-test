<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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
    margin-bottom: 10px;
  }
  .input {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
  .button {
    margin-top: 20px;
  }
}
</style>
<template lang="pug">
.layout
  .label 카드번호
  .group
    main-input.input(
      placeholder="1"
    )
    main-input.input(
      placeholder="2"
    )
    main-input.input(
      placeholder="3"
    )
    main-input.input(
      placeholder="4"
    )
  main-button.button 완료
</template>

<script>
export default {
}
</script>
