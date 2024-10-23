import {Typography} from "@mui/material";
import React from 'react';

const DashboardPage = () => {
    // TODO : update with correct ID
    const grafanaUrl = "http://localhost:3000/d/your_dashboard_id?orgId=1";
  
    return (
      <div style={{ width: '100%', height: '600px' }}>
        <iframe 
          src={grafanaUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ overflow: 'hidden' }}
          title="Grafana Dashboard"
        />
      </div>
    );
  };
  
  export default DashboardPage;