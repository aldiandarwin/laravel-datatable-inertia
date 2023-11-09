import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";

export const SortIndicator = ({ label, field, column, direction }) => {
    return (
        <div className="flex items-center">
            <span className="mr-2">{label}</span>
            {field === column ? (
                direction === "asc" ? (
                    <ChevronUp className="w-4 h-4" />
                ) : (
                    <ChevronDown className="w-4 h-4" />
                )
            ) : (
                <ChevronsUpDown className="w-4 h-4" />
            )}
        </div>
    );
};
