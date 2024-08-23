const parseDateFromString = (dateString) => {
  const [day, date, monthName, year] = dateString.split(" ");
  const monthMap = {
    Januari: 0,
    Februari: 1,
    Maret: 2,
    April: 3,
    Mei: 4,
    Juni: 5,
    Juli: 6,
    Agustus: 7,
    September: 8,
    Oktober: 9,
    November: 10,
    Desember: 11,
  };

  const month = monthMap[monthName];
  return new Date(year, month, parseInt(date));
};

module.exports = {
  parseDateFromString,
};
