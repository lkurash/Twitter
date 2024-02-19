import { loadingSetup } from "../../utils/loadingSetup";

jest.mock("timers");

describe("LoadingSetup", () => {
  let setIsLoading;

  beforeEach(() => {
    setIsLoading = jest.fn();

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test("sets is loading as true when loading status is 'COMPLETE'", () => {
    const bindSetup = loadingSetup.setup.bind({ loadingStatus: "COMPLETE" });

    bindSetup(setIsLoading);

    expect(setIsLoading).toHaveBeenCalledWith(false);
  });

  test("sets is loading as false when loading status is 'PENDING'", () => {
    const bindSetup = loadingSetup.setup.bind({ loadingStatus: "PENDING" });

    bindSetup(setIsLoading);
    jest.advanceTimersByTime(1000);

    expect(setIsLoading).toHaveBeenCalledTimes(1);
    expect(setIsLoading).toHaveBeenCalledWith(true);
  });

  test("sets is loading as true when loading status is 'ERROR'", () => {
    const bindSetup = loadingSetup.setup.bind({ loadingStatus: "ERROR" });

    bindSetup(setIsLoading);
    jest.advanceTimersByTime(1000);

    expect(setIsLoading).toHaveBeenCalledTimes(1);
    expect(setIsLoading).toHaveBeenCalledWith(true);
  });

  test("sets is loading as true when bind obj is empty", () => {
    const bindSetup = loadingSetup.setup.bind({});

    bindSetup(setIsLoading);
    jest.advanceTimersByTime(1000);

    expect(setIsLoading).toHaveBeenCalledTimes(1);
    expect(setIsLoading).toHaveBeenCalledWith(true);
  });
});
