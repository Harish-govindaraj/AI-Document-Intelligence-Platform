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
                    <div className="card border-0 rounded-4 hero-panel">
                        <div className="card-body p-4 p-lg-5">
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                                <div>
                                    <span className="section-pill mb-3">AI Upload Studio</span>
                                    <h2 className="h4 mb-2 fw-semibold">Upload a document</h2>
                                    <p className="text-muted mb-0">
                                        Drop a PDF or image and let DocMind extract insights in seconds.
                                    </p>
                                </div>
                                <span className="badge bg-primary-subtle text-primary rounded-pill">
                                    OCR • Summary • NER
                                </span>
                            </div>

                            {error && (
                                <div className="alert alert-danger rounded-4 border-0 shadow-sm" role="alert">
                                    <div className="d-flex align-items-center gap-2">
                                        <i className="bi bi-exclamation-triangle"></i>
                                        <span>{error}</span>
                                    </div>
                                </div>
                            )}
                            {success && (
                                <div className="alert alert-success rounded-4 border-0 shadow-sm" role="alert">
                                    <div className="d-flex align-items-center gap-2">
                                        <i className="bi bi-check2-circle"></i>
                                        <span>{success}</span>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <label className="upload-drop-zone d-block rounded-4 p-4 p-lg-5 text-center position-relative" htmlFor="file-upload">
                                    <div className="mb-3">
                                        <div className="rounded-circle bg-primary-subtle d-inline-flex align-items-center justify-content-center p-4 mb-3">
                                            <i className="bi bi-cloud-arrow-up fs-1 text-primary"></i>
                                        </div>
                                    </div>
                                    <h5 className="mb-2 fw-semibold">Drop your file here</h5>
                                    <p className="text-muted mb-3">
                                        Supports PDF, PNG, and JPEG files. Upload once and let the AI workspace analyze it.
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
                                    <div className="card border-0 rounded-4 mt-3 mb-0 shadow-sm">
                                        <div className="card-body d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="rounded-circle bg-primary-subtle p-3">
                                                    <i className="bi bi-file-earmark-text fs-4 text-primary"></i>
                                                </div>
                                                <div>
                                                    <div className="fw-semibold">{file.name}</div>
                                                    <div className="small text-muted">{Math.round(file.size / 1024)} KB • Ready to analyze</div>
                                                </div>
                                            </div>
                                            <span className="badge bg-success-subtle text-success rounded-pill">Selected</span>
                                        </div>
                                    </div>
                                )}

                                <div className="d-flex flex-column flex-md-row align-items-md-center gap-3 mt-4">
                                    <button className="btn btn-primary px-4" disabled={uploading}>
                                        {uploading ? "Processing..." : "Upload & Analyze"}
                                    </button>
                                    <span className="text-muted small">
                                        The analysis runs instantly after upload and may take a moment for larger files.
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-5">
                    <div className="card border-0 rounded-4 h-100">
                        <div className="card-body p-4 p-lg-5">
                            <div className="d-flex align-items-center gap-2 mb-3">
                                <div className="rounded-circle bg-primary-subtle p-2">
                                    <i className="bi bi-lightning-charge text-primary"></i>
                                </div>
                                <h5 className="mb-0 fw-semibold">What happens next</h5>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item px-0 py-3">✓ Your document is stored securely in the backend.</li>
                                <li className="list-group-item px-0 py-3">✓ OCR and PDF processing extract the document content.</li>
                                <li className="list-group-item px-0 py-3">✓ AI generates summaries, keywords, and named entities.</li>
                            </ul>

                            {!result && !uploading && !error && !success && (
                                <div className="mt-4 rounded-4 border border-dashed p-4 text-center bg-light">
                                    <i className="bi bi-magic fs-3 text-primary d-block mb-2"></i>
                                    <div className="fw-semibold">Ready when you are</div>
                                    <div className="small text-muted">Choose a file to start your AI analysis.</div>
                                </div>
                            )}

                            {uploading && (
                                <div className="mt-4">
                                    <div className="rounded-4 border border-primary-subtle bg-primary-subtle p-4">
                                        <div className="d-flex align-items-center gap-3 mb-3">
                                            <LoadingSpinner />
                                            <div>
                                                <div className="fw-semibold">Analyzing document</div>
                                                <div className="small text-muted">The AI is extracting insights from your file.</div>
                                            </div>
                                        </div>
                                        <div className="progress" style={{ height: "8px" }}>
                                            <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: "70%" }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {result && (
                                <div className="mt-4">
                                    <div className="card border-0 rounded-4 hero-panel shadow-sm">
                                        <div className="card-body p-4">
                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                <div>
                                                    <h6 className="fw-semibold mb-1">Processing complete</h6>
                                                    <p className="text-muted small mb-0">{result.originalFileName}</p>
                                                </div>
                                                <span className="badge bg-success-subtle text-success rounded-pill">
                                                    <i className="bi bi-check2-circle me-1"></i>
                                                    Ready
                                                </span>
                                            </div>

                                            <div className="card border-0 rounded-4 mb-3 bg-white/80">
                                                <div className="card-body">
                                                    <h6 className="fw-semibold mb-2">Summary</h6>
                                                    <p className="mb-0">{result.summary || "No summary available yet."}</p>
                                                </div>
                                            </div>

                                            <div className="card border-0 rounded-4 mb-3 bg-white/80">
                                                <div className="card-body">
                                                    <h6 className="fw-semibold mb-2">Keywords</h6>
                                                    <div className="d-flex flex-wrap gap-2">
                                                        {result.keywords?.length ? (
                                                            result.keywords.map((keyword) => (
                                                                <span key={keyword} className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
                                                                    {keyword}
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <span className="text-muted small">No keywords generated.</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card border-0 rounded-4 bg-white/80">
                                                <div className="card-body">
                                                    <h6 className="fw-semibold mb-2">Named Entities</h6>
                                                    {result.entities?.length ? (
                                                        <div className="row g-2">
                                                            {result.entities.map((entity) => (
                                                                <div key={`${entity.text}-${entity.label}`} className="col-12 col-sm-6">
                                                                    <div className="border rounded-3 p-3 bg-light h-100">
                                                                        <div className="fw-semibold small">{entity.text}</div>
                                                                        <div className="text-muted small">{entity.label}</div>
                                                                    </div>
                                                                </div>
                                                            ))}
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