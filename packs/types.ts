export interface ResponseLoginRisk3 {
    status: string | "error";
    message: string | 'Value is not a valid email address';
    status_code?: number;
    data?: string;
}