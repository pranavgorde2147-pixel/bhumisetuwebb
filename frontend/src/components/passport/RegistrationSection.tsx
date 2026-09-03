import type { RegistrationRecord } from '../../models/registration';
import StatusBadge from '../common/StatusBadge';
import EmptyState from '../common/EmptyState';
import { formatDate, formatCurrency } from '../../utils/formatters';

interface RegistrationSectionProps {
  records: RegistrationRecord[];
}

export default function RegistrationSection({ records }: RegistrationSectionProps) {
  if (!records.length) {
    return <EmptyState icon="📜" title="No Registration Records" description="No registration data available." />;
  }

  return (
    <div>
      <h4 style={{ marginBottom: 16, fontSize: '1rem', fontWeight: 600 }}>Registration Records</h4>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Reg. Number</th>
              <th>Date</th>
              <th>Type</th>
              <th>Parties</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((reg) => (
              <tr key={reg.id}>
                <td style={{ fontWeight: 500 }}>{reg.registration_number}</td>
                <td>{formatDate(reg.registration_date)}</td>
                <td>{reg.document_type}</td>
                <td>
                  {reg.parties.map((p) => p.name).join(', ')}
                </td>
                <td>{formatCurrency(reg.consideration_amount)}</td>
                <td><StatusBadge status={reg.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
