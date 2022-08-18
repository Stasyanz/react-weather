import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";


let API_KEY = process.env.REACT_APP_API_KEY;

class App extends React.Component {

    state = {
        temp: undefined,
        city: undefined,
        sunset: undefined,
        sunrise: undefined,
        country: undefined,
        error: undefined
    }

    gettingWeather = async (e) => {
        e.preventDefault();
        
        var city = e.target.elements.city.value;

        if(city) {
            if (process.env.REACT_APP_API_KEY) {
                const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
                const data = await api_url.json();
        
                var sunrise = data.sys.sunrise;
                var date = new Date();
                date.setTime(sunrise);
                var sunriseDate = date.getHours() + ":" + date.getMinutes();

                var sunset = data.sys.sunset;
                // var date = new Date();
                date.setTime(sunset);
                var sunsetDate = date.getHours() + ":" + date.getMinutes();

                this.setState({
                    temp: data.main.temp,
                    city: data.name,
                    sunset: sunsetDate,
                    sunrise: sunriseDate,
                    country: data.sys.country,
                    error: undefined
                });
            } else {
                this.setState({
                    temp: undefined,
                    city: undefined,
                    sunset: undefined,
                    sunrise: undefined,
                    country: undefined,
                    error: 'API KEY is not provided'
                });
            }

        } else {
            this.setState({
                temp: undefined,
                city: undefined,
                sunset: undefined,
                sunrise: undefined,
                country: undefined,
                error: 'Enter city name'
            });
        }
    }
    render() {
        return (
            <div className="wrapper">
                <div className="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-5 info">
                                <Info />
                            </div>
                            <div className="col-sm-7 form">
                                <Form weatherMethod = {this.gettingWeather} />
                                <Weather 
                                    temp={this.state.temp}
                                    city={this.state.city}
                                    country={this.state.country}
                                    sunrise={this.state.sunrise}
                                    sunset={this.state.sunset}
                                    error={this.state.error} />
                            </div>
                        </div>    
                    </div>   
                </div>
            </div>
        );
    }
}

export default App;
