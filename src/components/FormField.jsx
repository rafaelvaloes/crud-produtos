import React from "react";

function FormField({
  label,
  id,
  value,
  onChange,
  type = "text",
  required = true,
  options = [],
}) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}:
      </label>
      {type === "select" ? (
        <select
          id={id}
          className="form-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          className="form-control"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
      )}
    </div>
  );
}

export default FormField;
