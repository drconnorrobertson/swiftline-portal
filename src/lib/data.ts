// Mock data for Swift Line Capital Portal

export interface LoanApplication {
  id: string;
  borrower: string;
  entity: string;
  address: string;
  type: string;
  amount: number;
  status: 'New' | 'Processing' | 'Funded' | 'Rejected' | 'Dead';
  affiliate: string;
  scottLender: boolean;
  accessCode: string;
  createdAt: string;
  documents: Document[];
  notes: string[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  type: 'Borrower' | 'Affiliate' | 'Lender' | 'Team';
  createdAt: string;
}

export interface PipelineDeal {
  id: string;
  loanId: string;
  borrower: string;
  amount: number;
  type: string;
  stage: string;
  phone?: string;
  email?: string;
}

export const loanApplications: LoanApplication[] = [
  {
    id: 'SLC-20260507-1A',
    borrower: 'Nick Jenkins',
    entity: 'Take Charge Investments LLC',
    address: '111 Grider Rd, Winchester, VA 22602',
    type: 'Fix & Flip',
    amount: 220430,
    status: 'Rejected',
    affiliate: 'None',
    scottLender: false,
    accessCode: 'X7K9M2',
    createdAt: '2026-05-07',
    documents: [],
    notes: [],
  },
  {
    id: 'SLC-20260507-8J',
    borrower: 'Elijah Bloom',
    entity: 'LTW Realty LLC',
    address: '550 N Soboba St, Hemet, CA 92544',
    type: 'Fix & Flip',
    amount: 490000,
    status: 'New',
    affiliate: 'None',
    scottLender: true,
    accessCode: 'P3R8N5',
    createdAt: '2026-05-07',
    documents: [
      { id: 'd1', name: 'Purchase Agreement.pdf', type: 'PDF', size: '2.4 MB', uploadedAt: '2026-05-07', uploadedBy: 'Elijah Bloom' },
    ],
    notes: ['Strong borrower - 780 credit score'],
  },
  {
    id: 'SLC-20260507-3N',
    borrower: 'Andrea Rahn',
    entity: 'Andrea Rahn',
    address: '13796 Mile Stretch Road, Hagerstown, MD 21740',
    type: 'Fix & Flip',
    amount: 165910,
    status: 'New',
    affiliate: 'None',
    scottLender: false,
    accessCode: 'W4T6L8',
    createdAt: '2026-05-06',
    documents: [],
    notes: [],
  },
  {
    id: 'SLC-20260506-2K',
    borrower: 'Rick Katinger',
    entity: 'Katinger Properties LLC',
    address: '245 Oak Lane, Pittsburgh, PA 15213',
    type: 'Fix & Flip',
    amount: 457800,
    status: 'Processing',
    affiliate: 'None',
    scottLender: true,
    accessCode: 'H9J3Q7',
    createdAt: '2026-05-05',
    documents: [
      { id: 'd2', name: 'Appraisal Report.pdf', type: 'PDF', size: '5.1 MB', uploadedAt: '2026-05-05', uploadedBy: 'Rick Katinger' },
      { id: 'd3', name: 'Insurance Binder.pdf', type: 'PDF', size: '1.2 MB', uploadedAt: '2026-05-06', uploadedBy: 'Rick Katinger' },
    ],
    notes: ['Term sheet sent 5/5', 'Awaiting signed term sheet'],
  },
  {
    id: 'SLC-20260505-4M',
    borrower: 'Judy Carbajal',
    entity: 'JC Investment Group',
    address: '892 Maple Dr, Tampa, FL 33602',
    type: 'Fix & Flip',
    amount: 89250,
    status: 'Processing',
    affiliate: 'Brett Watts',
    scottLender: false,
    accessCode: 'B6Y2F1',
    createdAt: '2026-05-04',
    documents: [],
    notes: [],
  },
  {
    id: 'SLC-20260504-7R',
    borrower: 'Will Fabel',
    entity: 'Fabel Holdings LLC',
    address: '1204 Pine St, Denver, CO 80203',
    type: 'Fix & Flip',
    amount: 120000,
    status: 'New',
    affiliate: 'None',
    scottLender: false,
    accessCode: 'C8D4G9',
    createdAt: '2026-05-01',
    documents: [],
    notes: [],
  },
  {
    id: 'SLC-20260430-5T',
    borrower: 'Marcus Chen',
    entity: 'Golden Gate Capital LLC',
    address: '567 Market St, San Francisco, CA 94105',
    type: 'Bridge',
    amount: 875000,
    status: 'Dead',
    affiliate: 'None',
    scottLender: false,
    accessCode: 'E1V5A3',
    createdAt: '2026-04-30',
    documents: [],
    notes: ['Borrower went with another lender'],
  },
];

export const pipelineStages = [
  { name: 'Quote Pending', color: '#FEF3C7' },
  { name: 'Term Sheet Requested', color: '#DBEAFE' },
  { name: 'Term Sheet Sent', color: '#D1FAE5' },
  { name: 'Term Sheet Signed', color: '#EDE9FE' },
];

export const contacts: Contact[] = [
  { id: 'c1', name: 'Nick Jenkins', email: 'nick@takecharge.com', phone: '(540) 555-0123', company: 'Take Charge Investments', type: 'Borrower', createdAt: '2026-05-07' },
  { id: 'c2', name: 'Elijah Bloom', email: 'elijah@ltwrealty.com', phone: '(951) 555-0456', company: 'LTW Realty LLC', type: 'Borrower', createdAt: '2026-05-07' },
  { id: 'c3', name: 'Andrea Rahn', email: 'andrea@email.com', phone: '(301) 555-0789', company: 'Self', type: 'Borrower', createdAt: '2026-05-06' },
  { id: 'c4', name: 'Rick Katinger', email: 'rick@katinger.com', phone: '(412) 555-0147', company: 'Katinger Properties', type: 'Borrower', createdAt: '2026-05-05' },
  { id: 'c5', name: 'Brett Watts', email: 'brett@swiftlinecapital.com', phone: '(555) 555-0100', company: 'Swift Line Capital', type: 'Team', createdAt: '2026-04-01' },
  { id: 'c6', name: 'Scott Lender', email: 'scott@lendingpartner.com', phone: '(555) 555-0200', company: 'Lending Partner LLC', type: 'Lender', createdAt: '2026-04-15' },
];

export function generateAccessCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
}
