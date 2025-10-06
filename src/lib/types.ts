export type Command = {
  id: string;
  label: string;
  command: string;
  category: string;
  group?: string;
};

export type Link = {
  id: string;
  label: string;
  url: string;
  category: string;
  group?: string;
};
