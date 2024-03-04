class LoadingSetup {
  setup(setIsLoading) {
    if (this.loadingStatus === "COMPLETE") {
      clearTimeout(this.timeoutID);
      setIsLoading(false);
    } else {
      this.timeoutID = setTimeout(() => {
        setIsLoading(true);
      }, 1000);
    }
  }
}

export const loadingSetup = new LoadingSetup();
