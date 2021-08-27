const fetch = require('node-fetch');
const getClosestAsteroid = require("../helpers/aneo");

class nasaController{
  static async fetchPicture(req, res, next){
    try {
      const url = req.url;
      const type = req.type;
      console.log('--------------apod-', url);
      if(type === 'object'){
        const response = await fetch(url);
        const picture = await response.json();
        if(picture.status === 'error') throw ({ name: 'FailedPicture' });
  
        const { copyright, date, explanation, hdurl, title } = picture;
        console.log('---apod today----');
        res.status(200).json({ copyright, date, explanation, hdurl, title })
      }
      if(type === 'array'){
        const response = await fetch(url);
        const pictures = await response.json();
        if(pictures.status === 'error') throw ({ name: 'FailedPicture' });
        
        pictures.reverse().forEach((pict, index) => {
          pict.id = index + 1;
          delete pict.media_type
          delete pict.service_version
          delete pict.url
        })
        console.log('---apod week----');
        
        res.status(200).json(pictures)
      }
      
    } catch (err) {
      console.log(err.message);
      next(err);
    }
  }
  
  static async fetchAsteroid(req, res, next){
    try {
      const url = req.url;
      console.log('--------------aneo-', url);
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

