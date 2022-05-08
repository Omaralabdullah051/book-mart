import { useEffect, useState } from "react"


const useToken = (email) => {
    const [token, setToken] = useState('');
    useEffect(() => {
        (async () => {
            try {
                if (email) {
                    const res = await fetch(`https://hidden-eyrie-82910.herokuapp.com/login?email=${email}`);
                    const data = await res.json();
                    setToken(data.accessToken);
                    localStorage.setItem('accessToken', data.accessToken);
                }
            }
            catch (err) {
                // console.error(err.message);
            }
        })()
    }, [email]);

    return [token];

};


export default useToken;