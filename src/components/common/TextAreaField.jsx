import React from 'react';

const TextAreaField = ({
    id,
    name,
    label,
    placeholder,
    value,
    onChange,
    required = false,
    rows = 4,
    labelSrOnly = false,
    className = '',
    ...props
}) => {
    return (
        <div>
            <label htmlFor={id} className={labelSrOnly ? 'sr-only' : 'block text-sm font-medium text-gray-700 mb-1'}>
                {label || name} {required && !labelSrOnly && <span className="text-red-500">*</span>}
            </label>
            <textarea
                id={id}
                name={name}
                rows={rows}
                required={required}
                className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${className}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...props}
            />
        </div>
    );
};

export default TextAreaField;