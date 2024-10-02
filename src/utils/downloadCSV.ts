export function downloadCSV<T extends object>(data: T[], fileName: string) {
    if (data.length === 0) {
        return;
    }


    // Get the headers (keys) from the first object
    const headers = Object.keys(data[0]);

    // Function to escape any field that contains commas, quotes, or new lines
    const escapeValue = (value: any) => {
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
            // Escape double quotes by replacing " with ""
            value = `"${value.replace(/"/g, '""')}"`;
        }
        return value;
    };

    // Generate the CSV content
    const csvContent = [
        headers.join(","), // Header row
        ...data.map((row) => headers.map((header) => escapeValue(row[header as keyof T])).join(",")) // Data rows
    ].join("\n");

    // Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${fileName}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
