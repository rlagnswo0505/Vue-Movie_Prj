<template>
  <tr @click="showMovieInfo(item.movieCd)">
    <td>{{ item.rank }}</td>
    <td :class="{ red: red, blue: blue }">
      {{ changeColor(item.rankInten) }}
      <i v-html="icon"></i>
    </td>
    <td>{{ item.movieNm }}</td>
    <td>{{ item.openDt }}</td>
    <td>{{ audiAcc }}</td>
    <td>{{ salesAcc }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    item: Object,
    rankInten: Array,
    idx: Number,
  },
  data() {
    return {
      red: false,
      blue: false,
      icon: '',
      info: {},
    };
  },
  computed: {
    audiAcc() {
      return this.createComma(this.item.audiAcc);
    },
    salesAcc() {
      return this.createComma(this.item.salesAcc);
    },
  },
  methods: {
    createComma(str) {
      return str.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    },
    changeColor(num) {
      if (num > 0) {
        this.red = true;
        this.icon = '<i class="fa-solid fa-angle-up"></i>';
      } else if (num < 0) {
        this.blue = true;
        this.icon = '<i class="fa-solid fa-angle-down"></i>';
      }
      return num;
    },
    async showMovieInfo(movieCd) {
      const data = await this.getMovieInfo(movieCd);
      this.info = data.movieInfoResult.movieInfo;
      console.log(data.movieInfoResult);
      this.$emit('showModal', this.info);
    },
  },
};
</script>

<style>
.red {
  color: tomato;
}
.blue {
  color: cornflowerblue;
}
</style>
