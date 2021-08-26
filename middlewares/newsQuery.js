const newsURL = 'https://newsapi.org/v2/everything?apiKey=';
const newsAPIKey = process.env.NEWS_API_KEY;

// Query Paramaters from NEWS API (everything):
// search result default 100, and max 100 for non-paid key
// language, SETTED en
// sortBy, SETTED relevancy
// pageSize, SETTED 10, default 20
// q, search keyword
// page, default 1 and start at 1

function newsQuery(req, res, next) {
  try {
    console.log('-----news query middleware', req.query);
    const { keywords, page } = req.query;

    let query = '';
    query += `&language=en`
    query += `&sortBy=relevancy`
    query += `&pageSize=10`
    if(keywords) query += `&q=${keywords}`;
    if(page) query += `&page=${page}`;

    req.url = `${newsURL}${newsAPIKey}${query}`;
    
    next();

  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports = newsQuery;