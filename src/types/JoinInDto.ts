export interface JoinInDto {
  email: string;
  password: string;
  phoneNumber: string;
  emailApprovalKey: string;
  files: File[]; // File 객체 배열을 추가
}