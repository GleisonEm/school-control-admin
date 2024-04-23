import axios from './configApi';

const ReportService = {
    getTeachers: async (filters = null) => {
        try {
            let route = '/reports/teachers';
            if (filters) {
                route += '?';
                Object.keys(filters).forEach((key, index) => {
                    route += `${index > 0 ? '&' : ''}${key}=${filters[key]}`;
                });
            }
            const response = await axios.get(route);
            return {
                ok: true,
                data: response.data
            };
        } catch (error) {
            return { ok: false };
        }
    },
    getStudents: async (filters = null) => {
        try {
            let route = '/reports/students';
            if (filters) {
                route += '?';
                Object.keys(filters).forEach((key, index) => {
                    route += `${index > 0 ? '&' : ''}${key}=${filters[key]}`;
                });
            }
            const response = await axios.get(route);
            return {
                ok: true,
                data: response.data
            };
        } catch (error) {
            return { ok: false };
        }
    },
}

export default ReportService