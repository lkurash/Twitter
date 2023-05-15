import { useState } from "react";
import { useLocation } from "react-router-dom";
import { SIGNUP_PAGE } from "../utils/constans";

function BirthForm(props) {
  const listMonths = [
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

  const listDays = (day) => {
    for (let index = 0; index < 30; index++) {
      let element = day[index];

      element += 1;
      day.push(element);
    }
    return day;
  };

  const listYears = (year) => {
    for (let index = 0; index < 52; index++) {
      let element = year[index];

      element += 1;
      year.push(element);
    }
    return year;
  };

  const [userSelectMonth, setUserSelectMonth] = useState("");
  const [userSelectDay, setUserSelectDay] = useState("1");
  const [userSelectYear, setUserSelectYear] = useState("");

  const location = useLocation().pathname;

  let date;

  if (userSelectMonth && userSelectDay && userSelectYear) {
    date = `${userSelectDay} ${userSelectMonth} ${userSelectYear}`;
  }

  return (
    <div className="signup-birth-form">
      <select
        name="month"
        value={userSelectMonth}
        className="signup-birth-form-month"
        onChange={(e) => {
          setUserSelectMonth(e.target.value);
        }}
      >
        <option disabled />
        {listMonths.map((month) => (
          <option value={month} key={month}>
            {month}
          </option>
        ))}
      </select>

      <select
        name="day"
        onInput={(e) => {
          {
            setUserSelectDay(e.target.value);
          }
        }}
        className="signup-birth-form-day"
      >
        <option disabled value={0} />
        {!userSelectMonth && <option disabled>Select month</option>}
        {userSelectMonth === "February" &&
          listDays([1])
            .slice(0, 29)
            .map((day) => (
              <option value={day} key={day}>
                {day}
              </option>
            ))}
        {(userSelectMonth === "April" ||
          userSelectMonth === "June" ||
          userSelectMonth === "September" ||
          userSelectMonth === "November") &&
          listDays([1])
            .slice(0, 30)
            .map((day) => (
              <option value={day} key={day}>
                {day}
              </option>
            ))}
        {(userSelectMonth === "January" ||
          userSelectMonth === "March" ||
          userSelectMonth === "May" ||
          userSelectMonth === "July" ||
          userSelectMonth === "August" ||
          userSelectMonth === "October" ||
          userSelectMonth === "December") &&
          listDays([1]).map((day) => (
            <option value={day} key={day}>
              {day}
            </option>
          ))}
      </select>

      <select
        name="year"
        value={userSelectYear}
        className="signup-birth-form-year"
        onInput={(e) => {
          setUserSelectYear(e.target.value);
        }}
      >
        <option disabled />
        {listYears([1970]).map((year) => (
          <option value={year} key={year}>
            {year}
          </option>
        ))}
      </select>
      {location === SIGNUP_PAGE ? (
        <button
          className="signup-form-button"
          type="button"
          onClick={() =>
            props.getInfoUser(props.userName, props.email, date, props.password)
          }
        >
          <span>Next</span>
        </button>
      ) : (
        <button
          className="button-for-edit-profile-form"
          type="button"
          onClick={() => props.getBirthUser(date)}
        >
          <span>Add Date</span>
        </button>
      )}
    </div>
  );
}
export default BirthForm;
