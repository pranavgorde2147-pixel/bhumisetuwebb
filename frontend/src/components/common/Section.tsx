import { useState, type ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  action?: ReactNode;
}

export default function Section({ title, children, defaultOpen = true, action }: SectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="section" role="region" aria-label={title}>
      <div
        className="section-header"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <span className="section-title">
          <span className={`section-chevron ${isOpen ? 'open' : ''}`} aria-hidden="true">
            ▼
          </span>
          {title}
        </span>
        {action && <span onClick={(e) => e.stopPropagation()}>{action}</span>}
      </div>
      {isOpen && <div className="section-body">{children}</div>}
    </div>
  );
}
