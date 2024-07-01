import { PgColumn, PgTable } from "drizzle-orm/pg-core";
import { BaseRepository } from "./base.repository";
import { InferInsertModel } from "drizzle-orm";

export function BaseManager<
  TModel extends PgTable & { id: PgColumn },
  TRepo extends InstanceType<ReturnType<typeof BaseRepository<TModel>>>
>(
  repo: TRepo,
  events: any
){
  return class BaseManager {
    async get(id: string) {
      return repo.get(id);
    }
    async create(item: InferInsertModel<TModel>) {
      const newUser = await repo.create(item);
      await events.Created.publish(newUser);
      return newUser;
    }

    async update(id: string, item: InferInsertModel<TModel>) {
      const updatedItem = await repo.update(id, item);
      await events.Updated.publish(updatedItem);
      return updatedItem;
    }
  }
};