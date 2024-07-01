export type Category = {
  name: string;
  cId: string;
};

export type Tool = {
  name: string;
  tId: string;
  category: Category;
  location: string;
  initialStatus: string;
};
