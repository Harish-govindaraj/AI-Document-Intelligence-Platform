import api from "../api/api";

const documentService = {

    async uploadDocument(file) {

        const formData = new FormData();

        formData.append("file", file);

        const response = await api.post(

            "/api/documents/upload",

            formData,

            {

                headers: {

                    "Content-Type": "multipart/form-data"

                }

            }

        );

        return response.data;

    },

    async getDocuments() {

        const response = await api.get(

            "/api/documents"

        );

        return response.data;

    },

    async getDocument(id) {

        const response = await api.get(

            `/api/documents/${id}`

        );

        return response.data;

    }

};

export default documentService;