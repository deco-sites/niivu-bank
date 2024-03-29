export type Emails = { emails: string[] };

export interface Props {
  /** @title Lista de Emails */
  data: Emails;
}

/** @title Configuração de email */
export default function loader({ data }: Props): Emails {
  return data;
}
