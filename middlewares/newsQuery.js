const newsURL = '';
const newsAPIKey = process.env.NEWS_API_KEY;

// Query Paramaters from NEWS API:
//

function newsQuery(req, res, next) {
  try {

    
    next();

  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports = newsQuery;