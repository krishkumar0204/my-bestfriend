import { useCallback, useEffect, useMemo, useState } from "react";
import WaitingRoom from "./pages/WaitingRoom";
import BirthdayReveal from "./pages/BirthdayReveal";

// real
const BIRTHDAY_TIMESTAMP = Date.parse("2026-06-14T00:00:00+05:30");
const BIRTHDAY_DATE = new Date(BIRTHDAY_TIMESTAMP);
const TEST_MODE_PARAM = "birthdayTest";

function isBirthdayTestMode() {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    new URLSearchParams(window.location.search).get(TEST_MODE_PARAM) === "true"
  );
}

const BirthdayController = () => {
  const testModeEnabled = isBirthdayTestMode();
  const [birthdayStarted, setBirthdayStarted] = useState(
    () => testModeEnabled || Date.now() >= BIRTHDAY_TIMESTAMP,
  );

  const startBirthday = useCallback(() => {
    setBirthdayStarted(true);
  }, []);

  const birthdayDate = useMemo(() => BIRTHDAY_DATE, []);

  useEffect(() => {
    if (testModeEnabled || birthdayStarted) {
      return undefined;
    }

    const checkBirthday = () => {
      if (Date.now() >= BIRTHDAY_TIMESTAMP) {
        startBirthday();
      }
    };

    checkBirthday();
    const interval = setInterval(checkBirthday, 1000);

    return () => clearInterval(interval);
  }, [birthdayStarted, startBirthday, testModeEnabled]);

  return birthdayStarted ? (
    <BirthdayReveal />
  ) : (
    <WaitingRoom birthdayDate={birthdayDate} onBirthdayStart={startBirthday} />
  );
};

export default BirthdayController;
