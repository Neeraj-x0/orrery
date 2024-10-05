const planets =[
    {
      "name": "Mercury",
      "textureUrl": "/textures/2k_mercury.jpg",
      "radius": 0.3,
      "semiMajorAxis": 3,
      "eccentricity": 0.2056,
      "orbitalPeriod": 88,
      "moons": []
    },
    {
      "name": "Venus",
      "textureUrl": "/textures/2k_venus_surface.jpg",
      "radius": 0.6,
      "semiMajorAxis": 4.5,
      "eccentricity": 0.0067,
      "orbitalPeriod": 224.7,
      "moons": []
    },
    {
      "name": "Earth",
      "textureUrl": "/textures/2k_earth_daymap.jpg",
      "radius": 0.6,
      "semiMajorAxis": 6,
      "eccentricity": 0.0167,
      "orbitalPeriod": 365.25,
      "moons": [
        {
          "name": "Moon",
          "textureUrl": "/textures/2k_moon.jpg",
          "radius": 0.1,
          "semiMajorAxis": 3,
          "orbitalPeriod": 27.3
        }
      ]
    },
    {
      "name": "Mars",
      "textureUrl": "/textures/2k_mars.jpg",
      "radius": 0.4,
      "semiMajorAxis": 8,
      "eccentricity": 0.0934,
      "orbitalPeriod": 687,
      "moons": [
        {
          "name": "Phobos",
          "textureUrl": "/textures/2k_moon.jpg",
          "radius": 0.05,
          "semiMajorAxis": 1.5,
          "orbitalPeriod": 10
        },
        {
          "name": "Deimos",
          "textureUrl": "/textures/2k_moon.jpg",
          "radius": 0.03,
          "semiMajorAxis": 3.2,
          "orbitalPeriod": 12
        }
      ]
    },
    {
      "name": "Jupiter",
      "textureUrl": "/textures/2k_jupiter.jpg",
      "radius": 0.9,
      "semiMajorAxis": 15,
      "eccentricity": 0.0489,
      "orbitalPeriod": 4331,
      "moons": [
        {
          "name": "Io",
          "textureUrl": "/textures/2k_moon.jpg",
          "radius": 0.1,
          "semiMajorAxis": 6,
          "orbitalPeriod": 1.77
        },
        {
          "name": "Europa",
          "textureUrl": "/textures/2k_moon.jpg",
          "radius": 0.09,
          "semiMajorAxis": 9.7,
          "orbitalPeriod": 3.55
        },
        {
          "name": "Ganymede",
          "textureUrl": "/textures/2k_moon.jpg",
          "radius": 0.13,
          "semiMajorAxis": 15,
          "orbitalPeriod": 7.15
        },
        {
          "name": "Callisto",
          "textureUrl": "/textures/2k_moon.jpg",
          "radius": 0.12,
          "semiMajorAxis": 26,
          "orbitalPeriod": 16.69
        }
      ]
    },
    {
      "name": "Saturn",
      "textureUrl": "/textures/2k_saturn.jpg",
      "radius": 0.8,
      "semiMajorAxis": 20,
      "eccentricity": 0.0565,
      "orbitalPeriod": 10747,
      "moons": [
        {
          "name": "Titan",
          "textureUrl": "/textures/2k_moon.jpg",
          "radius": 0.2,
          "semiMajorAxis": 20,
          "orbitalPeriod": 15.95
        },
        {
          "name": "Rhea",
          "textureUrl": "/textures/2k_moon.jpg",
          "radius": 0.1,
          "semiMajorAxis": 8,
          "orbitalPeriod": 4.52
        }
      ]
    },
    {
      "name": "Uranus",
      "textureUrl": "/textures/2k_uranus.jpg",
      "radius": 0.7,
      "semiMajorAxis": 25,
      "eccentricity": 0.0457,
      "orbitalPeriod": 30589,
      "moons": [
        {
          "name": "Miranda",
          "textureUrl": "/textures/2k_moon.jpg",
          "radius": 0.05,
          "semiMajorAxis": 3.4,
          "orbitalPeriod": 1.41
        },
        {
          "name": "Ariel",
          "textureUrl": "/textures/2k_moon.jpg",
          "radius": 0.07,
          "semiMajorAxis": 5.8,
          "orbitalPeriod": 2.52
        },
        {
          "name": "Umbriel",
          "textureUrl": "/textures/2k_moon.jpg",
          "radius": 0.06,
          "semiMajorAxis": 8.4,
          "orbitalPeriod": 4.14
        },
        {
          "name": "Titania",
          "textureUrl": "/textures/2k_moon.jpg",
          "radius": 0.08,
          "semiMajorAxis": 13.5,
          "orbitalPeriod": 8.71
        },
        {
          "name": "Oberon",
          "textureUrl": "/textures/2k_moon.jpg",
          "radius": 0.08,
          "semiMajorAxis": 15,
          "orbitalPeriod": 13.46
        }
      ]
    },
    {
      "name": "Neptune",
      "textureUrl": "/textures/2k_neptune.jpg",
      "radius": 0.7,
      "semiMajorAxis": 30,
      "eccentricity": 0.0086,
      "orbitalPeriod": 59800,
      "moons": [
        {
          "name": "Triton",
          "textureUrl": "/textures/2k_moon.jpg",
          "radius": 0.12,
          "semiMajorAxis": 7.5,
          "orbitalPeriod": 5.88
        }
      ]
    }
  ];
  export default planets;