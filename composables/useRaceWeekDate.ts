import { IRaceWeek } from "@/types/services/raceWeek";

export default (raceWeek: IRaceWeek) => {
    const sessions = [] as string[];

  const { fP1, fP2, fP3, sprintQualification } = raceWeek;
  const { sprint, raceQualification, race } = raceWeek;

  if (fP1) sessions.push(fP1);
  if (fP2) sessions.push(fP2);
  if (fP3) sessions.push(fP3);
  if (sprintQualification) sessions.push(sprintQualification);
  if (sprint) sessions.push(sprint);
  if (raceQualification) sessions.push(raceQualification);
  if (race) sessions.push(race);

  if (sessions.length === 0) {
    return "brak daty";
  }

  sessions.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  if (sessions.length === 1) {
    const { date } = useDate(sessions[0]);

    return date.slice(0, 5);
  }

  const { date: starts } = useDate(sessions[0]);
  const { date: ends } = useDate(sessions[sessions.length - 1]);

  return starts.slice(0, 5) + " - " + ends.slice(0, 5);
}