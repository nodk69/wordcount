import { useState, useId } from 'react';
import { ChevronDown } from 'lucide-react';

const CollapsibleSection = ({
  title,
  icon,
  children,
  defaultOpen = false,
  className = '',
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const uid = useId();

  return (
    <div
      className={`bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-100 dark:border-dark-border overflow-hidden ${className}`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`cs-${uid}`}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 dark:hover:bg-dark transition-colors"
      >
        <span className="font-semibold text-sm text-gray-900 dark:text-white flex items-center gap-2">
          {icon && <span aria-hidden="true" className="flex items-center">{icon}</span>}
          {title}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <div
        id={`cs-${uid}`}
        role="region"
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-[4000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 pb-5">{children}</div>
      </div>
    </div>
  );
};

export default CollapsibleSection;
