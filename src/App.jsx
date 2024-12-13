import { useEffect, useState } from "react";
import "./App.css";
import AlertDialog from "./dialog";

function App() {
  const [workerList, setWorkerList] = useState([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [selectedWorkerIndex, setSelectedWorkerIndex] = useState(null);

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

  function checkOutPerson(index) {
    const updatedList = [...workerList];
    updatedList[index].isCheckedOut = true;
    updatedList[index].timeStamp = timeStamper();
    setWorkerList(updatedList);
  }

  function checkInPerson(index) {
    const updatedList = [...workerList];
    updatedList[index].isCheckedOut = false;
    updatedList[index].timeStamp = 0;
    setWorkerList(updatedList);
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

  return (
    <>
      <AlertDialog
        isCheckingOut={isCheckingOut}
        setIsCheckingOut={setIsCheckingOut}
        checkInPerson={checkInPerson}
        checkOutPerson={checkOutPerson}
        selectedWorkerIndex={selectedWorkerIndex}
        setSelectedWorkerIndex={setSelectedWorkerIndex}
        workerList={workerList}
      />
      <h1>Sue Check-In</h1>
      <div className="card"></div>
      <div className="worker-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Out of Office</th>
              <th>Time Elapsed</th>
            </tr>
          </thead>
          <tbody>
            {workerList.map((worker, index) => (
              <tr key={index}>
                <td
                  className={worker.isCheckedOut ? "checkedOut" : "checkedIn"}
                >
                  {worker.name}
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={worker.isCheckedOut}
                    onChange={() => {
                      setSelectedWorkerIndex(index);
                      setIsCheckingOut(true);
                    }}
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
