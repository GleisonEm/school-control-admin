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
    getAll: async (with_shift = false) => {
        try {
            const response = await axios.get('/classes?with_shift=' + with_shift);
            return {
                ok: true,
                data: response.data
            };
        } catch (error) {
            return { ok: false }
            throw error;
        }
    },
    delete: async (classId) => {
        try {
            const response = await axios.delete('/classes/' + classId);
            return {
                ok: true,
                data: response.data
            };
        } catch (error) {
            return { ok: false, error: error.response?.data?.message || error.message };
        }
    },
}

export default ClassService