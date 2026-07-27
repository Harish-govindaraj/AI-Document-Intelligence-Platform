import { getStatusClass } from "../utils/formatters";

export default function StatusBadge({ status }) {
    return (
        <span className={`badge rounded-pill ${getStatusClass(status)}`}>
            {status || "Pending"}
        </span>
    );
}
