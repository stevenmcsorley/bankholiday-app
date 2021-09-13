export interface Event {
  title?: string;
  date?: any;
  notes?: string;
  bunting?: boolean;
}

export interface Region {
  division?: string;
  events?: Event[];
}

export interface IBankHolidays {
  englandAndWales?: Region | string;
  northernIreland?: Region | string;
  scotland?: Region | string;
}

export interface IRegionSelect {
  id?: string;
  name?: string;
}
