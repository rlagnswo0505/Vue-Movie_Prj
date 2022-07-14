<template>
  <div class="column-center">
    <h1>BoxOfficeByWeek</h1>
    <h3>{{ year }} 년도 {{ week }}주차 주간 영화 순위</h3>
    <div>
      <input type="date" name="" v-model="selectedDate" id="" />
      <button @click="search">검색</button>
    </div>
    <rank-table :list="list" @getMovieInfo="getMovieInfo"></rank-table>
  </div>
</template>

<script>
import RankTable from '../components/boxoffice/RankTable.vue';
export default {
  components: { RankTable },
  data() {
    return {
      selectedDate: '',
      list: [],
      year: '',
      week: '',
    };
  },
  methods: {
    search() {
      const targetDt = this.selectedDate.replaceAll('-', '');
      this.getData(targetDt);
    },
    async getData(targetDt) {
      const data = await this.getBoxOfficeByWeek(targetDt);
      console.log(data);
      this.list = data.boxOfficeResult.weeklyBoxOfficeList;
      this.year = data.boxOfficeResult.yearWeekTime.slice(0, 4);
      this.week = data.boxOfficeResult.yearWeekTime.slice(4);
    },
  },
  created() {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    this.selectedDate = this.getOnlyDateStr(d);
  },
};
</script>

<style scoped></style>
