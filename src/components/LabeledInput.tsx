import type { ReactNode } from "react";

type LabeledInputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  suffix?: string;
  rightContent?: string;
  disabled?: boolean;
  labelExtra?: ReactNode;
};

const LabeledInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  suffix,
  rightContent,
  disabled,
  labelExtra,
}: LabeledInputProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-[#a196e4]"
        >
          {label}
        </label>
        {labelExtra}
      </div>
      <div className="relative">
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-3 py-2 bg-[#15152a] border border-[#3D3554] rounded-lg text-[#fad003] placeholder-[#6B6483] focus:ring-2 focus:ring-[#d971d5] focus:border-[#d971d5] outline-none transition-colors ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        />
        {(suffix || rightContent) && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-sm">
            {suffix && <span className="text-[#a196e4]">{suffix}</span>}
            {rightContent && (
              <span className="text-[#a6ff90]">{rightContent}</span>
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default LabeledInput;
