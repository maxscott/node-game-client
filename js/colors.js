var colors1 = {
  background: 'rgb(120, 200, 200)',
  player1: {
    main: 'rgb(200, 100, 100)',
    border: 'pink'
  },
  player2: {
    main: 'rgb(200, 200, 100)',
    border: 'bisque'
  },
}
var colors2 = {
  background: 'rgb(0, 20, 20)',
  player1: {
    main: 'rgba(0, 200, 0, .2)',
    border: 'rgb(0, 200, 0)'
  },
  player2: {
    main: 'rgba(200, 0, 0, .2)',
    border: 'rgb(200, 0, 0)'
  },
}

module.exports = Math.random() < .5 ? colors1 : colors2;
