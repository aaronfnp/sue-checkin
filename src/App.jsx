import { useEffect, useState } from "react";
import { Switch, FormControlLabel } from "@mui/material";
import { db } from "./firebase";
import { collection, doc, setDoc, updateDoc, getDocs, onSnapshot } from "firebase/firestore";
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
    "Jessie Wise",
    "Sue Kim",
  ];

  const workersCollection = collection(db, "workers");

  // One-time population of Firestore if empty
  useEffect(() => {
    const populateIfEmpty = async () => {
      const snapshot = await getDocs(workersCollection);
      if (snapshot.empty) {
        for (const name of workerNames) {
          const workerRef = doc(db, "workers", name);
          await setDoc(workerRef, { name, isCheckedOut: false, timeStamp: 0 }, { merge: true });
        }
      }
    };

    populateIfEmpty();
  }, []);

  // Real-time listener
  useEffect(() => {
    const unsubscribe = onSnapshot(workersCollection, (snapshot) => {
      const workers = snapshot.docs.map((doc) => doc.data());
      workers.sort((a, b) => a.name.localeCompare(b.name));
      setWorkerList(workers);
    });

    return () => unsubscribe(); // cleanup
  }, []);

  // Handle switching in/out
  const handleSwitchChange = (name) => async (event) => {
    const workerRef = doc(db, "workers", name);
    const isCheckedOut = event.target.checked;
    const timeStamp = isCheckedOut ? Date.now() : 0;
    await updateDoc(workerRef, { isCheckedOut, timeStamp });
  };

  // Format timestamp as "MMM DD, HH:MM AM/PM"
  const formatTime = (timeStamp) => {
    if (!timeStamp) return "";
    const date = new Date(timeStamp);
    return date.toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col items-center mb-4">
        <div className="max-w-fit border-2 p-4 bg-[#0c1872] border-[#0c1872] rounded-2xl drop-shadow-md">
          <h1 className="text-4xl text-white font-bold drop-shadow-md text-center">Swisher</h1>
          <h1 className="text-4xl text-white font-bold drop-shadow-md text-center">Commercial</h1>
        </div>
        <h2 className="text-xl font-semibold drop-shadow-md text-center mt-2 underline">In/Out Tracker</h2>
      </div>

      <div className="worker-table drop-shadow-md">
        {/* Desktop Table */}
        <div className="hidden lg:block">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Status</th>
                <th className="border border-gray-300 p-2">Time of Leave</th>
              </tr>
            </thead>
            <tbody>
              {workerList.map((worker) => (
                <tr key={worker.name}>
                  <td className={`border border-gray-300 p-2 ${worker.isCheckedOut ? "bg-red-200" : "bg-green-200"}`}>
                    <span className="font-bold text-lg">{worker.name}</span>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <div className="flex items-center justify-between">
                      <Switch
                        checked={worker.isCheckedOut}
                        onChange={handleSwitchChange(worker.name)}
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": { color: "red" },
                          "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": { backgroundColor: "red" },
                          "& .MuiSwitch-switchBase": { color: "green" },
                          "& .MuiSwitch-switchBase+.MuiSwitch-track": { backgroundColor: "green" },
                        }}
                      />
                      <span style={{ marginRight: "1rem" }}>
                        {worker.isCheckedOut ? "Out of Office" : "In Office"}
                      </span>
                    </div>
                  </td>
                  <td className="border border-gray-300 p-2">
                    {worker.isCheckedOut && <span>{formatTime(worker.timeStamp)}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="block lg:hidden space-y-4">
          {workerList.map((worker) => (
            <div
              key={worker.name}
              className="flex flex-col border rounded-md p-4 shadow-md bg-white"
            >
              {/* Name with colored background */}
              <div
                className={`font-bold text-lg px-2 py-1 rounded ${
                  worker.isCheckedOut ? "bg-red-400 text-white" : "bg-green-400 text-white"
                }`}
              >
                {worker.name}
              </div>

              {/* Status switch */}
              <div className="mt-3 flex items-center justify-between">
                <FormControlLabel
                  control={
                    <Switch
                      checked={worker.isCheckedOut}
                      onChange={handleSwitchChange(worker.name)}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": { color: "red" },
                        "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": { backgroundColor: "red" },
                        "& .MuiSwitch-switchBase": { color: "green" },
                        "& .MuiSwitch-switchBase+.MuiSwitch-track": { backgroundColor: "green" },
                      }}
                    />
                  }
                  label={worker.isCheckedOut ? "Out of Office" : "In Office"}
                />
              </div>

              {/* Time of Leave */}
              {worker.isCheckedOut && (
                <div className="mt-2 text-gray-700 font-medium">
                  Time of Leave: {formatTime(worker.timeStamp)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
