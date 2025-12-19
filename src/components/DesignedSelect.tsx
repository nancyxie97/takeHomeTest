import React from "react";

interface Option {
    value: string;
    label: string;
}

interface ISelect<T> {
    options: Option[];
    value: string;
    onChange: (value: T) => void;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    className?: string;
}

const DesignedSelect = <T,>({
    options,
    value,
    onChange,
    leftIcon,
    rightIcon,
    className = "",
}: ISelect<T>) => {
    const iconStyles = `pointer-events-none absolute 
                        top-1/2 -translate-y-1/2 transition-all`
    return (
        <div className={`group relative w-56 ${className}`}>
            {leftIcon && (
                <div className={`${iconStyles} left-3`}>
                    {leftIcon}
                </div>
            )}

            {rightIcon && (
                <div className={`${iconStyles} right-3`}>
                    {rightIcon}
                </div>
            )}

            <select
                value={value}
                onChange={(e) => onChange(e.target.value as T)}
                aria-label="Select option"
                className={`w-full appearance-none rounded-md 
                    bg-background px-3 py-2 
                    text-sm text-foreground 
                    outline-none border transition-colors border-foreground/50 
                    focus:border-accent/50 ${rightIcon ? 'pr-9 pl-9' : ''}`}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DesignedSelect;
