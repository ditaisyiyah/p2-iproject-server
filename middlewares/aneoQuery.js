const aneoURL = 'https://api.nasa.gov/neo/rest/v1/feed?api_key=';
const nasaAPIKey = process.env.NASA_API_KEY;

// Query Paramaters from ANEO API:
// start_date YYYY-MM-DD, default none
// end_date YYYY-MM-DD, default 7 days after start_date

function aneoQuery(req, res, next) {
  try {
    const today = new Date();
    let yyyy = today.getFullYear();
    let mm = today.getMonth();
    let dd = today.getDate();
    
    if(mm < 10) mm = `0${mm+1}`;
    if(dd < 10) dd = `0${dd}`;
    
    const date = `${yyyy}-${mm}-${dd}`;
    const query = `&start_date=${date}&end_date=${date}`;
  
    req.url = (`${aneoURL}${nasaAPIKey}${query}`);
    req.todayDate = date;
    
    next();

  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports = aneoQuery;