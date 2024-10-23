import {Typography} from "@mui/material";
import React from 'react';

const DashboardPage = () => {
    // TODO : update with correct ID
    const [dashboards, setDashboards] = useState([]);

    useEffect(() => {
      const fetchDashboards = async () => {
        const response = await fetch('http://localhost:3000/api/search', {
          headers: {
            'Authorization': `Bearer YOUR_API_KEY`,
          },
        });
        const data = await response.json();
        setDashboards(data);
      };
  
      fetchDashboards();
    }, []);
  
    return (
      <div>
        <h1>Tableaux de Bord Grafana</h1>
        <ul>
          {dashboards.map(dashboard => (
            <li key={dashboard.uid}>{dashboard.title}</li>
          ))}
        </ul>
      </div>
    );
  };

  export default DashboardPage;