import { getStatusClass } from "../utils/formatters";

export default function StatusBadge({ status }) {
    return (
        <span className={`badge ds-badge rounded-pill ${getStatusClass(status)}`}>
            {status || "Pending"}
        </span>
    );
}
