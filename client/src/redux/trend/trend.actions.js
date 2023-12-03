import {
  CREATE_NOT_INTERESTING_TREND,
  GET_TRENDS,
  GET_TRENDS_FOR_AUTH_USER,
  REQUEST_TRENDS_FAILED,
  REQUEST_TRENDS_STARTED,
  SET_NOT_INTERESTING_TREND,
  SET_TRENDS,
} from "../trend/consts";

class TrendActions {
  requestStarted() {
    return {
      type: REQUEST_TRENDS_STARTED,
    };
  }

  requestFailed(error) {
    return {
      type: REQUEST_TRENDS_FAILED,
      error,
    };
  }

  getTrends(userId, limit) {
    return {
      type: GET_TRENDS,
      userId,
      limit,
    };
  }

  setTrends(trends) {
    return {
      type: SET_TRENDS,
      trends,
    };
  }

  getTrendsForAuthUser(trend, userId, limit, list) {
    return {
      type: GET_TRENDS_FOR_AUTH_USER,
      trend,
      userId,
      limit,
      list,
    };
  }

  createNotInterestingTrend(trendId, userId) {
    return {
      type: CREATE_NOT_INTERESTING_TREND,
      trendId,
      userId,
    };
  }

  setNotInterestingTrend(trend) {
    return {
      type: SET_NOT_INTERESTING_TREND,
      trend,
    };
  }
}

export const trendActions = new TrendActions();
