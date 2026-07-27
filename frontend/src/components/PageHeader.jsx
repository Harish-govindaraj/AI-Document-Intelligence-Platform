export default function PageHeader({ title, description, action }) {
    return (
        <div className="page-header ds-page-header d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
            <div>
                <div className="section-pill mb-3">AI workspace</div>
                <h2 className="h3 mb-2 fw-bold">{title}</h2>
                {description && <p className="text-muted mb-0">{description}</p>}
            </div>
            {action && <div>{action}</div>}
        </div>
    );
}
