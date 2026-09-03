interface LoadingSpinnerProps {
  size?: 'sm' | 'lg';
  text?: string;
}

export default function LoadingSpinner({ size = 'lg', text }: LoadingSpinnerProps) {
  return (
    <div className="loading-state" role="status" aria-label="Loading">
      <div className={`spinner ${size === 'lg' ? 'spinner-lg' : ''}`} />
      {text && <p className="text-sm text-gray">{text}</p>}
    </div>
  );
}
