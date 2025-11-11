import React from "react";

export default function Input({
  id,
  error = "",
  label,
  type,
  placeholder,
  value,
  handler,
}) {
  return (
    <div className="flex flex-col relative mt-6">
      <label htmlFor={id} className="font-semibold text-(--text)">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder ?? ""}
        id={id}
        value={value}
        onChange={handler}
        className="border-2 border-(--text) rounded-md px-4 py-2 mb-4 text-(--text)"
      />
      <p className="text-red-500 text-sm absolute top-17">{error}</p>
    </div>
  );
}
