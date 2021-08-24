const fetch = require('node-fetch')

class newsController{
  static async fetchNews(req, res, next){
    try {
      const url = req.url
      console.log('-------fetch news controller', req.url);
      const response = await fetch(url);
      const news = await response.json()
      // console.log(news);

      if(news.status === 'error') throw ({ name: 'FailedNews' });

      res.status(200).json(news.articles)

    } catch (err) {
      // console.log(err.message);
      next(err)
    }
  }
}

module.exports = newsController;