import React, { PureComponent } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

// Define the shape of the task data
interface TaskDataPoint {
  name: string;
  assigned: number;
  completed: number;
}

// Hardcoded task data with additional weeks
const TASK_DATA: TaskDataPoint[] = [
  { name: 'Week 1', assigned: 10, completed: 8 },
  { name: 'Week 2', assigned: 15, completed: 10 },
  { name: 'Week 3', assigned: 20, completed: 15 },
  { name: 'Week 4', assigned: 25, completed: 20 },
  { name: 'Week 5', assigned: 30, completed: 25 },
  { name: 'Week 6', assigned: 35, completed: 30 },
  { name: 'Week 7', assigned: 40, completed: 35 },
];

// Hardcoded employee ranking data
interface EmployeeRankingDataPoint {
  name: string;
  score: number;
}

const EMPLOYEE_DATA: EmployeeRankingDataPoint[] = [
  { name: 'Rohan Mishra', score: 95 },
  { name: 'Sita Sharma', score: 90 },
  { name: 'Amit Kumar', score: 85 },
  { name: 'Priya Singh', score: 80 },
  { name: 'Rahul Verma', score: 78 },
  { name: 'Nisha Patel', score: 76 },
  { name: 'Karan Malhotra', score: 75 },
  { name: 'Anita Desai', score: 70 },
  { name: 'Vinay Rao', score: 68 },
  { name: 'Geeta Rani', score: 65 },

];


export default class EmploymentDashboard extends PureComponent {
  render() {
    return (
      <div className="h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Employment Dashboard</h1>
        
        {/* Assigned vs Completed Tasks */}
        <div className="border border-gray-200 rounded-lg p-4 mb-6 h-1/2">
          <h2 className="text-xl font-semibold mb-2">Assigned vs Completed Tasks</h2>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={TASK_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="assigned" stroke="#8884d8" fill="#8884d8" />
              <Area type="monotone" dataKey="completed" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Employee Ranking */}
        <div className="border border-gray-200 rounded-lg p-4 h-1/2">
          <h2 className="text-xl font-semibold mb-2">Employee Ranking</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={EMPLOYEE_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}
