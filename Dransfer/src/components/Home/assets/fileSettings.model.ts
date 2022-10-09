interface File {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  lastModifiedDate: Date;
  path: string;
}

export interface FileSettingsModel {
  id: number;
  hash: string;
  title: string;
  description: string;
  locked: boolean;
  stored: boolean;
  owner: any;
  files: File[];
  size: number;
  date: Date;
}
