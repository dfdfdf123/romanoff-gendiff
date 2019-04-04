import 'source-map-support/register';
import fs from 'fs';
import _ from 'lodash';

const genDiff = (path1, path2) => {
  const parseFile1 = JSON.parse(fs.readFileSync(path1, 'utf-8'));
  const parseFile2 = JSON.parse(fs.readFileSync(path2, 'utf-8'));
 
  const keys1 = _.keys(parseFile1);
  const keys2 = _.keys(parseFile2);
  const union = _.uniq(keys1.concat(keys2));
  const result = union.map((item) => {
    if (!_.has(parseFile1, item) && _.has(parseFile2, item)) {
      return `  + ${item}: ${parseFile2[item]}\n`;
    } else if (!_.has(parseFile2, item) && _.has(parseFile1, item)) {
      return `  - ${item}: ${parseFile1[item]}\n`;
    } else if (parseFile1[item] !== parseFile2[item]) {
      return `  + ${item}: ${parseFile2[item]}\n  - ${item}: ${parseFile1[item]}\n`;
    } else {
      return `    ${item}: ${parseFile1[item]}\n`;
    }
  });
  
  return `{\n${result.join('')}}`;
};

export default genDiff;