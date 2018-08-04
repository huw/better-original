import { AsyncStorage } from 'react-native';

const goodEmotions = ['happy', 'relaxed', 'loved', 'calm', 'calming', 'grateful', 'inspired', 'motivated'];
const badEmotions = ['sad', 'tired', 'anxious', 'annoyed', 'angry', 'insecure', 'empty'];

export default function calcChiSquared(object) {
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
    if (testStatistic < 0.001) {
      msg = 'No Observed Effects';
    } else if (testStatistic < 0.05 && befNegAftPos > befPosAftNeg) {
      msg = 'Slight Positive Effects';
    } else if (testStatistic < 0.05) {
      msg = 'Slight Negative Effects';
    } else if (befNegAftPos > befPosAftNeg) {
      msg = 'Great Positive Effects';
    } else {
      msg = 'No Improvements';
    }
    object.setState({
      chiSquaredMsg: 'Status: ' + msg,
    });
  });
}
