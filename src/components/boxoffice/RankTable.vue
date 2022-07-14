<template>
  <table>
    <thead>
      <tr>
        <th>순위</th>
        <th>순위변동</th>
        <th>제목</th>
        <th>개봉일</th>
        <th>누적관객수</th>
        <th>누적매출액</th>
      </tr>
    </thead>
    <tbody>
      <rank-row v-for="(item, idx) in list" :key="item.movieCd" :item="item" :idx="idx" @getMovieInfo="getMovieInfo"></rank-row>
    </tbody>
  </table>
</template>

<script>
import RankRow from './RankRow.vue';
export default {
  components: { RankRow },
  props: {
    list: Array,
    rankInten: Array,
  },
  created() {},
  methods: {
    getMovieInfo(movieCd) {
      this.$emit('getMovieInfo', movieCd);
    },
  },
};
</script>

<style scoped></style>
