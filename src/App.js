import { useState } from 'react';
import './App.css';

function App() {

  const [city, setCity] = useState('')
  const [weatherForecast, setWeatherForecast] = useState(null)

  const handleChange = (e) => {
    setCity(e.target.value)
  }

  const handleSearch = () => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=b0aea2ebb370492ca11221311232605&q=${city}&lang=pt`)
      .then((response) => {
        if (response.status == 200) {
          return response.json()
        }
      })
      .then((data) => {
        setWeatherForecast(data)
      });
  }





  return (
    <div className='body'>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a className="navbar-brandb text-white" href="#">
          Everton Previsão do tempo
        </a>
      </nav>


      <main className="container">
        <div className="jumbotron">
          <h1>
            Verifique a previsão do tempo da sua cidade:
          </h1>
          <div className="row mb-4 features">
            <div className="col-md-6 d-flex">
              <input
                onChange={handleChange} className="form-control mr-3" value={city} />
              <button onClick={handleSearch} className="btn btn-primary btn-lg">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>

          <hr className="linha-horizontal" />

          {weatherForecast ? (
            <div>
              <div>
          
                <h3> {weatherForecast.location.name}</h3>
                <p className='lead'>
                  Temperatura : {weatherForecast.current.temp_c} ° graus
                </p>
              </div>

              <div className='mt-4 align-items-center'>
                <div>
                  <img className='mr-4' src={weatherForecast.current.condition.icon} />
                </div>

                <div className='conditions'>
                  <div className='last-box_umidity'>
                  <i class="fa-sharp fa-solid fa-droplet"></i>
                    <p>{weatherForecast.current.humidity}% </p>
                  
                  </div>
                  <hr/>
                  <div className='last-box_wind'>
                  <i className="fas fa-wind"></i>
                    <p> {weatherForecast.current.wind_kph} Km/h</p>
                    
                  </div>
                </div>


              </div>
            </div>
          ) : null}



        </div>
      </main>
    </div>
  );
}

export default App;
