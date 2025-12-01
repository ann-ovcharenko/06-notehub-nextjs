export interface Note {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export type NoteCreationData = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;

export interface FetchNotesParams {
    page: number;
    perPage: number;
    search: string; 
}

export interface NoteResponse {
    notes: Note[];
    totalPages: number;
    totalCount: number;
}