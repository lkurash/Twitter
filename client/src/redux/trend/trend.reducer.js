import {
  CREATE_NOT_INTERESTING_TREND,
  GET_TRENDS,
  GET_TRENDS_FOR_AUTH_USER,
  REQUEST_TRENDS_FAILED,
  REQUEST_TRENDS_STARTED,
  SET_NOT_INTERESTING_TREND,
  SET_TRENDS,
} from "../../utils/consts";
import { defaultState } from "../store/defaultState";

const deleteNotInterestingTrend = (trends, notInterestingTrend) => {

  let trendIndex = trends.findIndex(
    (twit) => twit.id === notInterestingTrend.trendId
  );

  trends.splice(trendIndex, 1);
  return trends;
};

export const trendReducer = (state = defaultState.Trends, action) => {
  switch (action.type) {
    case REQUEST_TRENDS_STARTED:
      return state;

    case REQUEST_TRENDS_FAILED:
      return {
        ...state,
        loadingStatus: "ERROR",
        error: action.error,
      };
    case GET_TRENDS:
      return state;

    case SET_TRENDS:
      return {
        ...state,
        trends: [...action.trends],
        loadingStatus: "COMPLETE",
      };

    case GET_TRENDS_FOR_AUTH_USER:
      return state;

    case CREATE_NOT_INTERESTING_TREND:
      return state;

    case SET_NOT_INTERESTING_TREND:
      return {
        ...state,
        trends: deleteNotInterestingTrend(state.trends, action.trend),
      };

    default:
      return state;
  }
};
