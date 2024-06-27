import { useState } from 'react';
import '../main.css';

const Enviados = () => {
    const [emails, setEmails] = useState([
        {
            id: 1,
            sender: 'Juan Pérez@dummy.com',
            subject: 'Reunión de proyecto',
            content: `Hola equipo,

            Les escribo para confirmar la reunión de proyecto mañana a las 10:00 am en la sala de conferencias. Revisaremos el progreso actual y estableceremos los siguientes pasos a seguir. 
            
            Por favor, asegúrense de tener listos los informes preliminares para discutir.

            Saludos,
            Juan Pérez`
        },
        {
            id: 2,
            sender: 'Equipo de Soporte@dummy.com',
            subject: 'Actualización de producto',
            content: `Hola clientes,

            Estamos emocionados de compartir con ustedes la última actualización de nuestro producto. Hemos añadido nuevas funciones que mejoran la experiencia del usuario y resuelven varios problemas reportados por ustedes.

            No duden en contactarnos si tienen alguna pregunta o necesitan soporte adicional.

            Atentamente,
            Equipo de Soporte`
        },
        {
            id: 3,
            sender: 'Organizadores del evento@dummy.com',
            subject: 'Recordatorio de evento',
            content: `Querida comunidad,

            Este es un recordatorio amistoso sobre nuestro próximo evento de caridad este sábado. Esperamos verlos a todos y compartir un día lleno de diversión y apoyo para nuestra causa.

            ¡No falten!

            Cordialmente,
            Organizadores del evento`
        }
    ]);

    const [selectedEmail, setSelectedEmail] = useState(null);

    const handleEmailClick = (emailId) => {
        setSelectedEmail(selectedEmail === emailId ? null : emailId);
    };

    return (
        <div className="recuadro-gris">
            <h1>Enviados</h1>
            <ul className="email-list">
                {emails.map(email => (
                    <li key={email.id} className="email-item">
                        <div className="email-header" onClick={() => handleEmailClick(email.id)}>
                            <h2>{email.subject}</h2>
                            <p className="sender">{email.sender}</p>
                        </div>
                        {selectedEmail === email.id && (
                            <div className="email-content">
                                <p>{email.content}</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Enviados;

