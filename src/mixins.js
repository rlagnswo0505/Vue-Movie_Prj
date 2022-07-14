import axios from 'axios';

export default {
  data() {
    return {
      key: '3d0b04cd8ff4c018915597cba88560a0',
      baseUrl: 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/',
      BoxOfficeByDay: 'boxoffice/searchDailyBoxOfficeList.json',
      BoxOfficeByWeek: 'boxoffice/searchWeeklyBoxOfficeList.json',
      searchMovieInfo: 'movie/searchMovieInfo.json',
    };
  },
  methods: {
    async $api(url, parameter) {
      return (
        await axios
          .get(url, {
            params: parameter,
          })
          .catch((e) => {
            console.log(e);
          })
      ).data;
    },
    async getBoxOfficeByDay(targetDt) {
      const parameter = {
        key: this.key,
        targetDt, // key 값과 변수명이 같으면 한 줄로 표현 가능
        // itemPerPage: 5,
      };
      const url = this.baseUrl + this.BoxOfficeByDay;
      return await this.$api(url, parameter);
    },
    getOnlyDateStr(date) {
      return date.toISOString().slice(0, 10);
    },
    async getBoxOfficeByWeek(targetDt) {
      const parameter = {
        key: this.key,
        targetDt, // key 값과 변수명이 같으면 한 줄로 표현 가능
        // itemPerPage: 5,
        weekGb: '0',
      };
      const url = this.baseUrl + this.BoxOfficeByWeek;
      return await this.$api(url, parameter);
    },
    async getMovieInfo(movieCd) {
      const parameter = {
        key: this.key,
        movieCd,
      };
      const url = this.baseUrl + this.searchMovieInfo;
      return await this.$api(url, parameter);
    },
  },
};
