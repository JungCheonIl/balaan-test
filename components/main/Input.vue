<style lang="less" scoped>
.input-container {
  width: 100%;
  border-radius: 4px;
  background-color: transparent;
  border: 1px solid gray;
  padding: 10px;
}
</style>
<template lang="pug">
input.input-container(
  :value="value"
  @input="$emit('input', $event.target.value)"
  v-bind="{ ...$attrs, ...$props }",
)
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
};
</script>
