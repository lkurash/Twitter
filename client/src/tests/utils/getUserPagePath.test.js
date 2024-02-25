import getUserPagePath from "../../utils/getUserPagePath";

describe("GetUserPagePath", () => {
  test("when user is authenticated navigate to private user page with id 1", () => {
    expect(getUserPagePath(true, 1)).toBe("/user/1");
  });

  test("when user isn't authenticated navigate to public user page with id 1", () => {
    expect(getUserPagePath(false, 1)).toBe("/user/1/logout");
  });
});
