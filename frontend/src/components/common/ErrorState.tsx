interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export default function ErrorState({ title = 'Something went wrong', message, onRetry }: ErrorStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon" style={{ backgroundColor: 'var(--color-error-bg)', color: 'var(--color-error)' }}>
        ⚠
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-desc">{message}</p>
      {onRetry && (
        <button className="btn btn-primary btn-sm mt-4" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}
