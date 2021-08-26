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

      news.articles.forEach((article, index) => {
        article.id = index + 1;
        article.source = article.source.name;
        article.publishedAt = article.publishedAt.slice(0, article.publishedAt.indexOf('T'))
        delete article.source;
      })

      res.status(200).json(news.articles)

    } catch (err) {
      // console.log(err.message);
      next(err)
    }
  }
}

module.exports = newsController;