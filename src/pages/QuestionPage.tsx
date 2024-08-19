import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Question, Answer } from "../types/stackoverflow.types";
import {
  getQuestion,
  getQuestionAnswers,
} from "../services/stackoverflowService";

import AnswerList from "../components/AnswerList";
import QuestionInfo from "../components/QuestionInfo";

const QuestionPage = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // const fetchQuestionAndAnswers = async () => {
    // //   const questionResponse = await axios.get(`https://api.stackexchange.com/2.3/questions/${questionId}`, {
    // //     params: {
    // //       site: 'stackoverflow',
    // //       filter: 'withbody',
    // //     },
    // //   });

    //   getQuestion(Number(questionId)).then((question) => setQuestion(question[0]));
    // //   setQuestion(questionResponse.data.items[0]);

    // //   const answersResponse = await axios.get(`https://api.stackexchange.com/2.3/questions/${questionId}/answers`, {
    // //     params: {
    // //       site: 'stackoverflow',
    // //       filter: 'withbody',
    // //     },
    // //   });

    // getQuestionAnswers(Number(questionId)).then((answers) => setAnswers(answers));
    // //   setAnswers(answersResponse.data.items);
    // };

    const fetchQuestionAndAnswers = async () => {
      try {
        const questionData = await getQuestion(Number(questionId));
        console.log("Question Data:", questionData);
        setQuestion(questionData[0]);

        const answersData = await getQuestionAnswers(Number(questionId));
        console.log("Answers Data:", answersData);
        setAnswers(answersData);
      } catch (err) {
        setError("Failed to fetch question and answers");
        console.error(err);
      }
    };

    fetchQuestionAndAnswers();
  }, [questionId]);

  const answersTitle = (question: Question) => {
    if (!question.answer_count) return;
    if (question.answer_count === 1) {
      return `${question.answer_count} Answer`;
    }

    return `${question.answer_count} Answers`;
  };

  if (error) return <div>{error}</div>;
  if (!question) return <div>Loading...</div>;

  // const safeHTML = DOMPurify.sanitize(question.body)

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white shadow-md rounded-lg p-6 overflow-wrap: break-word">
        <QuestionInfo question={question} />
        <h2 className="text-2xl font-semibold mb-4">
          {answersTitle(question)}
        </h2>
        <AnswerList answers={answers} />
      </div>
    </div>
  );
};

export default QuestionPage;
