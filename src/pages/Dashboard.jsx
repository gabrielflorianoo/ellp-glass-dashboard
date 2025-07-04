import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import AdminDashboard from "./dashboards/AdminDashboard";
import VolunteerDashboard from "./dashboards/VolunteerDashboard";
import CoordinatorDashboard from "./dashboards/CoordinatorDashboard";
import ParentDashboard from "./dashboards/ParentDashboard";

const Dashboard = () => {
    const { user } = useAuth();

    const renderDashboard = () => {
        switch (user.role) {
            case "admin":
                return <AdminDashboard />;
            case "volunteer":
                return <VolunteerDashboard />;
            case "coordinator":
                return <CoordinatorDashboard />;
            case "parent":
                return <ParentDashboard />;
            default:
                return (
                    <div className="text-white">
                        Tipo de usuário não reconhecido
                    </div>
                );
        }
    };

    return <div className="min-h-screen p-4 md:p-8">{renderDashboard()}</div>;
};

export default Dashboard;
