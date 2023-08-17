import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "../..";

const BirthForm = observer(({user}) => {
  const { usersStore } = useContext(Context);
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

  const checkUserBirthdate = () => {
    if (
      user.birthdate &&
      !userSelectDay &&
      !userSelectMonth &&
      !userSelectYear
    ) {
      const userBirthdate = usersStore.user.birthdate.split(" ");

      setUserSelectDay(userBirthdate[0]);
      setUserSelectMonth(userBirthdate[1]);
      setUserSelectYear(userBirthdate[2]);
    }
  };

  // console.log(usersStore.user);

  const createUserBirthdate = () => {
    if (userSelectDay && userSelectMonth && userSelectYear) {
      usersStore.setBirthDate(
        `${userSelectDay} ${userSelectMonth} ${userSelectYear}`
      );
    }
  };

  createUserBirthdate();

  useEffect(() => {
    checkUserBirthdate();
  });

  return (
    <>
      <h4 className="edit-form-input-birth">Date of birth:</h4>
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
    </>
  );
});

export default BirthForm;
