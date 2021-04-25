export interface IRates {
  base: string;
  rates: {
    [key: string]: number;
  };
}
