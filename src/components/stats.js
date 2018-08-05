import { AsyncStorage } from 'react-native';

const goodEmotions = ['happy', 'relaxed', 'loved', 'calm', 'calming', 'grateful', 'inspired', 'motivated'];
const badEmotions = ['sad', 'tired', 'anxious', 'annoyed', 'angry', 'insecure', 'empty'];

// chi-squared table with 1 degree of freedom
// we only really need to consider significance levels anyway
export const chiSquaredTable = {
  0.995: 0,
  0.99: 0,
  0.975: 0,
  0.95: 0,
  0.9: 0.02,
  0.5: 0.45,
  0.1: 2.71,
  0.05: 3.84,
  0.025: 5.02,
  0.01: 6.63,
  0.005: 7.88,
};

export function calcChiSquared(object) {
  AsyncStorage.getItem('mood', (err, result) => {
    if (err) throw err;
    const table = JSON.parse(result);

    // first getting the number of good moods
    let prePositiveHave, preNegativeHave, postPositiveHave, postNegativeHave;
    let prePositiveNotHave, preNegativeNotHave, postPositiveNotHave, postNegativeNotHave;
    let befPosAftNeg = 0, befNegAftPos = 0;
    for (let i = 0; i < table.length; i += 1) {
      
      // check the positive and negavtive emotions that the user has
      const positiveWordsHave = table[i].moods.filter(emotion => goodEmotions.includes(emotion));
      const negativeWordsHave = table[i].moods.filter(emotion => badEmotions.includes(emotion));
      // check the positive and negative emotions that te user does not have
      const positiveWordsNotHave = table[i].notMoods.filter(emotion => goodEmotions.includes(emotion));
      const negativeWordsNotHave = table[i].notMoods.filter(emotion => badEmotions.includes(emotion));

      // check if the data is pre or post session
      if (table[i].isPreSession) {
        // get the positive and negative moods before the session
        prePositiveHave = positiveWordsHave;
        preNegativeHave = negativeWordsHave;
        prePositiveNotHave = positiveWordsNotHave;
        preNegativeNotHave = negativeWordsNotHave;
      } else {
        // get the negative words
        postPositiveHave = positiveWordsHave;
        postNegativeHave = negativeWordsHave;
        postPositiveNotHave = positiveWordsNotHave;
        postNegativeNotHave = negativeWordsNotHave;

        // compute the before negative/after positive and the before positive -- after negative
        befPosAftNeg += prePositiveHave.filter(emotion => postPositiveNotHave.includes(emotion)).length;
        befPosAftNeg += preNegativeNotHave.filter(emotion => postNegativeHave.includes(emotion)).length;

        befNegAftPos += prePositiveNotHave.filter(emotion => postPositiveHave.includes(emotion)).length;
        befNegAftPos += preNegativeHave.filter(emotion => postNegativeNotHave.includes(emotion)).length;
      }
    }

    // console.log(`before positive after negavtive ${befPosAftNeg}`);
    // console.log(`before negative after positive ${befNegAftPos}`);

    const testStatistic = ((befNegAftPos - befPosAftNeg) ** 2) / (befNegAftPos + befPosAftNeg);
    console.log(`Test Statistic ${testStatistic}`);
    let msg;
    if (testStatistic < chiSquaredTable[0.05]) {
      msg = 'meditating has not significantly improved your mind state';
    } else if (testStatistic >= chiSquaredTable[0.005] && befNegAftPos > befPosAftNeg) {
      msg = 'meditating has made your mind state much better!';
    } else if (testStatistic >= chiSquaredTable[0.005]) {
      msg = 'meditating has made your mind state worse';
    } else if (testStatistic >= chiSquaredTable[0.05] && befNegAftPos > befPosAftNeg) {
      msg = 'meditating has slightly improved your mind state';
    } else if (testStatistic >= chiSquaredTable[0.05]) {
      msg = 'meditating has made your mind state slightly worse';
    } else {
      msg = 'meditating has not significantly improved your mind state';
    }
    object.setState({
      chiSquaredMsg: msg,
    });
  });
}