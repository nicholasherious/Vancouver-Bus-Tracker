const [isError, setIsError] = useState(false);
const [nextBus, setNextBus] = useState({
  route: null,
  routeName: "",
});
const [busSchedules, setBusSchedules] = useState({
  time1: "No Bus",
  time2: "",
  time3: "",
  time4: "",
  dest: "",
});

const [userValue, setUserValue] = useState();
const [stopNum, setStopNum] = useState({
  stop1: 50276,
});

function handleClick() {
  console.log("I was clicked");
  setStopNum({
    stop1: userValue,
  });
}


setNextBus({
    route: nestB[0].RouteNo,
    routeName: nestB[0].RouteName,
  });
  setBusSchedules({
    time1: nestB[0]["Schedules"][0].ExpectedLeaveTime,
    time2: nestB[0]["Schedules"][1].ExpectedLeaveTime,
    time3: nestB[0]["Schedules"][2].ExpectedLeaveTime,
    time4: nestB[0]["Schedules"][3].ExpectedLeaveTime,
    dest: nestB[0]["Schedules"][0].Destination,
  });


  const nextBus = `https://api.translink.ca/rttiapi/v1/stops/123454/estimates?apikey=6YFw3JVqJF5VEsg2eqFs`;

      const next = await fetch(nextBus, {
        headers: {
          "Content-Type": "application/JSON",
          Accept: "application/json",
        },
      });

      const nestB = await next.json();

        // console.log(JSON.stringify(nextBus, null, 2));
  // console.dir(nextBus);