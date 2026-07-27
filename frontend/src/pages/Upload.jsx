import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import documentService from "../services/documentService";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Upload() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [result, setResult] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);
        setError("");
        setSuccess("");
        setResult(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            setError("Please select a document before uploading.");
            return;
        }

        setUploading(true);
        setError("");
        setSuccess("");
        setResult(null);

        try {
            const response = await documentService.uploadDocument(file);
            setResult(response);
            setSuccess(response.message || "Document uploaded and processed successfully.");
        } catch (err) {
            setError(err.response?.data?.message || "Upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <MainLayout>
            <div className="row g-4">
                <div className="col-12 col-lg-7">
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body p-4 p-lg-5">
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                                <div>
                                    <p className="text-primary fw-semibold mb-2">AI Upload Studio</p>
                                    <h2 className="h4 mb-1">Upload a document</h2>
                                    <p className="text-muted mb-0">
                                        Drop a PDF or image and let DocMind extract insights in seconds.
                                    </p>
                                </div>
                                <span className="badge bg-primary-subtle text-primary rounded-pill">
                                    OCR • Summary • NER
                                </span>
                            </div>

                            {error && <div className="alert alert-danger rounded-3">{error}</div>}
                            {success && <div className="alert alert-success rounded-3">{success}</div>}

                            <form onSubmit={handleSubmit}>
                                <label className="d-block border border-2 border-dashed rounded-4 p-4 p-lg-5 text-center bg-light" htmlFor="file-upload">
                                    <div className="mb-3">
                                        <i className="bi bi-cloud-arrow-up fs-1 text-primary"></i>
                                    </div>
                                    <h5 className="mb-2">Drag and drop your file here</h5>
                                    <p className="text-muted mb-3">
                                        Supports PDF, PNG, and JPEG files.
                                    </p>
                                    <div className="d-flex justify-content-center">
                                        <span className="btn btn-outline-primary">Browse File</span>
                                    </div>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="d-none"
                                        onChange={handleFileChange}
                                        accept=".pdf,.png,.jpg,.jpeg"
                                    />
                                </label>

                                {file && (
                                    <div className="alert alert-light border rounded-3 mt-3 mb-0">
                                        <strong>Selected file:</strong> {file.name}
                                    </div>
                                )}

                                <div className="d-flex flex-column flex-md-row align-items-md-center gap-3 mt-4">
                                    <button className="btn btn-primary px-4" disabled={uploading}>
                                        {uploading ? "Processing..." : "Upload & Analyze"}
                                    </button>
                                    <span className="text-muted small">
                                        Upload time depends on file size and AI processing.
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-5">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-body p-4 p-lg-5">
                            <h5 className="mb-3">What happens next</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item px-0">✓ Your document is stored securely in the backend.</li>
                                <li className="list-group-item px-0">✓ OCR and PDF processing extract the document content.</li>
                                <li className="list-group-item px-0">✓ AI generates summaries, keywords, and named entities.</li>
                            </ul>

                            {uploading && (
                                <div className="mt-4">
                                    <div className="d-flex align-items-center gap-3">
                                        <LoadingSpinner />
                                        <span className="text-muted">Analyzing your document with AI...</span>
                                    </div>
                                </div>
                            )}

                            {result && (
                                <div className="mt-4">
                                    <div className="card border-0 bg-light rounded-4">
                                        <div className="card-body p-4">
                                            <h6 className="fw-semibold mb-3">Processing Result</h6>
                                            <p className="text-muted small mb-3">{result.originalFileName}</p>

                                            <div className="card border-0 shadow-sm rounded-4 mb-3">
                                                <div className="card-body">
                                                    <h6 className="fw-semibold mb-2">Summary</h6>
                                                    <p className="mb-0">{result.summary || "No summary available yet."}</p>
                                                </div>
                                            </div>

                                            <div className="card border-0 shadow-sm rounded-4 mb-3">
                                                <div className="card-body">
                                                    <h6 className="fw-semibold mb-2">Keywords</h6>
                                                    <div className="d-flex flex-wrap gap-2">
                                                        {result.keywords?.length ? (
                                                            result.keywords.map((keyword) => (
                                                                <span key={keyword} className="badge bg-primary-subtle text-primary rounded-pill">
                                                                    {keyword}
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <span className="text-muted small">No keywords generated.</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card border-0 shadow-sm rounded-4">
                                                <div className="card-body">
                                                    <h6 className="fw-semibold mb-2">Named Entities</h6>
                                                    {result.entities?.length ? (
                                                        <div className="table-responsive">
                                                            <table className="table table-sm align-middle mb-0">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Entity</th>
                                                                        <th>Type</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {result.entities.map((entity) => (
                                                                        <tr key={`${entity.text}-${entity.label}`}>
                                                                            <td>{entity.text}</td>
                                                                            <td>{entity.label}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    ) : (
                                                        <span className="text-muted small">No entities extracted.</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}