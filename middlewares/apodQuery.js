const apodURL = 'https://api.nasa.gov/planetary/apod?api_key=';
const nasaAPIKey = process.env.NASA_API_KEY;

// Query Paramaters from APOD API:
// date YYYY-MM-DD, default today
// start_date YYYY-MM-DD, default none
// end_date YYYY-MM-DD, default today (not needed)

function apodQuery(req, res, next) {
  try {
    let { date, start_date } = req.query;
    
    let query = '';
    if(date && !start_date){
      date = date.slice(0, date.indexOf('T'))
      query += `&date=${date}`;
      req.type = 'object'
    }else if(!date && start_date){
      start_date = start_date.slice(0, start_date.indexOf('T'))
      query += `&start_date=${start_date}`;
      req.type = 'array'
    }

    req.url = (`${apodURL}${nasaAPIKey}${query}`);
    
    next();

  } catch (err) {
    next(err);
  }
}

module.exports = apodQuery;