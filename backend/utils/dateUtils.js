module.exports = {
  getDateRange: (baseDate, period) => {
    const startDate = new Date(baseDate);
    startDate.setUTCHours(0, 0, 0, 0);

    let endDate = new Date(baseDate);
    endDate.setUTCHours(23, 59, 59, 999);

    switch (period) {
      case "Harian":
        break;
      case "Mingguan":
        startDate.setDate(startDate.getDate() - 6);
        break;
      case "Bulanan":
        startDate.setDate(startDate.getDate() - 29);
        break;
      default:
        throw new Error("Invalid period specified");
    }

    return { startDate, endDate };
  },
};
