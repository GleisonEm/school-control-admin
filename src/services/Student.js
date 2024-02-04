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
}

export default StudentService