import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();
    Object.assign(user, {
      name,
      email,
    });
    this.users.push(user);
    return user;
  }

  findById(id: string): User | undefined {
    return this.users.find((item) => item.id === id);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((item) => item.email === email);
  }

  turnAdmin(receivedUser: User): User {
    let changedUser = null;
    this.users = this.users.map((user) => {
      if (user.id === receivedUser.id) {
        changedUser = { ...user, admin: true };
        return changedUser;
      }
      return user;
    });
    return changedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };