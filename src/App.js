import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import bus from './bus.jpg';
import { SaveRoutes } from './SaveRoutes';
import { BusTimes } from './BusTimes';

const Wrapper = styled.section`
  padding: 0.5em;
  width: 375px;
  margin: auto;
  background: powderblue;
`;

function useBus(query) {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    // console.log('useEffect');
    // console.log({ query });
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

        // Destructure above
        // console.log(RouteNo, Direction, Destination, ExpectedLeaveTime, ScheduleStatus)
        // console.log(json)

        setResults({
          RouteNo,
          Direction,
          Schedules,
          Destination,
          ExpectedLeaveTime,
          ScheduleStatus
        });

      

        setSchedules(Schedules);
        // console.log(schedules)

        // setSchedules({
        //   time1: json[0].Schedules[0].ExpectedLeaveTime,
        //   time2: json[0].Schedules,
        //   time3: null,
        //   dest: json[0].Schedules[0].Destination,
        // });

        // console.log(json[0].Schedules);
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

  
  function onSaveRoutesHandler(e) {
    e.preventDefault();
    setSaveRoutes(prevState => [...prevState, search]);
  }
  // console.log({ results });
  // console.log({schedules});
  // console.log(schedules)
  return (
    <Wrapper>
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
                />
              </div>
            </form>
          </div>
          <ul className="list-group list-group-flush">
            <div className="container">
              {error}
              <div className="row">
                <div className="col">
                  Next Bus <h4>{results.ExpectedLeaveTime}</h4>
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
            <button type="button" className="btn btn-link">
              More scheduled buses
            </button>
            <button type="button" className="btn btn-link" onClick={onSaveRoutesHandler}>
              Save
            </button>
            <div>
              {saveRoutes.map(route => (
                <li>{route}</li>
              ))}
             
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
}
