export default function PageHeader({ title, description, action }) {
    return (
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
            <div>
                <h2 className="h4 mb-1">{title}</h2>
                {description && <p className="text-muted mb-0">{description}</p>}
            </div>
            {action && <div>{action}</div>}
        </div>
    );
}
