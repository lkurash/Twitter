import { loadingSetup } from "../../utils/loadingSetup";

jest.mock("timers");

describe("loadingSetup", () => {
  let setIsLoading;

  beforeEach(() => {
    setIsLoading = jest.fn();

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test("sets is loading as true when loading status is 'COMPLETE'", () => {
    const boundedSetup = loadingSetup.setup.bind({ loadingStatus: "COMPLETE" });

    boundedSetup(setIsLoading);

    expect(setIsLoading).toHaveBeenCalledWith(false);
  });

  test("sets is loading as false when loading status is 'PENDING'", () => {
    const boundedSetup = loadingSetup.setup.bind({ loadingStatus: "PENDING" });

    boundedSetup(setIsLoading);
    jest.advanceTimersByTime(1000);

    expect(setIsLoading).toHaveBeenCalledTimes(1);
    expect(setIsLoading).toHaveBeenCalledWith(true);
  });

  test("sets is loading as true when loading status is 'ERROR'", () => {
    const boundedSetup = loadingSetup.setup.bind({ loadingStatus: "ERROR" });

    boundedSetup(setIsLoading);
    jest.advanceTimersByTime(1000);

    expect(setIsLoading).toHaveBeenCalledTimes(1);
    expect(setIsLoading).toHaveBeenCalledWith(true);
  });

  test("sets is loading as true when bind obj is empty", () => {
    const boundedSetup = loadingSetup.setup.bind({});

    boundedSetup(setIsLoading);
    jest.advanceTimersByTime(1000);

    expect(setIsLoading).toHaveBeenCalledTimes(1);
    expect(setIsLoading).toHaveBeenCalledWith(true);
  });
});
