export default function LoadingSpinner({ message = "Loading..." }) {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center py-4 py-md-5 text-center">
            <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                <span className="visually-hidden">{message}</span>
            </div>
            {message && (
                <p className="mt-3 mb-0 text-muted fw-semibold">{message}</p>
            )}
        </div>
    );
}