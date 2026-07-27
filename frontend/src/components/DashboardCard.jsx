export default function DashboardCard({ title, value, icon, color = "primary" }) {
    const colorClasses = {
        primary: "bg-primary-subtle text-primary",
        info: "bg-info-subtle text-info",
        success: "bg-success-subtle text-success",
        warning: "bg-warning-subtle text-warning",
        secondary: "bg-secondary-subtle text-secondary"
    };

    return (
        <div className="card border-0 ds-card h-100 dashboard-card">
            <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className={`rounded-circle p-3 ${colorClasses[color] || colorClasses.primary}`}>
                        <span className="fs-4">{icon}</span>
                    </div>
                    <span className={`badge ds-badge ${colorClasses[color] || colorClasses.primary}`}>
                        Live
                    </span>
                </div>

                <h6 className="text-muted mb-2">{title}</h6>
                <h3 className="fw-bold mb-0">{value}</h3>
            </div>
        </div>
    );
}
