import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import { Switch, FormControlLabel } from "@mui/material";

function App() {
  const [workerList, setWorkerList] = useState([]);

  const workerNames = [
    "Tony Caprarese",
    "Jeff Evans",
    "Scott A Schmunk",
    "Bart Wise",
    "Joe Palms",
    "Charlie Koenn",
    "Michael Jurgenson",
  ];

  useEffect(() => {
    const workers = workerNames.map((name) => ({
      name,
      isCheckedOut: false,
      timeStamp: 0,
    }));
    setWorkerList(workers);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWorkerList((prevList) => [...prevList]);
    }, 1000); // Update every second
    return () => clearInterval(interval); // Clean up the interval when the component unmounts
  }, []);

  function timeStamper() {
    return Date.now();
  }

  function timeElapsed(timeStamp) {
    const elapsed = Date.now() - timeStamp;
    const minutes = Math.floor(elapsed / 60000); // Convert to minutes
    const hours = Math.floor(minutes / 60); // Convert to hours

    if (hours > 0) {
      return `${hours} hours ${minutes % 60} minutes`;
    } else {
      return `${minutes} minutes`;
    }
  }

  const handleSwitchChange = (index) => (event) => {
    const updatedList = [...workerList];
    updatedList[index].isCheckedOut = event.target.checked;
    if (event.target.checked) {
      updatedList[index].timeStamp = timeStamper();
    } else {
      updatedList[index].timeStamp = 0;
    }
    setWorkerList(updatedList);
  };

  return (
    <>
      <h1 className="text-[#0c1872;] text-4xl font-bold drop-shadow-md	">
        Swisher Commercial
      </h1>
      <h1 className="text-[#0c1872;] text-3xl font-bold drop-shadow-md	">
        Check-In
      </h1>
      <div className="card"></div>
      <div className="worker-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Time Elapsed</th>
            </tr>
          </thead>
          <tbody>
            {workerList.map((worker, index) => (
              <tr key={index}>
                <td
                  className={
                    worker.isCheckedOut ? "bg-[#8c4b4e]" : "bg-[#5b8772]"
                  }
                >
                  <span className="font-bold text-xl">{worker.name}</span>
                </td>
                <td>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={worker.isCheckedOut}
                        onChange={handleSwitchChange(index)}
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "red",
                          },
                          "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
                            {
                              backgroundColor: "red",
                            },
                          "& .MuiSwitch-switchBase": {
                            color: "green",
                          },
                          "& .MuiSwitch-switchBase+.MuiSwitch-track": {
                            backgroundColor: "green", // Green track when unchecked
                          },
                        }}
                      />
                    }
                    label={worker.isCheckedOut ? "Out of Office" : "In Office"}
                  />
                </td>
                <td>
                  {worker.isCheckedOut && (
                    <span>{timeElapsed(worker.timeStamp)}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
