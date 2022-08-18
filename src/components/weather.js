import React from "react";

const Weather  = (props) => {
    return(

    <div className="infoWeath">
        {props.city &&
        <div>
            <p>City: {props.city}, {props.country}</p>
            <p>Temp: {props.temp}</p>
            <p>Sunrise: {props.sunrise}</p>
            <p>Sunset: {props.sunset}</p>                
        </div>
        }
        <p className="error">{props.error}</p>
    
    </div>
    )
};

export default Weather;
