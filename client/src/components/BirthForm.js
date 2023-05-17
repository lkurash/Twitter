import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "..";

const BirthForm = observer(() => {
  const { user } = useContext(Context);
  const [userSelectMonth, setUserSelectMonth] = useState("");
  const [userSelectDay, setUserSelectDay] = useState("1");
  const [userSelectYear, setUserSelectYear] = useState("");
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

  const optionDays = [];
  const optionYears = [];

  let birthDate;

  const getYears = () => {
    for (let year = 1970; year < 2017; year++) {
      optionYears.push(year);
    }
    return optionYears;
  };

  const getDays = (countDay) => {
    for (let day = 1; day < countDay; day++) {
      optionDays.push(day);
    }
  };

  const generateBirthDate = () => {
    if (userSelectMonth && userSelectDay && userSelectYear) {
      birthDate = `${userSelectDay} ${userSelectMonth} ${userSelectYear}`;
      user.setBirthDate(birthDate);
      return birthDate;
    }
  };

  const isDaysMonth = () => {
    if (mounth30Days.includes(userSelectMonth)) {
      getDays(31);
      return optionDays;
    }
    if (mounth31Days.includes(userSelectMonth)) {
      getDays(32);
      return optionDays;
    }
    if (userSelectMonth === "February") {
      getDays(30);
      return optionDays;
    }
  };

  isDaysMonth();
  getYears();
  generateBirthDate();

  return (
    <>
      <h4 className="edit-form-input-birth">
        Date of birth: {!birthDate ? user.user.birthdate : birthDate}
      </h4>
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
          setUserSelectDay(e.target.value);
        }}
        className="signup-birth-form-day"
      >
        {!userSelectMonth && <option disabled>Select month</option>}

        {optionDays.map((day) => (
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
        {optionYears.map((year) => (
          <option value={year} key={year}>
            {year}
          </option>
        ))}
      </select>
    </>
  );
});

export default BirthForm;
