<template>
  <div class="column-center">
    <h1>BoxOfficeByDay</h1>
    <div>
      <input type="date" name="" v-model="selectedDate" id="" />
      <button @click="search">검색</button>
    </div>
    <rank-table :list="list" :rankInten="rankInten"></rank-table>
  </div>
</template>

<script>
import RankTable from '../components/boxoffice/RankTable.vue';

export default {
  components: {
    RankTable,
  },
  data() {
    return {
      selectedDate: '',
      list: [],
      rankInten: [],
    };
  },
  methods: {
    search() {
      const targetDt = this.selectedDate.replaceAll('-', '');
      this.getData(targetDt);
    },
    async getData(targetDt) {
      const data = await this.getBoxOfficeByDay(targetDt);
      this.list = data.boxOfficeResult.dailyBoxOfficeList;
      this.list.forEach((item) => {
        if (item.rankInten > 0) {
          this.rankInten.push(item.rankInten + '🔺');
        } else if (item.rankInten < 0) {
          this.rankInten.push(item.rankInten + '🔻');
        } else {
          this.rankInten.push(item.rankInten);
        }
      });
    },
  },
  created() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    this.selectedDate = this.getOnlyDateStr(d);
  },
};
</script>

<style scoped></style>
