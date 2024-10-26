import { useState, useEffect } from "react";
import axios from "axios";

interface IEmployee {
  name: string;
  task: string;
  domain: string;
}

interface IManager {
  name: string;
  employees: IEmployee[];
}

// Sample hardcoded data for managers and employees
const MANAGER_DATA: IManager[] = [
  {
    name: "John Doe",
    employees: [
      { name: "Alice", task: "Design", domain: "UI/UX" },
      { name: "Bob", task: "Development", domain: "Frontend" },
    ],
  },
  {
    name: "Jane Smith",
    employees: [
      { name: "Charlie", task: "Research", domain: "AI" },
      { name: "David", task: "Development", domain: "Backend" },
    ],
  },
  {
    name: "Emma Johnson",
    employees: [
      { name: "Eva", task: "Testing", domain: "QA" },
      { name: "Frank", task: "Deployment", domain: "DevOps" },
    ],
  },
];

function Management() {
  const [managers, setManagers] = useState<IManager[]>(MANAGER_DATA);
  const [selectedManager, setSelectedManager] = useState<IManager | null>(null);

  const handleManagerClick = (manager: IManager) => {
    setSelectedManager(manager);
  };

  useEffect(() => {
    // In a real application, you might fetch manager data from an API
    // Uncomment and modify the following code to use your API
    /*
    const fetchManagers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/managers`);
        setManagers(response.data);
      } catch (error) {
        console.error("Error fetching managers:", error);
      }
    };
    
    fetchManagers();
    */
  }, []);

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manager Management</h1>
      
      <div className="grid grid-cols-1 gap-4 mb-6">
        {managers.map((manager, index) => (
          <div
            key={index}
            className="p-4 border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg transition-all"
            onClick={() => handleManagerClick(manager)}
          >
            <h2 className="text-lg font-semibold">{manager.name}</h2>
          </div>
        ))}
      </div>

      {selectedManager && (
        <div className="border border-gray-300 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Employees under {selectedManager.name}</h2>
          <div className="grid grid-cols-1 gap-4">
            {selectedManager.employees.map((employee, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold">{employee.name}</h3>
                <p>Task: {employee.task}</p>
                <p>Domain: {employee.domain}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Management;
