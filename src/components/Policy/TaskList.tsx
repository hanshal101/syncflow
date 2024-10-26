import { useState, useEffect, ChangeEvent } from "react";

interface TaskModel {
  id: number;
  name: string;
  description: string;
  assigneeId: string;
  deadline: string;
}

const ASSIGNEE_IDS = [
  "123456789",
  "234567890",
  "345678901",
  "456789012",
  "567890123",
  "678901234",
  "789012345",
  "890123456",
  "901234567",
  "012345678"
];

function TaskList() {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTask, setNewTask] = useState<Omit<TaskModel, 'id'>>({
    name: "",
    description: "",
    assigneeId: "",
    deadline: "",
  });
  const [selectedTask, setSelectedTask] = useState<TaskModel | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredTasks, setFilteredTasks] = useState<TaskModel[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    const tasksFromStorage = localStorage.getItem('tasks');
    if (tasksFromStorage) {
      setTasks(JSON.parse(tasksFromStorage));
    }
  };

  const saveTasks = (tasks: TaskModel[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const createTask = () => {
    const newTaskWithId = { ...newTask, id: Date.now() };
    const updatedTasks = [...tasks, newTaskWithId];
    saveTasks(updatedTasks);
    setTasks(updatedTasks);
    closeCreateModal();
  };

  const updateTask = (taskId: number) => {
    if (selectedTask) {
      const updatedTasks = tasks.map(task => 
        task.id === taskId ? { ...selectedTask } : task
      );
      saveTasks(updatedTasks);
      setTasks(updatedTasks);
      closeDetailModal();
    }
  };

  const deleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    saveTasks(updatedTasks);
    setTasks(updatedTasks);
    closeDetailModal();
  };

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setNewTask({ name: "", description: "", assigneeId: "", deadline: "" });
  };

  const openDetailModal = (task: TaskModel) => {
    setSelectedTask(task);
    setIsCreateModalOpen(true);
  };

  const closeDetailModal = () => {
    setSelectedTask(null);
  };

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter(task => task.name.includes(searchTerm)));
    }
  }, [searchTerm, tasks]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createTask();
  };

  return (
    <div className="p-2 w-full flex flex-col gap-3">
      <div className="flex justify-between bg-white border border-gray-200 p-3 text-lg font-mono rounded-lg">
        <p className="cursor-pointer border-2 border-indigo-800 p-2 rounded-lg bg-indigo-200" onClick={openCreateModal}>
          Create Task
        </p>
      </div>
      <input
        type="text"
        placeholder="Search Task by name"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4 p-2 border rounded-md"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full text-center bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 border-b">Task Name</th>
              <th className="py-2 border-b">Description</th>
              <th className="py-2 border-b">Assignee ID</th>
              <th className="py-2 border-b">Deadline</th>
              <th className="py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id} onClick={() => openDetailModal(task)} className="cursor-pointer hover:bg-gray-100">
                <td className="py-2 border-b">{task.name}</td>
                <td className="py-2 border-b">{task.description}</td>
                <td className="py-2 border-b">{task.assigneeId}</td>
                <td className="py-2 border-b">{task.deadline}</td>
                <td className="py-2 border-b">
                  <button onClick={() => deleteTask(task.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4">Create New Task</h2>
            <form onSubmit={handleCreateSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Task Name"
                className="border border-gray-300 p-2 rounded-lg"
                value={newTask.name}
                onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              />
              <textarea
                placeholder="Task Description"
                className="border border-gray-300 p-2 rounded-lg"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
              <select
                className="border border-gray-300 p-2 rounded-lg"
                value={newTask.assigneeId}
                onChange={(e) => setNewTask({ ...newTask, assigneeId: e.target.value })}
              >
                <option value="">Select Assignee ID</option>
                {ASSIGNEE_IDS.map(id => (
                  <option key={id} value={id}>{id}</option>
                ))}
              </select>
              <input
                type="date"
                className="border border-gray-300 p-2 rounded-lg"
                value={newTask.deadline}
                onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={closeCreateModal}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {selectedTask && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4">Task Details</h2>
            <form onSubmit={(e) => { e.preventDefault(); updateTask(selectedTask.id); }} className="flex flex-col gap-4">
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-lg"
                value={selectedTask.name}
                onChange={(e) => setSelectedTask({ ...selectedTask, name: e.target.value })}
              />
              <textarea
                className="border border-gray-300 p-2 rounded-lg"
                value={selectedTask.description}
                onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
              />
              <select
                className="border border-gray-300 p-2 rounded-lg"
                value={selectedTask.assigneeId}
                onChange={(e) => setSelectedTask({ ...selectedTask, assigneeId: e.target.value })}
              >
                {ASSIGNEE_IDS.map(id => (
                  <option key={id} value={id}>{id}</option>
                ))}
              </select>
              <input
                type="date"
                className="border border-gray-300 p-2 rounded-lg"
                value={selectedTask.deadline}
                onChange={(e) => setSelectedTask({ ...selectedTask, deadline: e.target.value })}
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={closeDetailModal}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => deleteTask(selectedTask.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;
