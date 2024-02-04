import axios from './configApi';

const SubjectService = {
    create: async (subject) => {
        try {
            const response = await axios.post('/subjects', subject);
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
            const response = await axios.get('/subjects');
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

export default SubjectService