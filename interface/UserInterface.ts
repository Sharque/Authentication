export interface UpadtedUserInterface {
  nEmailUserID?: number | string | null;
  sEmail?: string | null;
  sPassword?: string | null;
  sFullName?: string | null;
  dtExpiry?: string | null;
  bSentReminder1?: number | null;
  bSentReminder2?: number | null;
  bSentReminder3?: number | null;
  sComanyName?: string | null;
  sContactNo?: string | null;
  sPythaDongalNo?: string | null;
  bApproved?: number | null;
  bActive?: number | null;
  bEmailVerified?: number | null;
  trial?: number | null;
  bFixed?: number | null;
  dtCreated?: Date | null;
  dtModified?: Date | null;
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}
