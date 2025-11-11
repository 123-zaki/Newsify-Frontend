import React, { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export default function DatePicker({ value, onChange, options = {}, className, id, name, placeholder }) {
  const inputRef = useRef(null);
  const fpRef = useRef(null);

  useEffect(() => {
    if (!inputRef.current) return;
    // create instance
    fpRef.current = flatpickr(inputRef.current, {
      dateFormat: options.dateFormat || "Y-m-d",
      allowInput: options.allowInput ?? true,
      maxDate: options.maxDate || "today",
      clickOpens: options.clickOpens ?? true,
      onChange: function (selectedDates, dateStr) {
        if (typeof onChange === "function") onChange(selectedDates, dateStr);
      },
      ...options,
    });

    // set initial date if provided
    if (value) {
      try {
        fpRef.current.setDate(value, true);
      } catch (e) {
        // ignore
      }
    }

    return () => {
      if (fpRef.current && typeof fpRef.current.destroy === "function") {
        fpRef.current.destroy();
        fpRef.current = null;
      }
    };
  }, []);

  // keep fp in sync when value changes programmatically
  useEffect(() => {
    if (fpRef.current && value) {
      try {
        fpRef.current.setDate(value, true);
      } catch (e) {}
    }
  }, [value]);

  return (
    <input
      id={id}
      name={name}
      ref={inputRef}
      defaultValue={value || ""}
      placeholder={placeholder}
      aria-haspopup="dialog"
      aria-expanded={false}
      className={className}
      data-testid={id || name || "datepicker-input"}
      onClick={(e) => {
        // Try to open the picker explicitly if initialization completed
        try {
          if (fpRef.current && typeof fpRef.current.open === "function") {
            fpRef.current.open();
            console.debug("DatePicker: open() called on click");
          } else {
            console.debug("DatePicker: open() not available yet", fpRef.current);
          }
        } catch (err) {
          console.error("DatePicker: error calling open()", err);
        }
      }}
      onChange={(e) => {
        // when user types, forward the string value
        if (typeof onChange === "function") onChange(null, e.target.value);
      }}
    />
  );
}
