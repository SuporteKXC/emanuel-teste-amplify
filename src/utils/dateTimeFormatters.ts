import { format, intervalToDuration } from "date-fns";
import { ptBR } from "date-fns/locale";

interface niceDateType {
  dateString: string;
  language: string;
}

export const date = (
  dateString: string,
  options = { format: "dd/MM/yyyy" }
) => {
  return format(new Date(dateString), options.format, {
    locale: ptBR,
  });
};

export const dayOfWeek = (dateString: string, options = { format: "EEEE" }) => {
  return format(new Date(dateString), options.format, {
    locale: ptBR,
  });
};

export const niceDate = ({ dateString, language }: niceDateType) => {
  let resultText = "";
  let resultYears = "";
  let resultMonths = "";
  let resultDays = "";
  let resultHours = "";
  let resultMinutes = "";

  const { years, months, days, hours, minutes } = intervalToDuration({
    start: new Date(),
    end: new Date(dateString),
  });

  const justNow: Record<string, string> = {
    "en": "just now",
    "pt": "agora mesmo",
    "es": "ahora mismo",
    "de": "jetzt",
  };
  
  switch(language) {
    case "en": 
      resultYears = years && years > 1 ? " years " : " year ";
      resultMonths = months && months > 1 ? " months " : " month ";
      resultDays = days && days > 1 ? " days " : " day ";
      resultHours = hours && hours > 1 ? " hours " : " hour ";
      resultMinutes = minutes && minutes > 1 ? " minutes " : " minute ";
    break;
    case "de": 
      resultYears = years && years > 1 ? " Jahre " : " Jahr ";
      resultMonths = months && months > 1 ? " Monate " : " Monat ";
      resultDays = days && days > 1 ? " Tage " : " Tag ";
      resultHours = hours && hours > 1 ? " Stunden " : " Stunde ";
      resultMinutes = minutes && minutes > 1 ? " Minuten " : " Minute ";
    break;
    case "es": 
      resultYears = years && years > 1 ? " años " : " año ";
      resultMonths = months && months > 1 ? " meses " : " mes ";
      resultDays = days && days > 1 ? " días " : " día ";
      resultHours = hours && hours > 1 ? " horas " : " hora ";
      resultMinutes = minutes && minutes > 1 ? " minutos " : " minuto ";
    break;
    default: 
      resultYears = years && years > 1 ? " anos " : " ano ";
      resultMonths = months && months > 1 ? " meses " : " mês ";
      resultDays = days && days > 1 ? " dias " : " dia ";
      resultHours = hours && hours > 1 ? " horas " : " hora ";
      resultMinutes = minutes && minutes > 1 ? " minutos " : " minuto ";
    break;
  }
 
  
  if(years && years !== 0) {
    resultText += years + resultYears;
  }

  if(months && months !== 0) {
    resultText += months + resultMonths;
  }

  if(days && days !== 0) {
    resultText += days + resultDays;
  }

  if(hours && hours !== 0) {
    resultText += hours + resultHours;
  }

  if(minutes && minutes !== 0) {
    resultText += minutes + resultMinutes;
  }

  if(resultText === "") {
    resultText = justNow[language] || "agora mesmo";
  }

  return resultText;
};

export const secondsToHours = (second: number) => {
  const hours = second / 3600;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);

  return `${rhours.toString().padStart(2, "0")}:${rminutes
    .toString()
    .padStart(2, "0")}`;
};

export const expirationDaysText = (days_left_password: number) => {
  const suffixDays = days_left_password > 1 ? "dias" : "dia";

  return `Sua senha expira em ${days_left_password} ${suffixDays}.`;
}
