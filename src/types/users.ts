export type User = {
  id: number;
  name: string;
  email: string;
  gender: Gender;
  status: Status;
};

export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
}
