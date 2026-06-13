export interface Table {
  id?: number;
  title: string;
  game?: string;
  type?: string;
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

/**
 * Setting is used for application-wide configuration, such as 
 * the unlock token for unlimited tables or the configurable demo limit.
 */
export interface Setting {
  key: string;
  value: any;
}
