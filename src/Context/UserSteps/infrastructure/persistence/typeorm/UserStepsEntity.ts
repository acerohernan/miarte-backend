import { EntitySchema } from "typeorm";

export const UserStepsEntity = new EntitySchema({
  name: "UserSteps",
  tableName: "user_steps",
  columns: {
    id: {
      type: "varchar",
      primary: true,
    },
    user_id: {
      type: "varchar",
      unique: true,
    },
    avatar_added: {
      type: "bool",
      default: false,
    },
    banner_added: {
      type: "bool",
      default: false,
    },
    social_networks_added: {
      type: "bool",
      default: false,
    },
    description_added: {
      type: "bool",
      default: false,
    },
    email_confirmed: {
      type: "bool",
      default: false,
    },
    name_and_address_added: {
      type: "bool",
      default: false,
    },
    payment_information_added: {
      type: "bool",
      default: false,
    },
  },
});
