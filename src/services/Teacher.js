import axios from './configApi';

const TeacherService = {
    create: async (teacher) => {
        try {
            const response = await axios.post('/teachers', teacher);
            return {
                ok: true,
                data: response.data
            };
        } catch (error) {
            return { ok: false, error: error.response?.data?.message || error.message };
        }
    },
    delete: async (teacherId) => {
        try {
            const response = await axios.delete('/teachers/' + teacherId);
            return {
                ok: true,
                data: response.data
            };
        } catch (error) {
            return { ok: false, error: error.response?.data?.message || error.message };
        }
    },
    getAll: async () => {
        try {
            const response = await axios.get('/teachers');
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

export default TeacherService