export interface Column {
  name: string;
  label: string;
  field: string | ((row: unknown) => unknown);
  required?: boolean;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  sort?: ((a: unknown, b: unknown, rowA: unknown, rowB: unknown) => number);
  headerClasses?: string;
  format?: ((val: unknown) => string);
}

export interface Pagination {
  rowsPerPage?: number;
  page?: number;
}

export interface BaseResponse {
  status: string,
  message: string
}

export interface LoginResponse extends BaseResponse {
  data: {
    accessToken: string,
    refreshToken: string
  }
}

export interface ErrorResponse {
  statusCode: number
  error: string,
  message: string,
}

enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export interface InfoResponseData {
  name: string,
  email: string,
  avatar: string,
  role: string,
  status: UserStatus,
  total: number,
  totalAmountWithdraw: number,
  totalEarning: number,
  payment: Payment
}

export interface Payment {
  bankCode: string;
  accountNo: string;
  accountName: string;
  accountType: AccountType;
}

export enum AccountType {
  CARD = 'card',
  ACCOUNT = 'account',
}


export interface InfoResponse extends BaseResponse {
  data: InfoResponseData
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  OWNER_PARKING_LOT = 'OWNER_PARKING_LOT',
  OWNER_PARKING_SLOT = 'OWNER_PARKING_SLOT',
}
export interface User {
  id: number,
  name: string,
  email: string,
  avatar: string,
  role: string,
  status: UserStatus,
  location?: Location
}

export interface Meta {
  total: number,
  page: number,
  perPage: number
}

export interface PageRoles {
  [key: string]: UserRole[];
}

export enum SlotParkingStatus {
  AVAILABLE = 'AVAILABLE',
  BOOKED = 'BOOKED',
  UNAVAILABLE = 'UNAVAILABLE',
}

export interface Slot {
  id: number,
  userId: number,
  location: Location,
  extractLocation: string,
  image: string,
  status?: SlotParkingStatus,
  priceHour: number,
}

export interface RentRequest {
  id: number,
  pricePerHour: number,
  depositAmount: number,
  slotId: Slot,
  startTime: Date,
  endTime: Date,
  status: string
}

export interface Location {
  id: number,
  location: string,
  long: number,
  lat: number
  userId: number,
  image: string,
  name: string
}

// interface PlusCode {
//   compound_code: string;
//   global_code: string;
// }

// interface StructuredFormatting {
//   main_text: string;
//   secondary_text: string;
// }

// interface LocationData {
//   description: string;
//   matched_substrings: string[];
//   place_id: string;
//   reference: string;
//   structured_formatting: StructuredFormatting;
//   terms: string[];
//   has_children: boolean;
//   display_type: string;
//   score: number;
//   plus_code: PlusCode;
// }

export interface PredictLocation {
  description: string;
  place_id: string;
}

