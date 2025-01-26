import { TextEntity } from "./text-entity.type.js";

export type Message = {
  id: number;
  type: string;
  date: string;
  date_unixtime: string;
  actor: string;
  actor_id: string;
  action: string;
  title: string;
  members: string[];
  text: string | TextEntity[];
  text_entities: TextEntity[];
};
