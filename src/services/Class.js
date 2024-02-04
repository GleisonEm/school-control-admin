import axios from './configApi';

const ClassService = {
    create: async (classes) => {
        try {
            const response = await axios.post('/classes', classes);
            return {
                ok: true,
                data: response.data
            };
        } catch (error) {
            return { ok: false }
            throw error;
        }
    },
    getAll: async () => {
        try {
            const response = await axios.get('/classes');
            return {
                ok: true,
                data: response.data
            };
        } catch (error) {
            return { ok: false }
            throw error;
        }
    },
}

export default ClassService