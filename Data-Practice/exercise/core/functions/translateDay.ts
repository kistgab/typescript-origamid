export interface WeekDictionary {
  sunday: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
}

export default function translateDayInEnglishToPortuguese(
  day: keyof WeekDictionary
): string {
  const weekDays: WeekDictionary = {
    sunday: "Domingo",
    monday: "Segunda-feira",
    tuesday: "Terça-feira",
    wednesday: "Quarta-feira",
    thursday: "Quinta-feira",
    friday: "Sexta-feira",
    saturday: "Sábado",
  };

  return weekDays[day] || "Erro ao converter dia da semana";
}
