import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/pages/exchange-confirmation.css';

const ExchangeConfirmation = () => {
  const { user } = useAuth();
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/exchange/user/${user.id}`, {
          headers: {
            Authorization: `Bearer ${user?.accessToken}` 
          }
        });
        setExchanges(response.data);
      } catch (error) {
        console.error('Error fetching exchanges:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExchanges();
  }, [user]);

  const handleResponse = async (exchangeId, response) => {
    try {
      await axios.put(`http://localhost:3000/api/exchange/respond/${exchangeId}`, {
        id: exchangeId,
        response: response ? 'aceptado' : 'rechazado'
      });
      setExchanges(exchanges.filter(e => e.id !== exchangeId));
      console.log(response)
    } catch (error) {
      console.error('Error responding to exchange:', error);
    }
  };

  if (loading) return <div>Cargando intercambios...</div>;

  return (
    <div className="exchange-confirmation">
      <h1>Tus Intercambios Pendientes</h1>
      
      <div className="exchanges-list">
        {exchanges.filter(e => e.status === 'pendiente').map(exchange => (
          <div key={exchange.id} className="exchange-card">
            <div className="exchange-images">
              <div className="image-container">
                <img 
                  src={`http://localhost:3000/uploads/${exchange.sent_exchanges.garment_image}`} 
                  alt="Tu prenda"
                />
                <span>Tu oferta</span>
              </div>
              <div className="image-container">
                <img 
                  src={`http://localhost:3000/uploads/${exchange.received_exchanges.garment_image}`} 
                  alt="Prenda solicitada"
                />
                <span>Prenda solicitada</span>
              </div>
            </div>

            <div className="exchange-actions">
              <button 
                className="accept-button"
                onClick={() => handleResponse(exchange.id, true)}
              >
                Aceptar Intercambio
              </button>
              <button 
                className="reject-button"
                onClick={() => handleResponse(exchange.id, false)}
              >
                Rechazar Intercambio
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExchangeConfirmation;