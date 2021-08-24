const fetch = require('node-fetch');
const getClosestAsteroid = require("../helpers/aneo");

class nasaController{
  static async fetchPicture(req, res, next){
    try {
      const url = req.url;
      // console.log('--------------apod-', url);
      const response = await fetch(url);
      const picture = await response.json();
      if(picture.status === 'error') throw ({ name: 'FailedPicture' });

      const { copyright, date, explanation, hdurl, title } = picture;

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
      const response = await fetch(url);
      const asteroids = await response.json();
      if(asteroids.status === 'error') throw ({ name: 'FailedAsteroid' });

      const { element_count: count, near_earth_objects: asteroidList } = asteroids
      const asteroid = getClosestAsteroid(asteroidList, todayDate)
      
      res.status(200).json({ count, ...asteroid })

    } catch (err) {
      console.log(err.message);
      next(err);
    }
  }
}

module.exports = nasaController;

