const UserService = require("../services/userService");
const data = { login: "test", password: "rk@57", id: "idgyk" };
const mockModel = {
  create: () => {
    return { dataValues: [data] };
  },
  findOne: () => {
    return data;
  },
  findAll: () => {
    return [data];
  },
  update: () => {
    return [null, { ...data, isdeleted: true }];
  }
};
const userService = new UserService(mockModel);

describe("User Service", () => {
  test("it should create a user", async () => {
    const result = await userService.createUser(data);
    expect(result).toEqual([data]);
  });
  test("it should find a user by id", async () => {
    const result = await userService.getUser(data.id);
    expect(result).toEqual(data);
  });
  test("it should mark as deleted by id", async () => {
    const result = await userService.deleteUser(data.id);
    expect(result.isdeleted).toBeTruthy();
  });
  test("it should find all the matched terms", async () => {
    const result = await userService.searchUser(5,'test');
    expect(result).toEqual([data]);
  });
});
