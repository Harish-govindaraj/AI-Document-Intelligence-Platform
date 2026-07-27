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
            <PageHeader
                title="Your AI document workspace"
                description="Monitor activity, review recent uploads, and move quickly between document workflows."
                action={
                    <Link to="/upload" className="btn btn-primary px-4">
                        <i className="bi bi-plus-lg me-2"></i>
                        Upload Document
                    </Link>
                }
            />

            {error && (
                <div className="alert alert-danger rounded-4 border-0 shadow-sm" role="alert">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body p-5">
                        <LoadingSpinner />
                    </div>
                </div>
            ) : (
                <>
                    <div className="row g-4 mb-4">
                        <div className="col-12 col-md-6 col-xl-3">
                            <DashboardCard title="Total Documents" value={totalDocuments} icon="📄" color="primary" />
                        </div>

                        <div className="col-12 col-md-6 col-xl-3">
                            <DashboardCard title="PDF Documents" value={pdfDocuments} icon="📕" color="info" />
                        </div>

                        <div className="col-12 col-md-6 col-xl-3">
                            <DashboardCard title="Image Documents" value={imageDocuments} icon="🖼" color="success" />
                        </div>

                        <div className="col-12 col-md-6 col-xl-3">
                            <DashboardCard title="Uploaded Today" value={uploadedToday} icon="📅" color="warning" />
                        </div>
                    </div>

                    <div className="row g-4">
                        <div className="col-12 col-xl-8">
                            <div className="card border-0 shadow-sm rounded-4">
                                <div className="card-body p-4 p-lg-5">
                                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">
                                        <div>
                                            <h5 className="mb-1">Recent Uploads</h5>
                                            <p className="text-muted mb-0">Latest documents processed in your workspace.</p>
                                        </div>
                                        <Link to="/history" className="btn btn-outline-secondary btn-sm">
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
                                        <div className="card border-0 shadow-sm rounded-4 h-100 hover-shadow">
                                            <div className="card-body p-4">
                                                <div className="d-flex align-items-center mb-3">
                                                    <div className="rounded-circle bg-primary-subtle p-3 me-3">
                                                        <i className="bi bi-cloud-arrow-up fs-4 text-primary"></i>
                                                    </div>
                                                    <div>
                                                        <h6 className="mb-1">Upload Document</h6>
                                                        <p className="text-muted small mb-0">Process new files instantly</p>
                                                    </div>
                                                </div>
                                                <p className="text-muted mb-0">Add documents, trigger AI analysis, and review extracted insights in seconds.</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                                <div className="col-12">
                                    <Link to="/history" className="text-decoration-none">
                                        <div className="card border-0 shadow-sm rounded-4 h-100">
                                            <div className="card-body p-4">
                                                <div className="d-flex align-items-center mb-3">
                                                    <div className="rounded-circle bg-secondary-subtle p-3 me-3">
                                                        <i className="bi bi-clock-history fs-4 text-secondary"></i>
                                                    </div>
                                                    <div>
                                                        <h6 className="mb-1">View History</h6>
                                                        <p className="text-muted small mb-0">Browse earlier uploads</p>
                                                    </div>
                                                </div>
                                                <p className="text-muted mb-0">Return to past documents, track status, and manage your document archive.</p>
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