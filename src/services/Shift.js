import axios from './configApi';

const ShiftService = {
    create: async (shift) => {
        try {
            const response = await axios.post('/shifts', shift);
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
            const response = await axios.get('/shifts');
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

export default ShiftService