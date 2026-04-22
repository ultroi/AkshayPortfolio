export function getOrdinalSuffix(value) {
  const remainder100 = value % 100;
  if (remainder100 >= 11 && remainder100 <= 13) {
    return 'th';
  }

  switch (value % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

export function getAcademicStatus(startYear) {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const isBreak = month === 5 || month === 6;
  const effectiveMonth = isBreak ? 4 : month;

  let semester;
  if (effectiveMonth >= 7) {
    semester = (year - startYear) * 2 + 1;
  } else {
    semester = (year - startYear - 1) * 2 + 2;
  }

  if (semester < 1) {
    semester = 1;
  }

  const academicYear = Math.ceil(semester / 2);
  const isGraduate = semester > 6;

  if (isGraduate) {
    return {
      semester,
      academicYear,
      label: '🎓 Graduate',
      summary: 'Graduate',
    };
  }

  return {
    semester,
    academicYear,
    label: `🎓 BCA - ${academicYear} Year`,
    summary: `${academicYear}${getOrdinalSuffix(academicYear)} Year, ${semester}${getOrdinalSuffix(semester)} Semester`,
  };
}
