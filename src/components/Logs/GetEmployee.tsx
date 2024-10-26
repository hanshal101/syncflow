import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Employee from "../Employee";

interface ILog {
  employee_id: string;
  name: string;
  image: string;
  position: string;
  email: string;
}

function GetEmployee() {
  const [logs, setLogs] = useState<ILog[]>([ {
    employee_id: "123456789",
    name: "Rohan Mishra",
    image: "https://picsum.photos/150/180",
    position: "Web Developer",
    email: "rohan@example.com",
  },
  {
    employee_id: "234567890",
    name: "Sita Sharma",
    image: "https://picsum.photos/150/181",
    position: "Designer",
    email: "sita@example.com",
  },
  {
    employee_id: "345678901",
    name: "Amit Kumar",
    image: "https://picsum.photos/150/182",
    position: "Project Manager",
    email: "amit@example.com",
  },
  {
    employee_id: "456789012",
    name: "Priya Singh",
    image: "https://picsum.photos/150/183",
    position: "QA Engineer",
    email: "priya@example.com",
  },
  {
    employee_id: "567890123",
    name: "Rahul Verma",
    image: "https://picsum.photos/150/184",
    position: "DevOps Engineer",
    email: "rahul@example.com",
  },
  {
    employee_id: "678901234",
    name: "Nisha Patel",
    image: "https://picsum.photos/150/185",
    position: "Data Scientist",
    email: "nisha@example.com",
  },
  {
    employee_id: "789012345",
    name: "Karan Malhotra",
    image: "https://picsum.photos/150/186",
    position: "Frontend Developer",
    email: "karan@example.com",
  },
  {
    employee_id: "890123456",
    name: "Anita Desai",
    image: "https://picsum.photos/150/187",
    position: "Backend Developer",
    email: "anita@example.com",
  },
  {
    employee_id: "901234567",
    name: "Vinay Rao",
    image: "https://picsum.photos/150/188",
    position: "Full Stack Developer",
    email: "vinay@example.com",
  },
  {
    employee_id: "012345678",
    name: "Geeta Rani",
    image: "https://picsum.photos/150/189",
    position: "Systems Analyst",
    email: "geeta@example.com",
  },]);
  const [error, setError] = useState<string | null>(null);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const [fetchLogsEnabled, setFetchLogsEnabled] = useState<boolean>(true);
  const apikey = import.meta.env.VITE_API_URL;
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const fetchLogs = async () => {
    if (!fetchLogsEnabled) return;

    try {
      const response = await axios.get(`${apikey}/logs`);
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
      setError("Failed to fetch logs. Please try again later.");
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

  const handleRowClick = (employeeId: string) => {
    setSelectedEmployeeId(employeeId);
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    setSelectedEmployeeId(null);
  };

  return (
    <section className="mx-auto w-full px-4 py-4">
      <div className="flex flex-col w-full space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-lg font-semibold">Employee List</h2>
          <p className="mt-1 text-sm text-gray-700">
            List of Employee and their Individual Analytics details.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col w-full">
        <div className="w-full">
          <div className="w-full py-2">
            <div className="overflow-y-auto overflow-x-hidden w-full border border-gray-200 md:rounded-lg">
              <div className="min-w-full divide-y divide-gray-200">
                <div className="bg-gray-50 w-full sticky top-0">
                  <div className="flex font-mono w-full">
                    <div className="px-4 flex border w-1/6 justify-center py-3.5 text-left font-normal text-gray-700">
                      <span>Image</span>
                    </div>
                    <div className="px-4 flex border w-1/5 justify-center py-3.5 text-left font-normal text-gray-700">
                      <span>Name</span>
                    </div>
                    <div className="px-4 flex border w-1/5 justify-center py-3.5 text-left font-normal text-gray-700">
                      <span>Employee ID</span>
                    </div>
                    <div className="px-4 flex border w-1/5 justify-center py-3.5 text-left font-normal text-gray-700">
                      <span>Position</span>
                    </div>
                    <div className="px-4 flex border w-1/4 justify-center py-3.5 text-left font-normal text-gray-700">
                      <span>Email</span>
                    </div>
                  </div>
                </div>
                <div
                  ref={logContainerRef}
                  className="divide-y divide-gray-200 bg-white w-full h-[75vh] overflow-y-auto"
                >
                  {logs.map((log) => (
                    <div
                      key={log.employee_id}
                      onClick={() => handleRowClick(log.employee_id)}
                      className="flex w-full cursor-pointer"
                    >
                      <div className="whitespace-nowrap w-1/6 items-center flex justify-center px-4 py-1 text-sm">
                        <img src={log.image} alt={log.name} />
                      </div>
                      <div className="whitespace-nowrap w-1/5 items-center flex justify-center px-4 py-1 text-xl">
                        {log.name}
                      </div>
                      <div className="whitespace-nowrap w-1/5 items-center flex justify-center px-4 py-1 text-xl">
                        {log.employee_id}
                      </div>
                      <div className="whitespace-nowrap w-1/5 items-center flex justify-center px-4 py-1 text-xl">
                        {log.position}
                      </div>
                      <div className="whitespace-nowrap w-1/4 items-center flex justify-center px-4 py-1 text-xl">
                        {log.email}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      
      {isCreateModalOpen && (
        <div className="absolute z-50 w-fit p-2 bg-white rounded-lg shadow-lg">
          <button 
            className="w-fit fixed top-52 left-10 z-50 p-2 text-white rounded-lg bg-red-600"
            onClick={handleCloseModal}
          >
            Close
          </button>
          <Employee employeeId={selectedEmployeeId} />
        </div>
      )}
    </section>
  );
}

export default GetEmployee;
