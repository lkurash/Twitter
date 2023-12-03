class ChangingTrends {
  deleteNotInterestingTrend(trends, notInterestingTrend) {
    let trendIndex = trends.findIndex(
      (tweet) => tweet.id === notInterestingTrend.trendId
    );

    trends.splice(trendIndex, 1);
    return trends;
  }
}

export const changingTrends = new ChangingTrends();
