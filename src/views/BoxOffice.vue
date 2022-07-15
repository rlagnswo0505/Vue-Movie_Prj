<template>
  <div class="column-center">
    <h1>{{ title }}</h1>
    <h3 v-if="pathName === 'boxOfficeByWeek'">{{ year }} 년도 {{ week }}주차 주간 영화 순위</h3>
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
      title: '',
      selectedDate: '',
      list: [],
      year: '',
      week: '',
      modalShow: false,
      movieNm: '',
      actors: [],
      pathName: '',
      changeDate: '',
    };
  },
  methods: {
    search() {
      const targetDt = this.selectedDate.replaceAll('-', '');
      this.getData(targetDt);
    },
    async getData(targetDt) {
      {
        switch (this.pathName) {
          case 'boxOfficeByDay':
            this.title = '일별 박스오피스';
            this.list = (await this.getBoxOfficeByDay(targetDt)).boxOfficeResult.dailyBoxOfficeList;
            this.search();
            break;
          case 'boxOfficeByWeek':
            this.title = '주간 박스오피스';
            this.list = (await this.getBoxOfficeByWeek(targetDt)).boxOfficeResult.weeklyBoxOfficeList;
            this.year = (await this.getBoxOfficeByWeek(targetDt)).boxOfficeResult.yearWeekTime.slice(0, 4);
            this.week = (await this.getBoxOfficeByWeek(targetDt)).boxOfficeResult.yearWeekTime.slice(4);
            this.search();
            break;
        }
      }
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
    console.log('aaa');
    const d = new Date();

    this.pathName = this.$route.name;
    switch (this.pathName) {
      case 'boxOfficeByDay':
        this.changeDate = d.setDate(d.getDate() - 1);
        this.selectedDate = this.getOnlyDateStr(d);
        this.title = '일별 박스오피스';
        break;
      case 'boxOfficeByWeek':
        this.changeDate = d.setDate(d.getDate() - 7);
        this.selectedDate = this.getOnlyDateStr(d);
        this.title = '주간 박스오피스';
        break;
    }
  },
  updated() {
    const d = new Date();
    this.pathName = this.$route.name;
    switch (this.pathName) {
      case 'boxOfficeByDay':
        this.changeDate = d.setDate(d.getDate() - 1);
        this.selectedDate = this.getOnlyDateStr(d);
        this.title = '일별 박스오피스';
        break;
      case 'boxOfficeByWeek':
        this.changeDate = d.setDate(d.getDate() - 7);
        this.selectedDate = this.getOnlyDateStr(d);
        this.title = '주간 박스오피스';
        break;
    }
  },
};
</script>

<style scoped></style>
