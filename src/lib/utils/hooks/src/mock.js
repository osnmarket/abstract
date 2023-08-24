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
    const mockData = Array(size || 1).fill(sample.data);

    const mockedData = mockData.map((mock) => {
      const mockKeys = Object.keys(mock);
      const newMock = {};

      for (const mk of mockKeys) {
        let enumeration = false;

        const found = sample.randomize?.find((rand) => {
          enumeration = rand.enum;
          return rand.key === mk;
        });

        if (enumeration) {
          newMock[mk] = randomStringFromEnum(enumeration);
        } else {
          if (found) {
            newMock[mk] = randomIntFromInterval(found.min, found.max);
          } else {
            newMock[mk] = mock[mk];
          }
        }
      }

      return newMock;
    });

    setMockedData(mockedData);
  }, []);

  return { mockedData };
};
