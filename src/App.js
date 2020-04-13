import React, { useState, useEffect, useRef } from 'react';
import bus from './bus.jpg';
import { SaveRoutes } from './SaveRoutes';
import { BusTimes } from './BusTimes';
import './App.css'

function useBus(query) {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const getBusData = `https://api.translink.ca/rttiapi/v1/stops/${query}/estimates?apikey=6YFw3JVqJF5VEsg2eqFs`;
        const response = await fetch(getBusData, {
          headers: {
            'Content-Type': 'application/JSON',
            Accept: 'application/json',
          },
        });
        const json = await response.json();

        const [desData] = json
        const { RouteNo, Direction, Schedules } = desData
        const [{Destination}, {ExpectedLeaveTime}, {ScheduleStatus}] = Schedules
        const [newTime] = ExpectedLeaveTime.split(' ', 1);
        console.log(newTime);
        
        
        // Destructure above

        setResults({
          RouteNo,
          Direction,
          Schedules,
          Destination,
          newTime,
          ScheduleStatus
        });

        setSchedules(Schedules);
        setError('');
      } catch {
        console.log('err');
        setError('Not Found or Scheduled');
      } finally {
        setLoading(false);
      }
      
    }
    if (query.length === 5) {
      fetchData();
    } else {
      setError('');
    }
    
  }, [query]);

  return [results, schedules, error, loading];
}



export default function App() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [results, schedules, error, loading] = useBus(query);
  const [saveRoutes, setSaveRoutes] = useState([])

  const inputRef = useRef(null);


  useEffect(() => {
    const handleFocusRef = () => {
      inputRef.current.focus();
    }
    handleFocusRef();
  }, [])


 

  
  function onSaveRoutesHandler(e) {
    e.preventDefault();
    setSaveRoutes(prevState => [...prevState, search]);
  }

  return (
    <div className="container-sm mt-4">
<div className="row">
  <div className="col">
      {loading ? (
        <div className="d-flex justify-content-center mx-auto">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="card shadow p-3 mb-5 bg-white rounded">
          <img src={bus} className="card-img-top" alt="Bus Tracker"></img>
          <div className="card-body">
            <h5 className="card-title">Vancouver Bus Stop #{search}</h5>
            <form
              onSubmit={e => {
                e.preventDefault();
                setQuery(search);
              }}
            >
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <button
                    className="btn btn-outline-secondary"
                    type="submit"
                    id="button-addon1"
                  >
                    GO!
                  </button>
                </div>
                <input
                  onChange={e => setSearch(e.target.value)}
                  value={search}
                  className="form-control"
                  placeholder="Stop number"
                  aria-describedby="button-addon1"
                  ref={inputRef}
                  
                />
              </div>
            </form>
          </div>
          <ul className="list-group list-group-flush">
            <div className="container">
              {error}
              <div className="row">
                <div className="col">
                  Next Bus <h4>{results.newTime}</h4>
                </div>
                <div className="col">
                  Route: <h4>{results.RouteNo}</h4>
                </div>
              </div>
            </div>
            <li className="list-group-item">Dest: {results.Destination}</li>
            <li className="list-group-item">
              <BusTimes schedules={schedules} />
            </li>
            <li className="list-group-item">Direction: {results.Direction}</li>
            <li className="list-group-item">Status: {!results.ScheduleStatus ? null : "On Time"}</li> 
          </ul>
          <div>

            {/* // Save Routes ToDo */}

            {/* <button type="button" className="btn btn-link">
              More scheduled buses
            </button>
            <button type="button" className="btn btn-link" onClick={onSaveRoutesHandler}>
              Save
            </button>
            <div>
              {saveRoutes.map(route => (
                <li>{route}</li>
              ))}
             
            </div> */}
          </div>
        </div>
      )}
      </div>
      </div>
    </div>
  );
}
