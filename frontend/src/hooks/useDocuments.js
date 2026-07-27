import { useCallback, useEffect, useState } from "react";
import documentService from "../services/documentService";

export default function useDocuments() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchDocuments = useCallback(async () => {
        try {
            setLoading(true);
            setError("");
            const response = await documentService.getDocuments();
            setDocuments(response || []);
        } catch (err) {
            setError(err.response?.data?.message || "Unable to load your documents right now.");
        } finally {
            setLoading(false);
        }
    }, []);

    const removeDocument = useCallback(async (id) => {
        try {
            await documentService.deleteDocument(id);
            setDocuments((current) => current.filter((document) => document.id !== id));
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Unable to delete document.");
            return false;
        }
    }, []);

    useEffect(() => {
        fetchDocuments();
    }, [fetchDocuments]);

    return { documents, setDocuments, loading, error, setError, refreshDocuments: fetchDocuments, removeDocument };
}
