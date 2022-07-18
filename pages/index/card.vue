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
  .error {
    color: #dc2121;
  }
}
</style>
<template lang="pug">
.layout
  .label 카드번호
  .box
    .group
      main-input.input(
        id="c1"
        v-model="c_1"
        maxlength="4"
      )
      main-input.input(
        id="c2"
        v-model="c_2"
        maxlength="4"
      )
      main-input.input(
        id="c3"
        v-model="c_3"
        maxlength="4"
      )
      main-input.input(
        id="c4"
        v-model="c_4"
        maxlength="4"
      )
    .error(v-if="isCardNumber") 카드번호가 유효하지 않습니다
  main-button.button(
    :class="{ active: isSubmit }"
    @click="submit"
  ) 완료
</template>

<script>
export default {
  computed: {
    isSubmit() {
      if (this.c_1 && this.c_2 && this.c_3 && this.c_4) return true;
      return false;
    },
  },
  watch: {
    c_1(val) {
      if (val.length >= 4) {
        document.getElementById('c2').focus();
      }
    },
    c_2(val) {
      if (val.length >= 4) {
        document.getElementById('c3').focus();
      } else if (val.length === 0) {
        document.getElementById('c1').focus();
      }
    },
    c_3(val) {
      if (val.length >= 4) {
        document.getElementById('c4').focus();
      } else if (val.length === 0) {
        document.getElementById('c2').focus();
      }
    },
    c_4(val) {
      if (val.length === 0) {
        document.getElementById('c3').focus();
      }
    },
  },
  data() {
    return {
      isCardNumber: false,
      c_1: '',
      c_2: '',
      c_3: '',
      c_4: '',
    };
  },
  methods: {
    async submit() {
      if (this.numberCheck()) {
        await this.$store.dispatch('fetchInfo', {
          cardNumbers: [
            this.c_1,
            this.c_2,
            this.c_3,
            this.c_4,
          ],
        });
        this.$router.push('/end');
      } else {
        this.isCardNumber = true;
      }
    },
    numberCheck() {
      let totalNumber = [...`${this.c_1}${this.c_2}${this.c_3}${this.c_4}`].reverse();
      let All = 0;
      totalNumber.forEach((val, index) => {
        if ((index + 1) % 2 === 0) {
          const number = Number(val) * 2;
          if (number > 9) {
            const ar_n = [...number];
            let new_n = 0;
            ar_n.forEach(val => {
              new_n += Number(val);
            });
            All += Number(new_n);
          } else {
            All += Number(number);
          }
        } else {
          All += Number(val);
        }
      });
      if (All % 10 === 0) {
        return true;
      }
      return false;
    },
  },
};
</script>
