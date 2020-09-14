// helper function to add corresponding text for the quarter and year as a string
export default function addQuarterStringsToArr(dataset) {
  for (let i = 0; i < dataset.length; i++) {
    switch (dataset[i][0].substring(5, 7)) {
      case "01":
      case "02":
      case "03":
        dataset[i].push(dataset[i][0].substring(0, 4) + " Q1");
        break;
      case "04":
      case "05":
      case "06":
        dataset[i].push(dataset[i][0].substring(0, 4) + " Q2");
        break;
      case "07":
      case "08":
      case "09":
        dataset[i].push(dataset[i][0].substring(0, 4) + " Q3");
        break;
      case "10":
      case "11":
      case "12":
        dataset[i].push(dataset[i][0].substring(0, 4) + " Q4");
        break;
      default:
        break;
    }
  }
  return dataset;
}
