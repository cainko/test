"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class App extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude=hourly,minutely&units=imperial&appid=9e5a2c7a090ed13c642884004946fafd`;
      console.log(apiURL);
      fetch(apiURL).then(res => res.json()).then(result => {
        this.setState({
          isLoaded: true,
          items: result.daily
        });
      }, error => {
        this.setState({
          isLoaded: true,
          error
        });
      });
    }, // If location data could not be retrived, default to LA's weather.
    () => {
      fetch("https://api.openweathermap.org/data/2.5/onecall?lat=34.052231&lon=-118.243683&exclude=hourly,minutely&units=imperial&appid=9e5a2c7a090ed13c642884004946fafd").then(res => res.json()).then(result => {
        this.setState({
          isLoaded: true,
          items: result.daily
        });
      }, error => {
        this.setState({
          isLoaded: true,
          error
        });
      });
    });
  }

  render() {
    const {
      error,
      isLoaded,
      items
    } = this.state;

    if (error) {
      return /*#__PURE__*/_react.default.createElement("div", null, "Error: ", error.message);
    } else if (!isLoaded) {
      return /*#__PURE__*/_react.default.createElement("div", null, "Loading...");
    } else {
      return /*#__PURE__*/_react.default.createElement("main", null, /*#__PURE__*/_react.default.createElement("div", {
        className: "container"
      }, /*#__PURE__*/_react.default.createElement(Day, {
        num: items[0]
      }), /*#__PURE__*/_react.default.createElement(Day, {
        num: items[1]
      }), /*#__PURE__*/_react.default.createElement(Day, {
        num: items[2]
      }), /*#__PURE__*/_react.default.createElement(Day, {
        num: items[3]
      }), /*#__PURE__*/_react.default.createElement(Day, {
        num: items[4]
      })));
    }
  }

}

const Day = props => {
  var date = new Date(props.num.dt * 1000).toLocaleString("en-US", {
    weekday: "short"
  });
  var weather = 'http://openweathermap.org/img/wn/' + props.num.weather[0].icon + '@2x.png';
  var high = Math.round(props.num.temp.max);
  var low = Math.round(props.num.temp.min);
  return /*#__PURE__*/_react.default.createElement("div", {
    id: "weather"
  }, /*#__PURE__*/_react.default.createElement("p", {
    id: "date"
  }, date), /*#__PURE__*/_react.default.createElement("img", {
    id: "icon",
    src: weather
  }), /*#__PURE__*/_react.default.createElement("div", {
    id: "temp"
  }, /*#__PURE__*/_react.default.createElement("p", {
    id: "high"
  }, high, "\xB0"), /*#__PURE__*/_react.default.createElement("p", {
    id: "low"
  }, low, "\xB0")));
};

const domContainer = document.querySelector('#weather-widget');

_reactDom.default.render( /*#__PURE__*/_react.default.createElement(_react.default.StrictMode, null, /*#__PURE__*/_react.default.createElement(App, null)), domContainer);
