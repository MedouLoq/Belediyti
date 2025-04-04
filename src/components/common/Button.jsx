import React from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner'; // We'll create this next

const Button = ({
    children,
    type = 'button',
    onClick,
    isLoading = false,
    disabled = false,
    variant = 'primary', // e.g., primary, secondary, danger
    size = 'md', // e.g., sm, md, lg
    className = '',
    fullWidth = false,
    leftIcon,
    rightIcon,
    ...props
}) => {
    const baseStyle = 'inline-flex items-center justify-center border font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantStyles = {
        primary: 'border-transparent text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300',
        secondary: 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-indigo-500 disabled:bg-gray-100',
        danger: 'border-transparent text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300',
        // Add more variants as needed (e.g., 'ghost', 'link')
    };

    const sizeStyles = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    const combinedClassName = `
    ${baseStyle}
    ${variantStyles[variant] || variantStyles.primary}
    ${sizeStyles[size] || sizeStyles.md}
    ${fullWidth ? 'w-full' : ''}
    ${(disabled || isLoading) ? 'opacity-75 cursor-not-allowed' : ''}
    ${className}
  `;

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={combinedClassName}
            whileHover={!disabled && !isLoading ? { scale: 1.03, y: -1 } : {}}
            whileTap={!disabled && !isLoading ? { scale: 0.97 } : {}}
            {...props}
        >
            {isLoading && <LoadingSpinner size="sm" className={`mr-2 ${variant === 'primary' || variant === 'danger' ? 'text-white' : 'text-blue-600'}`} />}
            {leftIcon && !isLoading && <span className="mr-2 -ml-1 h-5 w-5">{leftIcon}</span>}
            {children}
            {rightIcon && !isLoading && <span className="ml-2 -mr-1 h-5 w-5">{rightIcon}</span>}
        </motion.button>
    );
};

export default Button;