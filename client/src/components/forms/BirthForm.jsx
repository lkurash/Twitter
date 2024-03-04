import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../redux/user/user.selectors";
import { setBirthDate } from "../../redux/user/visibilityUserInfo/visibilityUserInfo";

const BirthForm = ({ user }) => {
  const dispatch = useDispatch();
  const { profile } = useSelector(userProfile);
  const [userSelectMonth, setUserSelectMonth] = useState("");
  const [userSelectDay, setUserSelectDay] = useState("");
  const [userSelectYear, setUserSelectYear] = useState("");
  const monthsOption = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const mounth30Days = ["April", "June", "September", "November"];
  const mounth31Days = [
    "January",
    "March",
    "May",
    "July",
    "August",
    "October",
    "December",
  ];

  let daysOption = [];

  let yearsOption = [];

  const getYears = () => {
    yearsOption = Array.from({ length: 52 }, (_, i) => i + 1970);
  };

  const getDays = (countDay) => {
    daysOption = Array.from({ length: countDay }, (_, i) => i + 1);
  };

  const isDaysMonth = () => {
    if (mounth30Days.includes(userSelectMonth)) {
      getDays(30);
      return daysOption;
    }
    if (mounth31Days.includes(userSelectMonth)) {
      getDays(31);
      return daysOption;
    }
    if (userSelectMonth === "February") {
      getDays(29);
      return daysOption;
    }
  };

  isDaysMonth();
  getYears();

  useEffect(() => {
    const checkUserBirthdate = () => {
      if (user && !userSelectDay && !userSelectMonth && !userSelectYear) {
        const userBirthdate = profile.birthdate.split(" ");

        setUserSelectDay(userBirthdate[0]);
        setUserSelectMonth(userBirthdate[1]);
        setUserSelectYear(userBirthdate[2]);
      }
    };

    checkUserBirthdate();
  }, []);

  useEffect(() => {
    const createUserBirthdate = () => {
      if (userSelectDay && userSelectMonth && userSelectYear) {
        dispatch(
          setBirthDate(`${userSelectDay} ${userSelectMonth} ${userSelectYear}`)
        );
      }
    };

    createUserBirthdate();
  }, [userSelectDay, userSelectMonth, userSelectYear]);

  return (
    <>
      <div className="wrapper-birth-form">
        <div className="wrapper-select">
          <p className="select-name">Mounth</p>
          <select
            name="month"
            value={userSelectMonth}
            className="signup-birth-form-month"
            onChange={(e) => {
              setUserSelectMonth(e.target.value);
            }}
          >
            <option disabled />
            {monthsOption.map((month) => (
              <option value={month} key={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div className="wrapper-select">
          <p className="select-name">Day</p>
          <select
            name="day"
            value={userSelectDay}
            onInput={(e) => {
              setUserSelectDay(e.target.value);
            }}
            className="signup-birth-form-day"
          >
            {!userSelectMonth && <option disabled>Select month</option>}
            <option disabled />
            {daysOption.map((day) => (
              <option value={day} key={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <div className="wrapper-select">
          <p className="select-name">Year</p>
          <select
            name="year"
            value={userSelectYear}
            className="signup-birth-form-year"
            onInput={(e) => {
              setUserSelectYear(e.target.value);
            }}
          >
            <option disabled />
            {yearsOption.map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default BirthForm;
