function getClosestAsteroid(asteroidList, todayDate) {
  const distanceList = asteroidList[todayDate]
    .map(asteroid => +asteroid.close_approach_data[0].miss_distance.astronomical);
  const closestDistance = Math.min.apply(null, distanceList);
  const index = distanceList.indexOf(closestDistance);

  const closestAsteroid = asteroidList[todayDate][index];

  const theAsteroid = {
    name: closestAsteroid.name,
    distance: closestDistance, // AU
    closestAt: closestAsteroid.close_approach_data[0].close_approach_date_full,
    velocity: closestAsteroid.close_approach_data[0].relative_velocity.kilometers_per_hour,
    isHazardous: closestAsteroid.is_potentially_hazardous_asteroid, 
    diameter: 0.5 * Object
      .values(closestAsteroid.estimated_diameter.kilometers)
      .reduce((acc, cur) => acc + cur),
    url: closestAsteroid.nasa_jpl_url,
  }
  
  return theAsteroid;
}

module.exports = getClosestAsteroid;