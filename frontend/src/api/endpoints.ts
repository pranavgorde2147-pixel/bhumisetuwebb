import client from './client';
import type { ApiResponse, PageResponse } from '../models/api';
import type { Parcel, ParcelSearchParams, ParcelSearchResult } from '../models/parcel';
import type { Owner } from '../models/ownership';
import type { RecordOfRights } from '../models/ror';
import type { RegistrationRecord } from '../models/registration';
import type { MutationRecord } from '../models/mutation';
import type { Encumbrance } from '../models/encumbrance';
import type { PlanningRecord } from '../models/planning';
import type { PropertyTax } from '../models/tax';
import type { Dispute } from '../models/dispute';
import type { Document } from '../models/document';
import type { InterpretationResult } from '../models/interpretation';
import type { VerificationResult } from '../models/verification';
import type { ServiceRequest } from '../models/service-request';
import type { Transaction } from '../models/transaction';
import type { Notification } from '../models/notification';
import type { AcquisitionProject, ParcelAcquisition } from '../models/acquisition';

// Auth
export const authAPI = {
  sendOTP: (phone: string) =>
    client.post<ApiResponse<{ sessionId: string }>>('/auth/otp/send', { phoneNumber: phone }),
  verifyOTP: (phone: string, sessionId: string, otp: string) =>
    client.post<ApiResponse<{ token: string; user: { id: string; name: string; phone: string; email?: string } }>>('/auth/otp/verify', { phoneNumber: phone, sessionId, otp }),
  getProfile: () =>
    client.get<ApiResponse<{ id: string; name: string; phone: string; email?: string }>>('/auth/profile'),
};

// Parcels
export const parcelAPI = {
  search: (params: ParcelSearchParams) =>
    client.get<ApiResponse<PageResponse<ParcelSearchResult>>>('/parcels/search', { params }),
  getById: (id: string) =>
    client.get<ApiResponse<Parcel>>(`/parcels/${id}`),
  getGeometry: (id: string) =>
    client.get<ApiResponse<unknown>>(`/parcels/${id}/geometry`),
  getNearby: (id: string) =>
    client.get<ApiResponse<Parcel[]>>(`/parcels/${id}/nearby`),
  autocomplete: (query: string) =>
    client.get<ApiResponse<ParcelSearchResult[]>>('/parcels/autocomplete', { params: { q: query } }),
};

// Ownership
export const ownershipAPI = {
  getByParcel: (parcelId: string) =>
    client.get<ApiResponse<Owner[]>>(`/parcels/${parcelId}/owners`),
};

// Record of Rights
export const rorAPI = {
  getByParcel: (parcelId: string) =>
    client.get<ApiResponse<RecordOfRights[]>>(`/parcels/${parcelId}/ror`),
};

// Registration
export const registrationAPI = {
  getByParcel: (parcelId: string) =>
    client.get<ApiResponse<RegistrationRecord[]>>(`/parcels/${parcelId}/registrations`),
};

// Mutation
export const mutationAPI = {
  getByParcel: (parcelId: string) =>
    client.get<ApiResponse<MutationRecord[]>>(`/parcels/${parcelId}/mutations`),
};

// Encumbrance
export const encumbranceAPI = {
  getByParcel: (parcelId: string) =>
    client.get<ApiResponse<Encumbrance[]>>(`/parcels/${parcelId}/encumbrances`),
};

// Planning
export const planningAPI = {
  getByParcel: (parcelId: string) =>
    client.get<ApiResponse<PlanningRecord[]>>(`/parcels/${parcelId}/planning`),
};

// Tax
export const taxAPI = {
  getByParcel: (parcelId: string) =>
    client.get<ApiResponse<PropertyTax[]>>(`/parcels/${parcelId}/tax`),
};

// Disputes
export const disputeAPI = {
  getByParcel: (parcelId: string) =>
    client.get<ApiResponse<Dispute[]>>(`/parcels/${parcelId}/disputes`),
};

// Documents
export const documentAPI = {
  getByParcel: (parcelId: string) =>
    client.get<ApiResponse<Document[]>>(`/parcels/${parcelId}/documents`),
};

// Interpretation
export const interpretationAPI = {
  getByParcel: (parcelId: string, targetState: string) =>
    client.get<ApiResponse<InterpretationResult>>(`/parcels/${parcelId}/interpretation`, { params: { target_state: targetState } }),
};

// Verification
export const verificationAPI = {
  getByParcel: (parcelId: string) =>
    client.get<ApiResponse<VerificationResult>>(`/parcels/${parcelId}/verify`),
};

// Service Requests
export const serviceRequestAPI = {
  create: (data: Partial<ServiceRequest>) =>
    client.post<ApiResponse<ServiceRequest>>('/services/requests', data),
  getById: (id: string) =>
    client.get<ApiResponse<ServiceRequest>>(`/services/requests/${id}`),
  list: (params?: { status?: string; page?: number }) =>
    client.get<ApiResponse<PageResponse<ServiceRequest>>>('/services/requests', { params }),
};

// Transactions
export const transactionAPI = {
  list: (params?: { status?: string; page?: number }) =>
    client.get<ApiResponse<PageResponse<Transaction>>>('/transactions', { params }),
  getById: (id: string) =>
    client.get<ApiResponse<Transaction>>(`/transactions/${id}`),
};

// Notifications
export const notificationAPI = {
  list: (params?: { unread_only?: boolean; page?: number }) =>
    client.get<ApiResponse<PageResponse<Notification>>>('/notifications', { params }),
  markRead: (id: string) =>
    client.put<ApiResponse<void>>(`/notifications/${id}/read`),
  markAllRead: () =>
    client.put<ApiResponse<void>>('/notifications/read-all'),
};

// Acquisition
export const acquisitionAPI = {
  listProjects: () =>
    client.get<ApiResponse<AcquisitionProject[]>>('/acquisition/projects'),
  getProject: (id: string) =>
    client.get<ApiResponse<AcquisitionProject>>(`/acquisition/projects/${id}`),
  getByParcel: (parcelId: string) =>
    client.get<ApiResponse<ParcelAcquisition[]>>(`/parcels/${parcelId}/acquisitions`),
};

// Map
export const mapAPI = {
  getTiles: (params: { z: number; x: number; y: number; layers?: string }) =>
    client.get('/map/tiles/{z}/{x}/{y}', { params, responseType: 'blob' }),
};
