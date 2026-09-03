import type { Document } from '../../models/document';
import EmptyState from '../common/EmptyState';
import { formatDate } from '../../utils/formatters';

interface DocumentsSectionProps {
  documents: Document[];
}

export default function DocumentsSection({ documents }: DocumentsSectionProps) {
  if (!documents.length) {
    return <EmptyState icon="📁" title="No Documents" description="No documents attached to this parcel." />;
  }

  return (
    <div>
      <h4 style={{ marginBottom: 16, fontSize: '1rem', fontWeight: 600 }}>Documents</h4>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Document</th>
              <th>Type</th>
              <th>Uploaded</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td>
                  <div style={{ fontWeight: 500 }}>{doc.document_name}</div>
                  {doc.description && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>{doc.description}</div>
                  )}
                </td>
                <td>{doc.document_type}</td>
                <td>{formatDate(doc.uploaded_at)}</td>
                <td>
                  <span className={`badge ${doc.verified ? 'badge-success' : 'badge-warning'}`}>
                    {doc.verified ? 'Verified' : 'Pending'}
                  </span>
                </td>
                <td>
                  {doc.file_reference && (
                    <button className="btn btn-ghost btn-sm">View</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
