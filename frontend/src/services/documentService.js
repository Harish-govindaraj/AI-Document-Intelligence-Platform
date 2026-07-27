import api from "../api/api";

const documentService = {
    async uploadDocument(file) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await api.post("/documents/upload", formData);

        return response.data;
    },

    async getDocuments() {
        const response = await api.get("/documents");

        return response.data;
    },

    async getDocument(id) {
        const response = await api.get(`/documents/${id}`);

        return response.data;
    },

    async deleteDocument(id) {
        const response = await api.delete(`/documents/${id}`);

        return response.data;
    }
};

export default documentService;