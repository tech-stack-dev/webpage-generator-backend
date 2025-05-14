export interface ICreateTable {
  name: string;
  description: string;
  fields: {
    name: string;
    type: string;
    description?: string;
    options?: {
      color?: string;
      icon?: string;
    };
  }[];
}

export interface ICreateTableRes extends ICreateTable {
  id: string;
  name: string;
  primaryFieldId: string;
  views: {
    id: string;
    name: string;
    type: string;
  }[];
}

export interface IGetTableRecordsList {
  records: {
    createdTime: string;
    fields: {
      [key: string]: any;
    };
    id: string;
  }[];
}
