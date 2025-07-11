export interface Feedback {
  feedbackId?: number;
  feedbackText?: string;
  date?: Date;
  user?: {
    userId?: number;
    username?: string;
    email?: string;
    mobileNumber?: string;
  };
}
