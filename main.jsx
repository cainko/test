import React from 'react'
import ReactDOM from 'react-dom'


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: []
		};
	}


	componentDidMount() {		
		navigator.geolocation.getCurrentPosition((position) => {
  		let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude=hourly,minutely&units=imperial&appid=9e5a2c7a090ed13c642884004946fafd`;
			console.log(apiURL)
			fetch(apiURL)
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						items: result.daily
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
			},
			// If location data could not be retrived, default to LA's weather.
			() => {
			fetch("https://api.openweathermap.org/data/2.5/onecall?lat=34.052231&lon=-118.243683&exclude=hourly,minutely&units=imperial&appid=9e5a2c7a090ed13c642884004946fafd")
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						items: result.daily
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
			}
			);
	}

	render() {
		const { error, isLoaded, items } = this.state;
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			return (
				<main>
					<div className="container">
						<Day num={items[0]} />
						<Day num={items[1]} />
						<Day num={items[2]} />
						<Day num={items[3]} />
						<Day num={items[4]} />
					</div>
				</main>
			);
		}
	}
}


const Day = (props) => {
	var date = new Date(props.num.dt * 1000).toLocaleString("en-US", { weekday: "short" })
	var weather = 'http://openweathermap.org/img/wn/' + props.num.weather[0].icon + '@2x.png';
	var high = Math.round(props.num.temp.max);
	var low = Math.round(props.num.temp.min);
	return (
		<div id="weather">
			<p id="date">{date}</p>
			<img id="icon" src={weather} />
			<div id="temp">
				<p id="high">{high}°</p>
				<p id="low">{low}°</p>
			</div>
		</div>
	)
}


const domContainer = document.querySelector('#weather-widget');
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  domContainer
)
