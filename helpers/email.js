function getMessage(payload){
  const { email, asteroid } = payload;
  const { count, name, distance, closestAt, velocity, isHazardous, diameter, url } = asteroid;
  return  {
    from: '"UNIVERSE CODE"<no-reply@universecode.com>',
    to: email,
    subject: "An Asteroid Close Approach You! ",
    html: `
      <p>There are <b>${count} asteroids</b> close approach you in total</p>
      <p>The closest one is named <b>${name}</b>, at distance <b>${distance.toFixed(4)} Astronomical Unit</b></p>
      <p>It close approaches at <b>${closestAt}</b></p>
      <p>Its velocity is <b>${Number(velocity).toFixed(4)} kilometers per hour</b></p>
      <p>It is estimated having diameter <b>${diameter.toFixed(4)} kilometers</b></p>
      <p>This asteroid is <b>${isHazardous? '': 'not'} hazardous</b></p>
      <p>For further information: <b>${url}</b></p>
    `
  };
}

module.exports = getMessage;