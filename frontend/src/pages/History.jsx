import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import useDocuments from "../hooks/useDocuments";
import { formatDate, formatSize } from "../utils/formatters";

export default function History() {
    const { documents, loading, error, setError, removeDocument } = useDocuments();
    const [filteredDocuments, setFilteredDocuments] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        const query = search.toLowerCase();
        const results = documents.filter((document) => {
            const filename = (document.originalFileName || "").toLowerCase();
            const type = (document.fileType || "").toLowerCase();
            const status = (document.status || "").toLowerCase();
            return filename.includes(query) || type.includes(query) || status.includes(query);
        });

        setFilteredDocuments(results);
    }, [search, documents]);

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this document?");
        if (!confirmed) {
            return;
        }

        try {
            setDeletingId(id);
            const success = await removeDocument(id);
            if (success) {
                setFilteredDocuments((current) => current.filter((document) => document.id !== id));
                if (selectedDocument?.id === id) {
                    setSelectedDocument(null);
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || "Unable to delete document.");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <MainLayout>
            <PageHeader
                title="Document history"
                description="Search, review, and manage your uploaded documents."
                action={
                    <div className="w-100 w-lg-33">
                        <label className="visually-hidden" htmlFor="history-search">Search documents</label>
                        <div className="input-group shadow-sm rounded-pill overflow-hidden border">
                            <span className="input-group-text bg-white border-0 text-muted">
                                <i className="bi bi-search"></i>
                            </span>
                            <input
                                id="history-search"
                                type="text"
                                className="form-control border-0 ds-input"
                                placeholder="Search filename, type, status"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                            />
                        </div>
                    </div>
                }
            />

            {error && (
                <div className="alert alert-danger rounded-4 border-0 shadow-sm" role="alert">
                    <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-exclamation-triangle"></i>
                        <span>{error}</span>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="card border-0 rounded-4 hero-panel">
                    <div className="card-body p-5">
                        <LoadingSpinner />
                    </div>
                </div>
            ) : filteredDocuments.length === 0 ? (
                <EmptyState
                    title="No documents found"
                    description="No records match your current search. Try a different keyword or clear the filter."
                />
            ) : (
                <div className="card border-0 rounded-4 ds-card overflow-hidden">
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table ds-table align-middle mb-0" aria-label="Document history">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-3">Filename</th>
                                        <th className="px-4 py-3">Type</th>
                                        <th className="px-4 py-3">Size</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Uploaded Time</th>
                                        <th className="px-4 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredDocuments.map((document) => (
                                        <tr key={document.id}>
                                            <td className="px-4 py-3 fw-semibold">
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="rounded-circle bg-primary-subtle p-2">
                                                        <i className="bi bi-file-earmark-text text-primary"></i>
                                                    </div>
                                                    <span>{document.originalFileName}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">{document.fileType || "Unknown"}</td>
                                            <td className="px-4 py-3">{formatSize(document.fileSize)}</td>
                                            <td className="px-4 py-3">
                                                <StatusBadge status={document.status} />
                                            </td>
                                            <td className="px-4 py-3 text-muted">{formatDate(document.uploadedAt)}</td>
                                            <td className="px-4 py-3">
                                                <div className="d-flex gap-2">
                                                    <button
                                                        className="btn btn-outline-primary btn-sm ds-btn ds-btn-secondary"
                                                        onClick={() => setSelectedDocument(document)}
                                                    >
                                                        <i className="bi bi-eye me-1"></i>
                                                        View
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-danger btn-sm ds-btn ds-btn-secondary"
                                                        onClick={() => handleDelete(document.id)}
                                                        disabled={deletingId === document.id}
                                                    >
                                                        {deletingId === document.id ? "Deleting..." : "Delete"}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {selectedDocument && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div className="modal-content rounded-4 border-0 overflow-hidden">
                            <div className="modal-header border-0 pb-0">
                                <div>
                                    <div className="section-pill mb-2">Document insights</div>
                                    <h5 className="modal-title fw-semibold">{selectedDocument.originalFileName}</h5>
                                    <p className="text-muted small mb-0">Review the extracted AI results for this document.</p>
                                </div>
                                <button type="button" className="btn-close" onClick={() => setSelectedDocument(null)}></button>
                            </div>
                            <div className="modal-body p-4 pt-2">
                                <div className="card border-0 rounded-4 mb-3 hero-panel">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-start gap-3">
                                            <div>
                                                <h6 className="fw-semibold mb-2">Filename</h6>
                                                <p className="mb-0">{selectedDocument.originalFileName}</p>
                                            </div>
                                            <span className="badge bg-primary-subtle text-primary rounded-pill">AI output</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="card border-0 rounded-4 mb-3 bg-white/80">
                                    <div className="card-body">
                                        <h6 className="fw-semibold mb-2">Summary</h6>
                                        <p className="mb-0">{selectedDocument.summary || "No summary available."}</p>
                                    </div>
                                </div>

                                <div className="card border-0 rounded-4 mb-3 bg-white/80">
                                    <div className="card-body">
                                        <h6 className="fw-semibold mb-2">Keywords</h6>
                                        <div className="d-flex flex-wrap gap-2">
                                            {Array.isArray(selectedDocument.keywords)
                                                ? selectedDocument.keywords.map((keyword, index) => (
                                                    <span key={index} className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
                                                        {keyword}
                                                    </span>
                                                ))
                                                : selectedDocument.keywords
                                                    ? selectedDocument.keywords.split(",").map((keyword, index) => (
                                                        <span key={index} className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
                                                            {keyword.trim()}
                                                        </span>
                                                    ))
                                                    : <span className="text-muted small">No keywords available.</span>}
                                        </div>
                                    </div>
                                </div>

                                <div className="card border-0 rounded-4 bg-white/80">
                                    <div className="card-body">
                                        <h6 className="fw-semibold mb-2">Entities</h6>
                                        {Array.isArray(selectedDocument.entities) ? (
                                            <div className="row g-2">
                                                {selectedDocument.entities.map((entity, index) => (
                                                    <div key={index} className="col-12 col-sm-6">
                                                        <div className="border rounded-3 p-3 bg-light h-100">
                                                            <div className="fw-semibold small">{entity.text}</div>
                                                            <div className="text-muted small">{entity.label}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : selectedDocument.entities ? (
                                            <div className="d-flex flex-column gap-2">
                                                {selectedDocument.entities.split(",").map((entity, index) => (
                                                    <div key={index} className="border rounded-3 p-2 bg-light">
                                                        {entity.trim()}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : <span className="text-muted small">No entities available.</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}