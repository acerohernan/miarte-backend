import { EntitySchema } from "typeorm";

export const UserEntity = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "varchar",
    },
    email: {
      type: "varchar",
      unique: true,
    },
    username: {
      type: "varchar",
      unique: true,
    },
    password: { type: "varchar" },
    description: {
      type: "text",
      nullable: true,
    },
    copyright_name: {
      type: "varchar",
      nullable: true,
    },
    copyright_url: {
      type: "varchar",
      nullable: true,
    },
    name: {
      type: "varchar",
      nullable: true,
    },
    surname: {
      type: "varchar",
      nullable: true,
    },
    allow_users_message_me: {
      type: "bool",
      default: false,
    },
    marketing_off_site: {
      type: "bool",
      default: false,
    },
    send_special_offers: {
      type: "bool",
      default: false,
    },
    show_age_in_profile: {
      type: "bool",
      default: false,
    },
    show_city_and_country_in_profile: {
      type: "bool",
      default: false,
    },
    visible_real_name: {
      type: "bool",
      default: false,
    },
  },
});
