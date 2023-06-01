import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "..";

const BirthForm = observer(() => {
  const { user } = useContext(Context);
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

  let birthDate;

  const getYears = () => {
    yearsOption = Array.from({length: 52}, (_, i) => i + 1970);
  };

  const getDays = (countDay) => {
    daysOption = Array.from({length: countDay}, (_, i) => i + 1);
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
  generateBirthDate();

  const checkUserBirthdate = ()=>{
    if (user.user.birthdate && !userSelectDay && !userSelectMonth && !userSelectYear) {
      const userBirthdate = user.user.birthdate.split(' ');

      setUserSelectDay(userBirthdate[0]);
      setUserSelectMonth(userBirthdate[1]);
      setUserSelectYear(userBirthdate[2]);
    }
  };

  useEffect(()=>{
    checkUserBirthdate();
  });

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
