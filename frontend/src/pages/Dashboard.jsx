import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import DashboardCard from "../components/DashboardCard";
import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import useDocuments from "../hooks/useDocuments";
import { formatDate } from "../utils/formatters";

export default function Dashboard() {
    const { documents, loading, error } = useDocuments();

    const totalDocuments = documents.length;
    const pdfDocuments = documents.filter((document) => {
        const type = (document.fileType || "").toLowerCase();
        return type.includes("pdf");
    }).length;
    const imageDocuments = documents.filter((document) => {
        const type = (document.fileType || "").toLowerCase();
        return type.includes("image") || type.includes("png") || type.includes("jpeg") || type.includes("jpg");
    }).length;

    const today = new Date();
    const uploadedToday = documents.filter((document) => {
        if (!document.uploadedAt) {
            return false;
        }

        const uploadedDate = new Date(document.uploadedAt);
        return uploadedDate.getFullYear() === today.getFullYear()
            && uploadedDate.getMonth() === today.getMonth()
            && uploadedDate.getDate() === today.getDate();
    }).length;

    const recentUploads = [...documents]
        .sort((a, b) => new Date(b.uploadedAt || 0) - new Date(a.uploadedAt || 0))
        .slice(0, 5);

    return (
        <MainLayout>
            <div className="row g-4 align-items-stretch mb-4">
                <div className="col-12 col-xl-8">
                    <div className="card border-0 rounded-4 hero-panel overflow-hidden h-100">
                        <div className="card-body p-4 p-lg-5 position-relative">
                            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-start gap-4">
                                <div className="flex-grow-1">
                                    <div className="section-pill mb-3">AI workspace</div>
                                    <h2 className="display-6 fw-semibold mb-3">Turn documents into instant insight.</h2>
                                    <p className="text-muted fs-6 mb-4 col-lg-10">
                                        Review uploads, track document intelligence progress, and move from raw files to structured understanding in seconds.
                                    </p>
                                    <div className="d-flex flex-wrap gap-3">
                                        <Link to="/upload" className="btn btn-primary px-4">
                                            <i className="bi bi-plus-lg me-2"></i>
                                            New upload
                                        </Link>
                                        <Link to="/history" className="btn btn-outline-secondary px-4">
                                            <i className="bi bi-clock-history me-2"></i>
                                            View history
                                        </Link>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-3 rounded-4 px-3 py-3 bg-white/70 border border-white/60 shadow-sm">
                                    <div className="rounded-circle bg-primary-subtle p-3">
                                        <i className="bi bi-stars fs-4 text-primary"></i>
                                    </div>
                                    <div>
                                        <div className="fw-semibold">Smart analysis ready</div>
                                        <div className="small text-muted">OCR • Summary • NER</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-xl-4">
                    <div className="card border-0 rounded-4 h-100">
                        <div className="card-body p-4 d-flex flex-column justify-content-between">
                            <div>
                                <div className="section-pill mb-3">Welcome</div>
                                <h3 className="h5 fw-semibold mb-2">Good morning</h3>
                                <p className="text-muted mb-0">
                                    Your workspace is ready for the next document. Keep exploring and turn new files into useful knowledge.
                                </p>
                            </div>
                            <div className="mt-4 d-flex align-items-center gap-3 rounded-4 bg-light p-3">
                                <div className="rounded-circle bg-success-subtle p-3">
                                    <i className="bi bi-check2-circle fs-4 text-success"></i>
                                </div>
                                <div>
                                    <div className="fw-semibold">Latest status</div>
                                    <div className="small text-muted">{documents.length > 0 ? "Documents are being processed smoothly" : "Upload a document to begin"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <div className="alert alert-danger rounded-4 border-0 shadow-sm" role="alert">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="card border-0 rounded-4">
                    <div className="card-body p-5">
                        <LoadingSpinner />
                    </div>
                </div>
            ) : (
                <>
                    <div className="row g-4 mb-4">
                        <div className="col-12 col-md-6 col-xl-3">
                            <DashboardCard title="Total Documents" value={totalDocuments} icon={<i className="bi bi-files"></i>} color="primary" />
                        </div>

                        <div className="col-12 col-md-6 col-xl-3">
                            <DashboardCard title="PDF Documents" value={pdfDocuments} icon={<i className="bi bi-file-pdf"></i>} color="info" />
                        </div>

                        <div className="col-12 col-md-6 col-xl-3">
                            <DashboardCard title="Image Documents" value={imageDocuments} icon={<i className="bi bi-image"></i>} color="success" />
                        </div>

                        <div className="col-12 col-md-6 col-xl-3">
                            <DashboardCard title="Uploaded Today" value={uploadedToday} icon={<i className="bi bi-calendar2-week"></i>} color="warning" />
                        </div>
                    </div>

                    <div className="row g-4">
                        <div className="col-12 col-xl-8">
                            <div className="card border-0 rounded-4 hero-panel">
                                <div className="card-body p-4 p-lg-5">
                                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">
                                        <div>
                                            <div className="section-pill mb-2">Recent activity</div>
                                            <h5 className="mb-1 fw-semibold">Latest uploads</h5>
                                            <p className="text-muted mb-0">The most recent documents processed in your AI workspace.</p>
                                        </div>
                                        <Link to="/history" className="btn btn-outline-secondary btn-sm">
                                            <i className="bi bi-arrow-right-short me-1"></i>
                                            View History
                                        </Link>
                                    </div>

                                    <div className="table-responsive">
                                        <table className="table align-middle mb-0" aria-label="Recent uploads">
                                            <thead>
                                                <tr>
                                                    <th>Filename</th>
                                                    <th>Type</th>
                                                    <th>Status</th>
                                                    <th>Uploaded Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {recentUploads.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="4" className="text-center text-muted py-4">
                                                            No documents have been uploaded yet.
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    recentUploads.map((document) => (
                                                        <tr key={document.id}>
                                                            <td className="fw-semibold">{document.originalFileName}</td>
                                                            <td>{document.fileType || "Unknown"}</td>
                                                            <td>
                                                                <StatusBadge status={document.status} />
                                                            </td>
                                                            <td className="text-muted">{formatDate(document.uploadedAt)}</td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-xl-4">
                            <div className="row g-4">
                                <div className="col-12">
                                    <Link to="/upload" className="text-decoration-none">
                                        <div className="card border-0 rounded-4 h-100 hero-panel">
                                            <div className="card-body p-4">
                                                <div className="d-flex align-items-center mb-3">
                                                    <div className="rounded-circle bg-primary-subtle p-3 me-3">
                                                        <i className="bi bi-cloud-arrow-up fs-4 text-primary"></i>
                                                    </div>
                                                    <div>
                                                        <h6 className="mb-1 fw-semibold">Upload Document</h6>
                                                        <p className="text-muted small mb-0">Process new files instantly</p>
                                                    </div>
                                                </div>
                                                <p className="text-muted mb-0">Send a file into your workspace and let the AI workspace extract insights immediately.</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                                <div className="col-12">
                                    <Link to="/history" className="text-decoration-none">
                                        <div className="card border-0 rounded-4 h-100">
                                            <div className="card-body p-4">
                                                <div className="d-flex align-items-center mb-3">
                                                    <div className="rounded-circle bg-secondary-subtle p-3 me-3">
                                                        <i className="bi bi-clock-history fs-4 text-secondary"></i>
                                                    </div>
                                                    <div>
                                                        <h6 className="mb-1 fw-semibold">View History</h6>
                                                        <p className="text-muted small mb-0">Browse earlier uploads</p>
                                                    </div>
                                                </div>
                                                <p className="text-muted mb-0">Open your document archive to review status, summaries, and previous AI outputs.</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </MainLayout>
    );
}