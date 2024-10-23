import { Typography } from "@mui/material";
import React, { useEffect, useState } from 'react'; // Importez useState et useEffect

const DashboardPage = () => {
    // TODO : update with correct ID
    const [dashboards, setDashboards] = useState([]);
    const [error, setError] = useState(null); // État pour gérer les erreurs

    useEffect(() => {
        const fetchDashboards = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/search', {
                    headers: {
                        'Authorization': `Bearer YOUR_API_KEY`, // Remplacez YOUR_API_KEY par votre clé API réelle
                    },
                });
                
                if (!response.ok) { // Vérifiez si la réponse est correcte
                    throw new Error('Failed to fetch dashboards');
                }
                
                const data = await response.json();
                setDashboards(data);
            } catch (error) {
                setError(error.message); // Mettez à jour l'état des erreurs
            }
        };

        fetchDashboards();
    }, []);

    return (
        <div>
            <h1>Tableaux de Bord Grafana</h1>
            {error && <Typography color="error">{error}</Typography>} {/* Affichez les erreurs, s'il y en a */}
            <ul>
                {dashboards.map(dashboard => (
                    <li key={dashboard.uid}>{dashboard.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default DashboardPage;
