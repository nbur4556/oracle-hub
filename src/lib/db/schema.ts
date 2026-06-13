// TODO: feat/data-layer: game should probably be optional. Not all oracles come from a specific game
// TODO: feat/data-layer: how do we want to handle type? I was kind of thinking the type would just be a tag...
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

//INFO: feat/data-layer: I think I just need a bit of clarification on what this setting interface is actually going to be used for?
export interface Setting {
  key: string;
  value: any;
}
