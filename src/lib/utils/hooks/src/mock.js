import { useEffect, useState } from 'react';

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomStringFromEnum = (enumeration) => {
  const formula = Math.abs(
    Math.floor(Math.random() * (0 - enumeration.length - 1))
  );
  return enumeration[formula] || enumeration[0];
};

const handleRadomization = (rand) => {
  return rand.enum
    ? randomStringFromEnum(rand.enum)
    : randomIntFromInterval(rand.min, rand.max);
};

const handleMockData = ({ sample, newMock }) => {
  if (sample.randomize) {
    for (const rand of sample.randomize) {
      const { hasSub, key, subKey } = rand;
      if (hasSub) {
        newMock[key] = {
          ...newMock[key],
          [subKey]: handleRadomization(rand),
        };
      } else {
        newMock[rand.key] = handleRadomization(rand);
      }
    }
  }
  return newMock;
};

/**
 * Generates an array of fake data based on a data sample input
 * @param {object} sample
 * @param {number} size
 * @returns {array}
 */

export const useMockedData = ({ sample, size = 1 }) => {
  const [mockedData, setMockedData] = useState([]);
  useEffect(() => {
    const mockedElements = Array(size)
      .fill(null)
      .map(() => {
        const newMock = { ...sample.data };

        return handleMockData({ sample, newMock });
      });
    setMockedData(mockedElements);
  }, []);
  return { mockedData };
};
