import { useEffect, useState } from "react"
import { toast } from "react-toastify";

const useToken = (email) => {
    const [token, setToken] = useState('');
    useEffect(() => {
        (async () => {
            try {
                if (email) {
                    const res = await fetch(`http://localhost:5000/login?email=${email}`);
                    const data = await res.json();
                    setToken(data.accessToken);
                    localStorage.setItem('accessToken', data.accessToken);
                }
            }
            catch (err) {
                toast.error("There was a server side error");
                console.error(err.message);
            }
        })()
    }, [email]);

    return [token];

};


export default useToken;