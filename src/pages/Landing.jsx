import React from "react";
// import { useHistory } from 'react-router-dom';

function Main() {
    // const history = useHistory();

    const handleMessage = (event) => {
        if (event.data === 'loginClicked') {
            // Navigate to login page
            // history.push('/login');
            window.open("http://localhost:3000/login" , "_self")
        }
    };

    React.useEffect(() => {
        // Add event listener for receiving messages from the iframe
        window.addEventListener('message', handleMessage);

        return () => {
            // Cleanup function to remove event listener
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    return (
        <div >
            <iframe src="http://localhost:3001/" style={{ width: '124%', height: '163rem', border: 'none', position: "relative", right: "300px" }}></iframe>
        </div>
    )
}

export default Main