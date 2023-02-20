const findReadingTime = (length) => {
    let readingTime = parseInt(length) / 200;
    if (readingTime < 1) return 1;
    else return parseInt(readingTime);
};

export default findReadingTime;
