const apodURL = 'https://api.nasa.gov/planetary/apod?api_key=';
const nasaAPIKey = process.env.NASA_API_KEY;

// Query Paramaters from APOD API:
// date YYYY-MM-DD, default today
// start_date YYYY-MM-DD, default none
// end_date YYYY-MM-DD, default today

function apodQuery(req, res, next) {
  try {
    const { date, start_date, end_date } = req.query;
    
    let query = '';
    if(date) query += `&date=${date}`;
    if(start_date) query += `&start_date=${start_date}`;
    if(end_date) query += `&end_date=${end_date}`;

    req.url = (`${apodURL}${nasaAPIKey}${query}`);
    
    next();

  } catch (err) {
    next(err);
  }
}

module.exports = apodQuery;