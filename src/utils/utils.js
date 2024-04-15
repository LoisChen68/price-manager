const maxAge = 20;
const ageOptions = [];
for (let i = 0; i < maxAge + 1; i++) {
  ageOptions.push({ value: i });
}

function splitNumberIntervals(arr) {
  if (arr.length === 0) {
    return [];
  }
  const numberIntervals = [];
  let start = arr[0];
  let end = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === end + 1) {
      end = arr[i];
    } else {
      numberIntervals.push([start, end]);
      start = arr[i];
      end = arr[i];
    }
  }
  numberIntervals.push([start, end]);
  return numberIntervals;
}

function getNumberIntervals(arr) {
  const numberRangerArr = [];
  const numberSet = new Set();
  const duplicateSet = new Set();

  arr.map((arr) => {
    const start = arr[0];
    const end = arr[1] + 1;
    for (let i = start; i < end; i++) {
      numberRangerArr.push(i);
    }
    return false;
  });
  numberRangerArr.forEach((value) => {
    numberSet.has(value) ? duplicateSet.add(value) : numberSet.add(value);
  });
  const numberArr = [];
  for (let i = 0; i < maxAge + 1; i++) {
    numberArr.push(i);
  }

  const numbers = Array.from(numberSet);
  const duplicates = Array.from(duplicateSet);
  const filterNumberRepeat = numberArr.filter((v) => !numbers.includes(v));
  const overlap = splitNumberIntervals(duplicates);
  const notInclude = splitNumberIntervals(filterNumberRepeat);
  return { overlap, notInclude };
}

function addComma(value) {
  let str = value.toString();
  let decimalPart = "";
  if (str.includes(".")) {
    [str, decimalPart] = str.split(".");
  }
  let result = str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (decimalPart) {
    result += "." + decimalPart;
  }
  if (!value) {
    result = "";
  }
  return result;
}

const Utils = {
  getNumberIntervals,
  addComma,
  ageOptions,
};

export default Utils;
