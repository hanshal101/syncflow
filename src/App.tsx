import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar, { SidebarItem } from "./components/Static/Sidebar";
import { IoCodeWorkingOutline, IoSettings } from "react-icons/io5";
import { RiNodeTree } from "react-icons/ri";
import { FilterIcon,  } from "lucide-react";
import { MdPolicy, } from "react-icons/md";
import GetEmployee from "./components/Logs/GetEmployee";
import TaskList from "./components/Policy/TaskList";
import ChatInterface from "./components/Application/ChatInterface";
import EmploymentDashboard from "./components/Node/EmploymentDashboard";
import { FaPeopleGroup } from "react-icons/fa6";
import Management from "./components/Logs/Management";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar>
          <SidebarItem icon={<FaPeopleGroup />} text="Employee" to="/employee" />
          <hr className="my-3" />
          <SidebarItem icon={<FilterIcon />} text="Management" to="/management" />
          <hr className="my-3" />
          <SidebarItem icon={<MdPolicy />} text="TaskList" to="/TaskList" />
          <hr className="my-3" />
          {/* <SidebarItem icon={<RiTimeZoneLine />} text="Intruder" to="/intruder" /> */}
          {/* <hr className="my-3" /> */}
          {/* <SidebarItem icon={<IoSettings />} text="SysInfo" to="/sysinfo" /> */}
          {/* <hr className="my-3" />
          <SidebarItem icon={<BsTools />} text="Checkout" to="/checkout" />
          <hr className="my-3" /> */}
          <SidebarItem icon={<IoCodeWorkingOutline />} text="ChatInterface" to="/ChatInterface" />
          <hr className="my-3" />
          <SidebarItem icon={<RiNodeTree />} text="Total Analytics" to="/analytics " />
          <hr className="my-3" />
        </Sidebar>
        <div className="p-2 w-full">
          <Routes>
            <Route path="/employee" element={<GetEmployee />} />
            <Route path="/management" element={<Management />} />
            <Route path="/TaskList" element={<TaskList />} />
            {/* <Route path="/intruder" element={<Intruder />} /> */}
            {/* <Route path="/sysinfo" element={<SysInfo />} /> */}
            {/* <Route path="/checkout" element={<Checkout />}></Route> */}
            <Route path="/ChatInterface" element={<ChatInterface />} />
            <Route path="/analytics" element={<EmploymentDashboard />} />
            {/* <Route path="/analytics" element={<Node />} /> individual analytics */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
