// for different types of reports
// lookup for finding date key
const REPORT_TYPE = {
  expense: 'expenseDate',
  income: 'incomeDate',
};

export default function formatToDatetimeAndFilterBySelectedMonth(
  arrayOfReports,
  filterDate,
  reportType
) {
  const reportDate = REPORT_TYPE[reportType];
  const reportsForCurrentMonth: string[] = [];

  arrayOfReports.forEach((report: string, index: number) => {
    const reportEntryDate = report[reportDate];
    const dateCutoffValue = reportEntryDate.indexOf(' at '); // space between at to avoid 'at' in 'Saturday'
    const stringDateToConvert = reportEntryDate.substring(
      0,
      dateCutoffValue - 1
    );
    const reportMonth = new Date(stringDateToConvert).getMonth() + 1;

    if (filterDate === reportMonth) reportsForCurrentMonth.push(report);
  });

  return reportsForCurrentMonth;
}
