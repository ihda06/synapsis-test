import cn from "@/utils/formatter";
import { ReactNode } from "react";

export default function FieldWrapper({
  label,
  error,
  helperText,
  children,
}: {
  label?: ReactNode;
  error?: ReactNode;
  helperText?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-white">
        {label}
      </label>
      {children}
      {helperText && (
        <div className={cn("text-xs", error ? "text-red-600" : "")}>
          {helperText}
        </div>
      )}
    </div>
  );
}
