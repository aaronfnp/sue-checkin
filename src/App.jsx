import { useEffect, useState } from "react";
import { Switch, FormControlLabel } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import "./App.css";
import "./index.css";

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
    "Cyd Debol",
    "Sandy Goetz",
    "Sue Kim",
  ];

  function refreshLocal() {
    const workers = workerNames.map((name) => ({
      name,
      isCheckedOut: false,
      timeStamp: 0,
    }));
    setWorkerList(workers);
    localStorage.setItem("workerList", JSON.stringify(workers));
  }

  // Saving Locally
  function saveLocally() {
    localStorage.setItem("workerList", JSON.stringify(workerList));
    console.log("updating workerlist");
  }

  // Loading Local
  useEffect(() => {
    const savedData = localStorage.getItem("workerList");
    const parsedData = JSON.parse(savedData);

    if (parsedData && Array.isArray(parsedData)) {
      setWorkerList(parsedData);
    } else {
      const workers = workerNames.map((name) => ({
        name,
        isCheckedOut: false,
        timeStamp: 0,
      }));
      setWorkerList(workers);
    }
  }, [workerList]);

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
    saveLocally();
  };

  return (
    <div className="px-4 py-6 ">
      <div className="flex flex-col align-center items-center mb-4">
        <div className="max-w-fit border-2 p-4 bg-[#0c1872] border-[#0c1872] rounded-2xl drop-shadow-md">
          <h1 className="text-[#0c1872] text-4xl text-white font-bold drop-shadow-md text-center">
            Swisher
          </h1>
          <h1 className="text-[#0c1872] text-4xl text-white font-bold drop-shadow- text-center">
            Commercial
          </h1>
        </div>
        <h2 className="text-[#0c1872] text-xl font-semibold drop-shadow-md text-center mt-2 underline">
          In/Out Tracker
        </h2>
      </div>
      <div className="worker-table drop-shadow-md">
        <div className="hidden lg:block">
          {/* Table for larger screens */}
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Status</th>
                <th className="border border-gray-300 p-2">Time Elapsed</th>
              </tr>
            </thead>
            <tbody>
              {workerList.map((worker, index) => (
                <tr key={index}>
                  <td
                    className={`border border-gray-300 p-2 ${
                      worker.isCheckedOut ? "bg-red-200" : "bg-green-200"
                    }`}
                  >
                    <span className="font-bold text-lg">{worker.name}</span>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <div className="flex items-center justify-between">
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
                            backgroundColor: "green",
                          },
                        }}
                      />
                      <span style={{ marginRight: "1rem" }}>
                        {worker.isCheckedOut ? "Out of Office" : "In Office"}
                      </span>
                    </div>
                  </td>

                  <td className="border border-gray-300 p-2">
                    {worker.isCheckedOut && (
                      <span>{timeElapsed(worker.timeStamp)}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="block lg:hidden">
          {/* Card layout for smaller screens */}
          {workerList.map((worker, index) => (
            <div
              key={index}
              className={`flex flex-col border rounded-md mb-4 p-4 ${
                worker.isCheckedOut ? "bg-red-100" : "bg-green-100"
              }`}
            >
              <div className="text-lg font-bold">
                Name:{" "}
                <span className="block sm:inline">
                  {window.innerWidth <= 360
                    ? worker.name.split(" ")[0]
                    : worker.name}
                </span>
              </div>
              <div className="mt-2">
                Status:{" "}
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
                          backgroundColor: "green",
                        },
                      }}
                    />
                  }
                  label={worker.isCheckedOut ? "Out of Office" : "In Office"}
                />
              </div>
              <div className="mt-2">
                {worker.isCheckedOut && (
                  <div>Time Elapsed: {timeElapsed(worker.timeStamp)}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={refreshLocal}
        className="fixed bottom-2 right-2 items-center space-x-2 px-4 py-2 bg-blue-500 text-white text-sm rounded-md"
      >
        <RefreshIcon />
        <span>Refresh List</span>
      </button>
    </div>
  );
}

export default App;
