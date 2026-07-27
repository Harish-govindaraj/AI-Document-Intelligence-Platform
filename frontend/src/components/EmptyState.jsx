export default function EmptyState({ title, description, buttonText, buttonAction }) {
    return (
        <div className="card border-0 ds-card ds-empty-state">
            <div className="card-body p-5 text-center">
                <div className="rounded-circle bg-primary-subtle text-primary d-inline-flex align-items-center justify-content-center mb-4" style={{ width: "72px", height: "72px" }}>
                    <i className="bi bi-inbox-fill fs-2"></i>
                </div>

                <h5 className="fw-semibold mb-2">{title}</h5>
                <p className="text-muted mb-4">{description}</p>

                {buttonText && buttonAction && (
                    <button className="btn btn-primary ds-btn ds-btn-primary" onClick={buttonAction}>
                        {buttonText}
                    </button>
                )}
            </div>
        </div>
    );
}
