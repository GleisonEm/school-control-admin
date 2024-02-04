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
            return { ok: false }
            throw error;
        }
    },
}

export default TeacherService