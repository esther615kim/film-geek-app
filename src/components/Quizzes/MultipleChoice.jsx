import { StyleSheet, Text, View, Picker } from "react-native";
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const db = getFirestore();

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default function MultipleChoice() {
  const [quizData, setQuizData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [questionsToCorrectAnswer, setQuestionsToCorrectAnswer] = useState({});
  const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);

  useEffect(() => {
    async function readQuizData() {
      const docRef = doc(db, "quizData", "pSf1qAQUlGaztNDrcBjB");
      console.log("Reading quizData in Firestore...");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const questionData = docSnap.data().results;
        console.log("quizData retrieved.");
        let newObject;
        // Add the correct answer to the incorrect_answers array at a random index between 0 and 2.
        questionData.forEach((questionData) => {
          const randomIndex = generateRandomNumber(0, 2);
          questionData.incorrect_answers.splice(randomIndex, 0, questionData.correct_answer);
          newObject = { ...newObject, [questionData.question]: questionData.correct_answer };
        });
        setQuestionsToCorrectAnswer(newObject);
        setQuizData(questionData);
      }
    }
    readQuizData();
  }, []);

  const handleAnswerSelected = (question, answerSelected) => {
    setSelectedValue(answerSelected);
    if (questionsToCorrectAnswer[question] === answerSelected) {
      setNumCorrectAnswers((currentValue) => currentValue + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Film Geek</Text>
      {quizData.length !== 0
        ? quizData.map((questionData) => (
            <View key={questionData.question}>
              <Text style={styles.question}>
                {questionData.question.replace(/&quot;/g, "'").replace(/&#([0-9]{1,3});/gi, "'")}
              </Text>

              <Picker
                selectedValue={selectedValue}
                style={{ height: 50, width: 150 }}
                onValueChange={(answerSelected) =>
                  handleAnswerSelected(questionData.question, answerSelected)
                }
              >
                <Picker.Item
                  value={questionData.incorrect_answers[3]}
                  label={questionData.incorrect_answers[3]}
                />
                <Picker.Item
                  value={questionData.incorrect_answers[0]}
                  label={questionData.incorrect_answers[0]}
                />
                <Picker.Item
                  value={questionData.incorrect_answers[1]}
                  label={questionData.incorrect_answers[1]}
                />
                <Picker.Item
                  value={questionData.incorrect_answers[2]}
                  label={questionData.incorrect_answers[2]}
                />
              </Picker>
            </View>
          ))
        : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 30,
  },
  question: {
    fontWeight: "bold",
  },
});
