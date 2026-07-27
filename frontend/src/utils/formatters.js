export function formatDate(value) {
    if (!value) {
        return "—";
    }

    return new Date(value).toLocaleString("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
    });
}

export function formatSize(value) {
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
}

export function getStatusClass(status) {
    return status === "UPLOADED"
        ? "bg-success-subtle text-success"
        : "bg-warning-subtle text-warning";
}
