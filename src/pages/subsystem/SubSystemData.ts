export interface SubSystemItem {
  SubSystemId: string;
  SubSystemNo: string;
  SystemId: string;
  SystemNo: string;
  Description: string;
}

export interface SubSystemData {
  subSystems: {
    items: SubSystemItem[];
  };
}
