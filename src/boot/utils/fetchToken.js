const fetchToken = () => {
    const token = localStorage.getItem("token");
    return token;
};

export default fetchToken;
