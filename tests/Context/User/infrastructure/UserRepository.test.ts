import container from "../../../../src/app/dependency-injection";
import { CONTAINER_TYPES } from "../../../../src/app/dependency-injection/types";
import { TypeOrmClientFactory } from "../../../../src/Context/Shared/infrastructure/persistence/typeorm/TypeOrmClientFactory";
import { UserRepository } from "../../../../src/Context/User/domain/UserRepository";
import { EnvironmentArranger } from "../../Shared/infrastructure/arranger/EnvironmentArranger";
import { UserMother } from "../domain/UserMother";

const repository = container.get<UserRepository>(
  CONTAINER_TYPES.UserRepository
);
const environmentArranger = container.get<EnvironmentArranger>(
  CONTAINER_TYPES.EnvironmentArranger
);

beforeAll(async () => {
  await TypeOrmClientFactory.createClient();
});

beforeEach(async () => {
  await environmentArranger.arrange();
});

afterEach(async () => {
  await environmentArranger.arrange();
});

afterAll(async () => {
  await environmentArranger.close();
});

describe("UserRepository", () => {
  describe("#save", () => {
    it("should be able to persist a user", async () => {
      const user = UserMother.random();

      await repository.save(user);

      const persistedUser = await repository.searchByEmail(user.email);

      expect(persistedUser).toEqual(user);
    });
  });

  describe("#searchByEmail", () => {
    it("should be able to search a user by email", async () => {
      const user = UserMother.random();

      await repository.save(user);

      const persistedUser = await repository.searchByEmail(user.email);

      expect(persistedUser).toEqual(user);
    });
  });

  describe("#searchByUsername", () => {
    it("should be able to search a user by username", async () => {
      const user = UserMother.random();

      await repository.save(user);

      const persistedUser = await repository.searchByUsername(user.username);

      expect(persistedUser).toEqual(user);
    });
  });
});
