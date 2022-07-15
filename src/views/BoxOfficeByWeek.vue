<template>
  <div class="column-center">
    <h1>BoxOfficeByWeek</h1>
    <h3>{{ year }} 년도 {{ week }}주차 주간 영화 순위</h3>
    <div>
      <input type="date" name="" v-model="selectedDate" id="" />
      <button @click="search">검색</button>
    </div>
    <rank-table :list="list" @getMovieInfo="getMovieInfo" @showModal="showModal"></rank-table>
    <AlertModal :show="modalShow" :header="movieNm" :actors="actors" @close="closeModal"></AlertModal>
  </div>
</template>

<script>
import RankTable from '../components/boxoffice/RankTable.vue';
import AlertModal from '../components/common/AlertModal.vue';

export default {
  components: {
    RankTable,
    AlertModal,
  },
  data() {
    return {
      selectedDate: '',
      list: [],
      year: '',
      week: '',
      modalShow: false,
      movieNm: '',
      actors: [],
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
    showModal(info) {
      // console.log(info);
      this.movieNm = info.movieNm;
      this.actors = info.actors;
      this.modalShow ? (this.modalShow = false) : (this.modalShow = true);
    },
    closeModal() {
      this.modalShow = false;
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
