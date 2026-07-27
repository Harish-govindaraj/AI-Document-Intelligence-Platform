export default function DocumentCard({ document, onDelete }) {
    const formatDate = (value) => {
        if (!value) {
            return "Not available";
        }

        const date = new Date(value);

        return date.toLocaleDateString("en", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    };

    const formatSize = (value) => {
        if (!value) {
            return "0 KB";
        }

        const units = ["B", "KB", "MB", "GB"];
        let size = value;
        let unitIndex = 0;

        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex += 1;
        }

        return `${size.toFixed(size >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
    };

    return (
        <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start gap-2">
                    <div>
                        <h6 className="fw-semibold mb-1 text-break">
                            {document.originalFileName}
                        </h6>
                        <p className="text-muted small mb-0">
                            {document.fileType || "Document"}
                        </p>
                    </div>

                    <span className={`badge rounded-pill ${document.status === "UPLOADED" ? "bg-success-subtle text-success" : "bg-warning-subtle text-warning"}`}>
                        {document.status || "PENDING"}
                    </span>
                </div>

                <div className="small text-muted mt-3">
                    <div className="mb-2">
                        <i className="bi bi-calendar3 me-2"></i>
                        {formatDate(document.uploadedAt)}
                    </div>
                    <div>
                        <i className="bi bi-files me-2"></i>
                        {formatSize(document.fileSize)}
                    </div>
                </div>

                <div className="mt-auto pt-3">
                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => onDelete(document.id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
