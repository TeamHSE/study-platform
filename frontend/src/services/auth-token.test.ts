import Cookies from "js-cookie";
import { getAccessToken, saveTokenStorage, removeFromStorage, EnumTokens } from "./auth-token.service";

jest.mock("js-cookie", () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn()
}));

describe("auth-token.service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("getAccessToken should return null if no token found", () => {
    (Cookies.get as jest.Mock).mockReturnValueOnce(undefined);
    const result = getAccessToken();
    expect(result).toBeNull();
    expect(Cookies.get).toHaveBeenCalledWith(EnumTokens.ACCESS_TOKEN);
  });

  it("getAccessToken should return the access token if found", () => {
    const mockToken = "mock-token";
    (Cookies.get as jest.Mock).mockReturnValueOnce(mockToken);
    const result = getAccessToken();
    expect(result).toEqual(mockToken);
    expect(Cookies.get).toHaveBeenCalledWith(EnumTokens.ACCESS_TOKEN);
  });

  it("saveTokenStorage should set the access token in cookies", () => {
    const mockToken = "mock-token";
    saveTokenStorage(mockToken);
    expect(Cookies.set).toHaveBeenCalledWith(
      EnumTokens.ACCESS_TOKEN,
      mockToken,
      expect.objectContaining({
        domain: "localhost",
        sameSite: "strict",
        expires: 1
      })
    );
  });

  it("removeFromStorage should remove the access token from cookies", () => {
    removeFromStorage();
    expect(Cookies.remove).toHaveBeenCalledWith(EnumTokens.ACCESS_TOKEN);
  });
});
