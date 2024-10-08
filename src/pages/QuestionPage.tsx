import { useParams } from "react-router-dom";
import { Question } from "../types/stackoverflow.types";
import { MainLoader } from "../components/UI/Loader";
import { useQuestionInfo } from "../hooks/useQuestionInfo";
import { useAnswersOfQuestion } from "../hooks/useAnswersOfQuestion";
import AnswerList from "../components/AnswerList";
import QuestionInfo from "../components/QuestionInfo";

const QuestionPage = () => {
  const { questionId } = useParams<{ questionId: string }>();

  const { questionData, isQuestionLoading, isQuestionError, questionError } =
    useQuestionInfo(questionId);

  const { answersData, isAnswersLoading, isAnswersError, answersError } =
    useAnswersOfQuestion(questionId);

  const answersTitle = (question: Question) => {
    if (!question.answer_count) return;
    if (question.answer_count === 1) {
      return `${question.answer_count} Answer`;
    }

    return `${question.answer_count} Answers`;
  };

  if (isQuestionError)
    return (
      <div className="m-auto text-3xl">{(questionError as Error).message}</div>
    );
  if (isAnswersError)
    return (
      <div className="m-auto text-3xl">{(answersError as Error).message}</div>
    );

  if (isQuestionLoading || isAnswersLoading) return <MainLoader />;

  const question = questionData?.[0];
  const answers = answersData || [];

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="bg-white shadow-md rounded-lg p-6 overflow-wrap: break-word">
        {question && <QuestionInfo question={question} />}
        <h2 className="text-2xl font-semibold mb-4">
          {question && answersTitle(question)}
        </h2>
        <AnswerList answers={answers} />
      </div>
    </div>
  );
};

export default QuestionPage;
