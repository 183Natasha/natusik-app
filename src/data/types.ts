export interface Question {
    id: number;
    type: string;
    label: string;
    model: string;
    required?: boolean;
    options?: object[];
    sublabels?: string[];
    placeholder?: string;
    
}
