import { Link } from 'react-router-dom';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useAuth } from "../context/AuthContext";

const NextExchangeSection = () => {
    const { user } = useAuth();
    const [nextExchange, setNextExchange] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNextExchange = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/exchange/upcoming', {
                    headers: {
                        Authorization: `Bearer ${user?.accessToken}`
                    }
                });
                setNextExchange(response.data[0] || null);
            } catch (error) {
                console.error('Error fetching next exchange:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchNextExchange();
    }, [user]);

    if (loading) return <div>Cargando...</div>;

    if (nextExchange){
        var date = new Date(nextExchange.schedule_date);
        date.setDate(date.getDate() + 1);

    }

    console.log(nextExchange)

    return (
        <section>
            <div className="next-appoiment">
                <h2 className="headline-small">
                    Intercambios <span className="body-large">próximos</span>
                </h2>

                {nextExchange ? (
                    <div className="details">
                        <div className="next-app-img">
                            <img
                                src={`http://localhost:3000/uploads/${nextExchange.received_exchanges.garment_image}`}
                                alt="Próximo intercambio"
                            />
                        </div>
                        <div className="body-large text">
                            <p>{date.toLocaleDateString('es-ES', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}</p>
                            <p className="place">{nextExchange.suggested_location}</p>
                            <p>{date.toLocaleTimeString('es-ES', {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</p>
                        </div>
                    </div>
                ) : (
                    <div className="no-exchanges">
                        <p className="body-large">No tienes intercambios programados</p>
                        <Link to="/exchange-confirmation" className="link-button">
                            Ver intercambios pendientes
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default NextExchangeSection