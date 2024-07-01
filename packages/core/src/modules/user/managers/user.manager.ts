import { BaseManager } from "../../base.manager";
import { UserEvents } from "../events/user";
import { users } from "../models";
import { UserRepository } from "../repositories/user.repository";

const userManagerConstructor = (
  repo: UserRepository,
  events: any
) => {
  return new (class extends BaseManager<typeof users, UserRepository>(repo, events) {
  
  })();  
};


export const UserManager = userManagerConstructor(new UserRepository(), UserEvents)
