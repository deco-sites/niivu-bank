export interface WebhookRequestSupabase {
    type: string;
    table: string;
    record: RecordData;
    schema: string;
    old_record: RecordData;
}

interface RecordData {
    id: number;
    rg: string;
    cpf: string;
    city: string;
    cnpj: string | null;
    email: string;
    phone: string;
    state: string;
    number: number;
    status: string;
    street: string;
    id_risk3: string;
    zip_code: string;
    full_name: string;
    complement: string;
    business_name: string | null;
    credit_status: boolean;
    analysis_classification: string;
}
  