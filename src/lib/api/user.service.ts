import { random } from "../utils/random";
import { URL_RANDOM } from "./urls";

export interface RandomUser {
  name: {
    first: string;
    last: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  login: {
    username: string;
  };
  email: string;
  dob: {
    age: number;
  };
  location: {
    city: string;
    country: string;
  };
}

interface ApiResponse {
  results: RandomUser[];
}


function fullName(user: RandomUser): string {
  return `${user.name.first} ${user.name.last}`;
}

export { fullName };


export async function fetchUsers(count: number = random(5,10)): Promise<RandomUser[]> {
  const res = await fetch(URL_RANDOM + `/?results=${count}&nat=br,us,fr,gb,de`);

  if (!res.ok) {
    throw new Error(`Failed to fetch users — HTTP ${res.status}`);
  }

  const data: ApiResponse = await res.json();
  return data.results;
}

export async function fetchLoggedUser(): Promise<RandomUser> {
  const users = await fetchUsers(1);
  return users[0];
}