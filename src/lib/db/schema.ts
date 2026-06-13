export interface Table {
    id?: number;
    title: string;
    game: string;
    type: string;
    tags: string[];
    createdAt: number;
}

export interface Entry {
    id?: number;
    tableId: number;
    value: string;
    rangeStart: number;
    rangeEnd: number;
    pointerTableId?: number;
}

export interface Setting {
    key: string;
    value: any;
}
