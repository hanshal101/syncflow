import { useEffect, useState, useRef } from "react";
import axios from "axios";

interface ILog {
  time: string;
  severity: string;
  type: string;
  source: string;
  destination: string;
  port: string;
  protocol: string;
}
interface EmployeeProps {
  employeeId: string;
}


function Employee() {
  const [logs, setLogs] = useState<ILog[]>([{}]);
  const [error, setError] = useState<string | null>(null);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState<boolean>(true);
  const [fetchLogsEnabled, setFetchLogsEnabled] = useState<boolean>(true);
  const apikey = import.meta.env.VITE_API_URL;

  const fetchLogs = async () => {
    if (!fetchLogsEnabled) return;

    try {
      const response = await axios.get(`${apikey}/logs/intruder`);
      const logData = response.data;
      if (Array.isArray(logData)) {
        setLogs(logData.slice(-100));
      } else {
        console.error("Log data is not an array:", logData);
        setLogs([]);
      }

      setError(null);
    } catch (error) {
      console.error("Error fetching logs:", error);
      setError("Failed to fetch logs");
    }
  };

  useEffect(() => {
    fetchLogs();
    const intervalId = setInterval(() => {
      if (fetchLogsEnabled) {
        fetchLogs();
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, [fetchLogsEnabled]);

  useEffect(() => {
    if (autoScrollEnabled && logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, autoScrollEnabled]);

  const getLogLevelClass = (severity: string) => {
    switch (severity) {
      case "LOW":
        return "bg-green-600";
      case "HIGH":
        return "bg-red-600";
      case "MEDIUM":
        return "bg-yellow-400";
      default:
        return "bg-black";
    }
  };

  const toggleAutoScroll = () => {
    setAutoScrollEnabled(!autoScrollEnabled);
    setFetchLogsEnabled(!autoScrollEnabled);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-40">
      
      <section className="mx-auto w-full px-4 py-4">
      <div className="flex flex-col w-full space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-lg font-semibold">
            Individual Employee Analytics
          </h2>
        </div>
      </div>

      <div className="mt-6 flex flex-col w-full ">
        <div className="w-full grid grid-cols-3 bg-gray-100  gap-3 p-3">
          <div className="flex flex-col p-1 items-center gap-2 text-center">
            <img src="https://picsum.photos/150/220" alt="" />
            <h2>Rohan Mishra</h2>
            <p>software engineer</p>
            <p className="w-full py-2 px-1 bg-violet-500 text-white rounded-md">
              At Work from: 1 year 3 Months 8 day
            </p>
            <hr className="bg-black w-full  " />
            <div className="grid grid-cols-3 justify-center">
              <div className="flex flex-col items-center">
                <p>0/20</p>
                <p>Attendance</p>
              </div>
              <div className="flex flex-col items-center">
                <p>0/20</p>
                <p>Leaves</p>
              </div>
              <div className="flex flex-col items-center">
                <p>0/20</p>
                <p>Awards</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 p-2">
            <div className="flex flex-col w-full justify-start shadow-md">
              <h1 className="p-1 py-2 bg-violet-500 text-white">
                Personal Details
              </h1>
              <hr className="bg-black w-full  " />
              <p className="p-1 py-2">Name : Rohan Mishra</p>
              <hr className="bg-black w-full  " />
              <p className="p-1 py-2">DOB : 1-1-2001</p>
              <hr className="bg-black w-full  " />
              <p className="p-1 py-2">Gender : Male</p>
              <hr className="bg-black w-full  " />
              <p className="p-1 py-2">Emial : example@example.com</p>
              <hr className="bg-black w-full  " />
              <p className="p-1 py-2">Phone : 123456789</p>
            </div>
            <div className="flex flex-col w-full justify-start shadow-md">
            <h1 className="p-1 py-2 bg-violet-500 text-white">
                Company Details
              </h1>
              <hr className="bg-black w-full  " />
              <p className="p-1 py-2">Employee ID : 2220222012</p>
              <hr className="bg-black w-full  " />
              <p className="p-1 py-2">Department : PHP</p>
              <hr className="bg-black w-full  " />
              <p className="p-1 py-2">Designation : Software Engineer</p>
              
            </div>
          </div>
          <div className="flex flex-col gap-3 p-2">
            <div className="flex flex-col w-full justify-start shadow-md">
              <h1 className="p-1 py-2 bg-violet-500 text-white">
                Notice Board
              </h1>
              <hr className="bg-black w-full  " />
            </div>
            <div className="flex flex-col w-full justify-start shadow-md">
              <h1 className="p-1 py-2 bg-violet-500 text-white">
                Upcoming Holidays
              </h1>
              <hr className="bg-black w-full  " />
              <p className="p-1 py-2">Holiday 12-12-24</p>
              
            </div>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </section>
    </div>
  );
}

export default Employee;
