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
    passsword: { type: "varchar" },
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
      type: Boolean,
      default: false,
    },
    marketing_off_site: {
      type: Boolean,
      default: false,
    },
    send_special_offers: {
      type: Boolean,
      default: false,
    },
    show_age_in_profile: {
      type: Boolean,
      default: false,
    },
    show_city_and_country_in_profile: {
      type: Boolean,
      default: false,
    },
    visible_real_name: {
      type: Boolean,
      default: false,
    },
  },
});
