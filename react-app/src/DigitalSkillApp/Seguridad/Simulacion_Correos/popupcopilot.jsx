const PopupCopilot = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="popup-overlay" onClick={(e) => e.target.className === 'popup-overlay' && onClose()}>
            <div className="popup-content">
                <iframe
                    src="https://npy5yesnxt173mlnc905e.chat.copilot.live/"
                    title="Help"
                    width="600"
                    height="400"
                    style={{ border: 'none' }}
                ></iframe>
            </div>
        </div>
    );
};

export default PopupCopilot;
