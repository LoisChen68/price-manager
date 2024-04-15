import Utils from "../utils";

describe("addComma", () => {
  it("Should add comma to number", () => {
    const number = -7855948.9527;
    const commaNumber = Utils.addComma(number);
    expect(commaNumber).toBe("-7,855,948.9527");
  });
});

describe("getNumberIntervals", () => {
  it("Should return the numberIntervals overlap array and notInclude array", () => {
    const intervals = [
      [6, 11],
      [5, 8],
      [17, 20],
      [7, 7],
      [14, 17],
    ];

    const result = {
      overlap: [
        [6, 8],
        [17, 17],
      ],
      notInclude: [
        [0, 4],
        [12, 13],
      ],
    };

    const { overlap, notInclude } = Utils.getNumberIntervals(intervals);
    expect(overlap).toEqual(result.overlap);
    expect(notInclude).toEqual(result.notInclude);
  });

  it("Should return the numberIntervals empty overlap array and empty notInclude array", () => {
    const intervals = [
      [0, 6],
      [7, 20],
    ];

    const result = {
      overlap: [],
      notInclude: [],
    };

    const { overlap, notInclude } = Utils.getNumberIntervals(intervals);
    expect(overlap).toEqual(result.overlap);
    expect(notInclude).toEqual(result.notInclude);
  });

  it("Should return the numberIntervals overlap array and empty notInclude array", () => {
    const intervals = [
      [0, 6],
      [6, 20],
    ];

    const result = {
      overlap: [[6, 6]],
      notInclude: [],
    };

    const { overlap, notInclude } = Utils.getNumberIntervals(intervals);
    expect(overlap).toEqual(result.overlap);
    expect(notInclude).toEqual(result.notInclude);
  });
});
