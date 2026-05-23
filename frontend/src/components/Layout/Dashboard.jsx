import { useState } from "react";
import { Menu, LayoutDashboard, BookOpenText, BrainCircuit, FilePenLineIcon, Scale, X , LogOut} from "lucide-react";
import MiniDashboard from "../Pages/MiniDashboard"
import LegalResearch from "../Pages/LegalResearch"
import CasePrediction from "../Pages/CasePrediction"
import DecisionSupport from "../Pages/DecisionSupport"
import { useEffect } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState("User");
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "research", label: "Legal Research", icon: BookOpenText },
    { id: "prediction", label: "Case Prediction", icon: BrainCircuit },
    { id: "decisionSupport", label: "Decision Support", icon:  FilePenLineIcon},
  ];
  const token = sessionStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(()=>{
    try{
      const fetchUser = async () => {

        const response = await axios.get('http://localhost:5000/api/auth/me', {
          headers : {
            Authorization : `Bearer ${token}`
          }
        })

        setUser(response.data.fullName);
      }

      if(token){
        fetchUser();
      }
      
    }catch(error){
      console.log(error)
    }
  },[token])

  function handleLogout() {
    sessionStorage.removeItem('token');
    navigate('/')
  }

  return (
    <div className="flex h-screen bg-[#f5efe6] text-[#2c1810]">
      {/* Sidebar */}
      <div
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-[#1a0f0a] text-[#f5efe6] flex flex-col justify-between transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } `}
      >
        <div>
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#3a2418]">
            <h1 className="text-xl font-semibold tracking-wide">
              Justice<span className="text-[#c89b6d]">AI</span>
            </h1>

            <button
              onClick={() => setSidebarOpen(false)}
            >
              <X size={22} />
            </button>
          </div>

          <div className="px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                    activeTab === item.id
                      ? "bg-[#c89b6d] text-[#1a0f0a]"
                      : "hover:bg-[#2a1912]"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="px-4 py-6 space-y-2">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200 text-left text-white bg-red-400/30 hover:text-red-400"
          >
            <LogOut size={24} color="#ff0000"/>
            Logout
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e3d6c6] bg-[#f5efe6]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>

            <h2 className="text-lg font-semibold tracking-wide">
              AI Legal Intelligence Dashboard
            </h2>
          </div>

          <div className="text-sm text-[#7a5c46]">
            Welcome back, {user}
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1  overflow-y-auto">
          {activeTab === "dashboard" && (
            <MiniDashboard />
          )}

          {activeTab === "research" && (
            <LegalResearch />
          )}

          {activeTab === "prediction" && (
            <CasePrediction />
          )}

          {activeTab === "decisionSupport" && (
            <DecisionSupport />
          )}
        </div>
      </div>
    </div>
  );
}
