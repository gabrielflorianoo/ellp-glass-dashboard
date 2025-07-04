import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getUserProfile = async () => {
    try {
        const response = await api.get('/auth/profile');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const listUsers = async () => {
    try {
        const response = await api.get('/users');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getUserById = async (id) => {
    try {
        const response = await api.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateUser = async (id, userData) => {
    try {
        const response = await api.put(`/users/${id}`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const listWorkshops = async () => {
    try {
        const response = await api.get('/workshops');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const createWorkshop = async (workshopData) => {
    try {
        const response = await api.post('/workshops', workshopData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getWorkshopById = async (id) => {
    try {
        const response = await api.get(`/workshops/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateWorkshop = async (id, workshopData) => {
    try {
        const response = await api.put(`/workshops/${id}`, workshopData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteWorkshop = async (id) => {
    try {
        const response = await api.delete(`/workshops/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const listEnrollments = async () => {
    try {
        const response = await api.get('/enrollments');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const createEnrollment = async (enrollmentData) => {
    try {
        const response = await api.post('/enrollments', enrollmentData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getEnrollmentById = async (id) => {
    try {
        const response = await api.get(`/enrollments/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateEnrollment = async (id, enrollmentData) => {
    try {
        const response = await api.put(`/enrollments/${id}`, enrollmentData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteEnrollment = async (id) => {
    try {
        const response = await api.delete(`/enrollments/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const listClasses = async () => {
    try {
        const response = await api.get('/classes');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const createClass = async (classData) => {
    try {
        const response = await api.post('/classes', classData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getClassById = async (id) => {
    try {
        const response = await api.get(`/classes/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateClass = async (id, classData) => {
    try {
        const response = await api.put(`/classes/${id}`, classData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteClass = async (id) => {
    try {
        const response = await api.delete(`/classes/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const listAttendances = async () => {
    try {
        const response = await api.get('/attendances');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const createAttendance = async (attendanceData) => {
    try {
        const response = await api.post('/attendances', attendanceData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getAttendanceById = async (id) => {
    try {
        const response = await api.get(`/attendances/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateAttendance = async (id, attendanceData) => {
    try {
        const response = await api.put(`/attendances/${id}`, attendanceData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteAttendance = async (id) => {
    try {
        const response = await api.delete(`/attendances/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const listGrades = async () => {
    try {
        const response = await api.get('/grades');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const createGrade = async (gradeData) => {
    try {
        const response = await api.post('/grades', gradeData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getGradeById = async (id) => {
    try {
        const response = await api.get(`/grades/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateGrade = async (id, gradeData) => {
    try {
        const response = await api.put(`/grades/${id}`, gradeData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteGrade = async (id) => {
    try {
        const response = await api.delete(`/grades/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};