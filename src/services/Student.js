import axios from './configApi';

const StudentService = {
    create: async (student) => {
        try {
            const response = await axios.post('/students', student);
            return {
                ok: true,
                data: response.data
            };
        } catch (error) {
            return { ok: false }
            throw error;
        }
    },
    delete: async (studentId) => {
        try {
            const response = await axios.delete('/students/' + studentId);
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
            const response = await axios.get('/students/all');
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

export default StudentService