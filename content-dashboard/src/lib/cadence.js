// Computes exact forecast slots for a fixed weekly cadence like {"days":["mon","wed"],"time":"09:30"}.
// Not a heuristic (average interval) — walks real calendar days forward from `from` and returns
// the Nth matching slot, so "position N in queue -> date" is exact per the spec.
const DAY_INDEX = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };

export function nextSlots(cadence, from, count) {
  if (!cadence || !cadence.days || !cadence.time) return [];
  const wantedDays = new Set(cadence.days.map((d) => DAY_INDEX[d]));
  const [hh, mm] = cadence.time.split(":").map(Number);

  const slots = [];
  const cursor = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate(), hh, mm, 0));
  // MSK is UTC+3 with no DST; cadence times in this system are always specified in MSK.
  cursor.setUTCHours(cursor.getUTCHours() - 3);

  // If "today" already had its slot pass, start scanning from tomorrow.
  if (cursor <= from) cursor.setUTCDate(cursor.getUTCDate() + 1);

  let guard = 0;
  while (slots.length < count && guard < 400) {
    if (wantedDays.has(cursor.getUTCDay())) {
      slots.push(new Date(cursor));
    }
    cursor.setUTCDate(cursor.getUTCDate() + 1);
    guard += 1;
  }
  return slots;
}
