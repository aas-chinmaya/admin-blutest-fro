

"use client";


import { useLoggedinUser } from "@/hooks/useLoggedinUser";
import EmployeeDashboard from "@/modules/dashboard/employeeDashboard";
import { CpcDashboard } from "@/modules/dashboard/cpcDashboard";

export default function Dashboard() {
  const { currentUser } = useLoggedinUser();
  const employeeId = currentUser?.employeeID  // Default to a specific employee ID if not available


  return (
    <div className="p-4">
    
      {currentUser?.isCpc ? (
    <CpcDashboard/>
      
      ) : (
       
        <EmployeeDashboard employeeId={employeeId} />
      )}

    </div>

  );
}

