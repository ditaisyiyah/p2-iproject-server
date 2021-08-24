class newsController{
  static async fetchNews(req, res, next){
    try {
      
    } catch (err) {
      console.log(err.message);
      next(err)
    }
  }
}

module.exports = newsController;