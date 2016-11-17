const DbMovieApi = {
  API_THEATERS: 'https://api.douban.com/v2/movie/in_theaters',

  async getImageList () {
    try {
      // 注意这里的await语句，其所在的函数必须有async关键字声明
      let response = await fetch(this.API_THEATERS);
      let responseJson = await response.json();
      // console.log('responseJson:' + JSON.stringify(responseJson.subjects));
      var contentData = [];
      for (let i = 0; i < responseJson.subjects.length;i++) {
        var tempItem = {};
        tempItem.image = responseJson.subjects[i].images.small;
        contentData.push(tempItem);
      }
      console.log('contentData',JSON.stringify(contentData));
      return contentData;
    } catch (error) {
      console.log('data load failed' + error);
    }
  }
}

module.exports = DbMovieApi;
