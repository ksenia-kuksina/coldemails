export type EmailHistoryEntry = {
  id: number;
  inputs: {
    bio: string;
    offer: string;
    target: string;
    useCase: string;
    company?: string;
    painPoint?: string;
    companiesWorkedWith?: string;
    isNewToField?: boolean;
  };
  subject: string;
  body: string;
  timestamp: number;
}; 