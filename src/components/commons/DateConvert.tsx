import { useEffect, useState } from "react";

export default function DateConverter({ isoDate }: { isoDate: string }) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (!isoDate) return;

    const date = new Date(isoDate);
    if (isNaN(date.getTime())) {
      setFormattedDate("Invalid Date");
      return;
    }

    const weekdays = [
      'Sun', 
      'Mon', 
      'Tue', 
      'Wed', 
      'Thu', 
      'Fri', 
      'Sat'
    ];

    const weekday = weekdays[date.getDay()];

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    setFormattedDate(`${weekday}, ${day}-${month}-${year} ${hours}:${minutes}`);
  }, [isoDate]);

  return <div>{formattedDate}</div>;
}
