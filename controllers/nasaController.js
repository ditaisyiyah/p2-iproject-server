const axios = require("axios"); // TODO: pake fetch API aja
const getClosestAsteroid = require("../helpers/aneo");

class nasaController{
  static async fetchPicture(req, res, next){
    try {
      const url = req.url;
      // console.log('--------------apod-', url);
      const response = await axios.get(url);
      const { copyright, date, explanation, hdurl, title } = response.data;

      res.status(200).json({ copyright, date, explanation, hdurl, title })

    } catch (err) {
      console.log(err.message);
      next(err);
    }
  }
  
  static async fetchAsteroid(req, res, next){
    try {
      const url = req.url;
      // console.log('--------------aneo-', url);
      const todayDate = req.todayDate;
      const response = await axios.get(url);
      const { 
        element_count: count, 
        near_earth_objects: asteroidList 
      } = response.data
      const asteroid = getClosestAsteroid(asteroidList, todayDate)
      
      res.status(200).json({ count, ...asteroid })

    } catch (err) {
      console.log(err.message);
      next(err);
    }
  }
}

module.exports = nasaController;

