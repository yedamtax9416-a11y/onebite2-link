export type Folder = {
  id: string;
  name: string;
  count: number;
};

export type LinkItem = {
  id: string;
  title: string | null;
  url: string;
  description?: string | null;
  folderId: string | null;
  createdAt: string;
};
