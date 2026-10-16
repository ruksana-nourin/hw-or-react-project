// export interface FeePaymentStudent {
//   id: number;
//   name: string;
//   student_id?: string;
// }

// export interface FeePaymentAcademicSession {
//   id: number;
//   name: string;
// }

// export interface FeePaymentSemester {
//   id: number;
//   name: string;
// }

// export interface FeePayment {
//   id: number;
//   receipt_no: string;
//   student_id: number;
//   academic_session_id: number;
//   semester_id: number;
//   payment_date: string;
//   total_amount: number;
//   payment_amount: number;
//   due_amount: number;

//   student?: FeePaymentStudent;
//   academic_session?: FeePaymentAcademicSession;
//   semester?: FeePaymentSemester;
// }

// export interface FeePaymentErrors {
//     student_id?: string[];
//     academic_session_id?: string[];
//     semester_id?: string[];
//     payment_date?: string[];
//     payment_amount?: string[];
//     payment_details?: string[];
// }


export interface FeePaymentDetail {
  id: number;
  amount: number;
  fee_category?: {
    id: number;
    name: string;
  };
  feeCategory?: {
    id: number;
    name: string;
  };
}

export interface FeePayment {
  id: number;
  receipt_no: string;
  student_id: number;
  academic_session_id: number;
  semester_id: number;
  payment_date: string;
  total_amount: number;
  payment_amount: number;
  due_amount: number;

  student?: {
    id: number;
    name: string;
    student_id?: string;
    department?: { name: string };
    course?: { name: string };
  };

  academic_session?: { id: number; name: string };
  academicSession?: { id: number; name: string };
  semester?: { id: number; name: string };

  details?: FeePaymentDetail[];
}
