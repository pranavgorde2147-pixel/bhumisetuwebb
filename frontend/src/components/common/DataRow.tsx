import type { ReactNode } from 'react';

interface DataRowProps {
  label: string;
  children: ReactNode;
  fullWidth?: boolean;
}

export default function DataRow({ label, children, fullWidth }: DataRowProps) {
  return (
    <div className={`data-row ${fullWidth ? 'flex-col' : ''}`}>
      <span className="data-label">{label}</span>
      <span className="data-value">{children}</span>
    </div>
  );
}
