<style lang="less" scoped>
.button-container {
  width: 100%;
  height: 45px;
  border-radius: 4px;
  background-color: #989898;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  cursor: not-allowed;
  &.active {
    background-color: #dc2121;
    cursor: pointer;
  }
}
</style>
<template lang="pug">
.button-container(@click="$emit('click')")
  slot
</template>
