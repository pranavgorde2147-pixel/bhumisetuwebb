import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { parcelAPI, ownershipAPI, rorAPI, registrationAPI, mutationAPI, encumbranceAPI, planningAPI, taxAPI, disputeAPI, documentAPI, verificationAPI, interpretationAPI, acquisitionAPI } from '../api/endpoints';
import LandPassport from '../components/passport/LandPassport';
import SpatialIdentity from '../components/passport/SpatialIdentity';
import OwnershipSection from '../components/passport/OwnershipSection';
import RoRSection from '../components/passport/RoRSection';
import RegistrationSection from '../components/passport/RegistrationSection';
import MutationSection from '../components/passport/MutationSection';
import EncumbranceSection from '../components/passport/EncumbranceSection';
import PlanningSection from '../components/passport/PlanningSection';
import TaxSection from '../components/passport/TaxSection';
import DisputeSection from '../components/passport/DisputeSection';
import DocumentsSection from '../components/passport/DocumentsSection';
import VerificationSection from '../components/passport/VerificationSection';
import InterpretationSection from '../components/passport/InterpretationSection';
import AcquisitionSection from '../components/passport/AcquisitionSection';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';
import type { Parcel } from '../models/parcel';
import type { Owner } from '../models/ownership';
import type { RecordOfRights } from '../models/ror';
import type { RegistrationRecord } from '../models/registration';
import type { MutationRecord } from '../models/mutation';
import type { Encumbrance } from '../models/encumbrance';
import type { PlanningRecord } from '../models/planning';
import type { PropertyTax } from '../models/tax';
import type { Dispute } from '../models/dispute';
import type { Document } from '../models/document';
import type { VerificationResult } from '../models/verification';
import type { InterpretationResult } from '../models/interpretation';
import type { ParcelAcquisition } from '../models/acquisition';

export default function LandPassportPage() {
  const { id } = useParams<{ id: string }>();
  const [parcel, setParcel] = useState<Parcel | null>(null);
  const [owners, setOwners] = useState<Owner[]>([]);
  const [rorRecords, setRoR] = useState<RecordOfRights[]>([]);
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [mutations, setMutations] = useState<MutationRecord[]>([]);
  const [encumbrances, setEncumbrances] = useState<Encumbrance[]>([]);
  const [planning, setPlanning] = useState<PlanningRecord[]>([]);
  const [taxRecords, setTax] = useState<PropertyTax[]>([]);
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [verification, setVerification] = useState<VerificationResult | null>(null);
  const [interpretation, setInterpretation] = useState<InterpretationResult | null>(null);
  const [acquisitions, setAcquisitions] = useState<ParcelAcquisition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([
      parcelAPI.getById(id),
      ownershipAPI.getByParcel(id),
      rorAPI.getByParcel(id),
      registrationAPI.getByParcel(id),
      mutationAPI.getByParcel(id),
      encumbranceAPI.getByParcel(id),
      planningAPI.getByParcel(id),
      taxAPI.getByParcel(id),
      disputeAPI.getByParcel(id),
      documentAPI.getByParcel(id),
      verificationAPI.getByParcel(id),
      acquisitionAPI.getByParcel(id),
    ])
      .then(([p, o, r, reg, m, e, pl, t, d, doc, v, a]) => {
        setParcel(p.data.data);
        setOwners(o.data.data || []);
        setRoR(r.data.data || []);
        setRegistrations(reg.data.data || []);
        setMutations(m.data.data || []);
        setEncumbrances(e.data.data || []);
        setPlanning(pl.data.data || []);
        setTax(t.data.data || []);
        setDisputes(d.data.data || []);
        setDocuments(doc.data.data || []);
        setVerification(v.data.data || null);
        setAcquisitions(a.data.data || []);
      })
      .catch(() => setError('Failed to load passport data'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner text="Loading Land Passport..." />;
  if (error || !parcel) return <ErrorState message={error || 'Parcel not found'} />;

  return (
    <div className="container" style={{ padding: '32px 24px 64px' }}>
      <nav className="breadcrumb">
        <a href="/">Home</a>
        <span className="breadcrumb-sep">/</span>
        <a href={`/parcel/${id}`}>Parcel</a>
        <span className="breadcrumb-sep">/</span>
        <span>Land Passport</span>
      </nav>

      <div className="page-header">
        <h1>Land Passport</h1>
        <p className="page-header-desc">
          Complete unified view of all land records for this parcel across all sources.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <LandPassport parcel={parcel} />
        <SpatialIdentity parcel={parcel} />
        <OwnershipSection owners={owners} />
        <RoRSection records={rorRecords} />
        <RegistrationSection records={registrations} />
        <MutationSection records={mutations} />
        <EncumbranceSection records={encumbrances} />
        <PlanningSection records={planning} />
        <TaxSection records={taxRecords} />
        <DisputeSection records={disputes} />
        <DocumentsSection documents={documents} />
        <VerificationSection result={verification} />
        <InterpretationSection result={interpretation} />
        <AcquisitionSection records={acquisitions} />
      </div>
    </div>
  );
}
