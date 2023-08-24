import { useEffect, useState } from 'react';

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomStringFromEnum = (enumeration) => {
  const formula = Math.abs(
    Math.floor(Math.random() * (0 - enumeration.length - 1) + 0)
  );
  return enumeration[formula] || enumeration[0];
};

/**
 * Generates an array of fake data based on a data sample input
 *
 * @param {object} sample
 * @param {number} size
 * @returns {array}
*/
export const useMockedData = ({ sample, size }) => {
  const [mockedData, setMockedData] = useState([]);

  useEffect(() => {
    const mockedData = Array(size || 1).fill(null).map(() => {
      const newMock = { ...sample.data };

      if (sample.randomize) {
        for (const rand of sample.randomize) {
          const { hasSub, key, subKey } = rand
          if (hasSub) {
            newMock[key] = {
              ...newMock[key],
              [subKey]: randomStringFromEnum(rand.enum),
            };
          } else {
            newMock[rand.key] = rand.enum
              ? randomStringFromEnum(rand.enum)
              : randomIntFromInterval(rand.min, rand.max);
          }
        }
      }

      return newMock;
    });

    setMockedData(mockedData);
  }, []);

  return { mockedData };
};
