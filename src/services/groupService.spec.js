const GroupService = require("../services/groupService");
const data = { name: "shiva", permissions: ['READ','WRITE'], id: "idgyk" };
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
    return [null, data];
  },
  destroy: () => {
      return data;
  }
};
const groupService = new GroupService(mockModel);

describe("Group Service", () => {
  test("it should create a group", async () => {
    const result = await groupService.createGroup(data);
    expect(result).toEqual([data]);
  });
  test("it should find a group by id", async () => {
    const result = await groupService.getGroup(data.id);
    expect(result).toEqual(data);
  });
  test("it should  deconste a group by id", async () => {
    const result = await groupService.deconsteGroup(data.id);
    expect(result).toEqual(data);
  });
  test("it should update as group by id", async () => {
    const result = await groupService.updateGroup(data.id,data);
    expect(result).toEqual(data);
  });
  test("it should find all the groups", async () => {
    const result = await groupService.getAllGroups();
    expect(result).toEqual([data]);
  });
});
