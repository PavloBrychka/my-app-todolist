const BASE_URL = 'http://localhost:8080'; // Замініть на адресу вашого бекенду

const fetchData = async (endpoint: string, options = {}) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Якщо потрібно обробляти помилки в компоненті, ви можете кинути помилку
    }
};

export { fetchData };