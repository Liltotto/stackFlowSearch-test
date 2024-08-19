import { Question } from "../types/stackoverflow.types";
import { Link } from "react-router-dom";
import { setQuestion, removeQuestion } from "../store/reducers/QuestionsSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

interface QuestionListProps {
  questions: Question[];
}

const QuestionList = ({ questions }: QuestionListProps) => {
  const dispatch = useAppDispatch();
  const favoriteQuestions = useAppSelector((state) =>
    state.questionsReducer.questions.map((q) => q.id)
  );

  const toggleFavorite = (question: Question) => {
    const question_id = question.question_id;
    if (favoriteQuestions.includes(question_id)) {
      dispatch(removeQuestion(question_id));
    } else {
      dispatch(
        setQuestion({
          id: question_id,
          title: question.title,
        })
      );
    }
  };

  return (
    <table className="min-w-full table-auto">
      <thead>
        <th className="px-4 py-2 text-left w-8/12">Title</th>
          <th className="px-4 py-2 w-1/12 text-center">Answers</th>
          <th className="px-4 py-2 w-2/12 text-center">Author</th>
          <th className="px-4 py-2 w-1/12 text-center">Created</th>
          <th className="px-4 py-2 w-16 text-center">Favorite</th>
      </thead>
      <tbody>
        {questions.map((question) => (
          <tr key={question.question_id} className="border-t text-lg">
            <td className="px-4 py-2">
              <Link
                to={`/questions/${question.question_id}`}
                 className="text-blue-500 hover:underline block truncate max-w-3xl"
              >
                {question.title}
              </Link>
            </td>
            <td className="px-4 py-2 text-center">{question.answer_count}</td>
            <td className="px-4 py-2 text-center">
              <a
                href={question.owner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline block truncate max-w-60"
              >
                {question.owner.display_name}
              </a>
            </td>
            <td className="px-4 py-2 text-center">
              {new Date(question.creation_date * 1000).toLocaleDateString()}
            </td>
            <td className="px-4 py-2 text-center">
              <button onClick={() => toggleFavorite(question)}>
                {favoriteQuestions.includes(question.question_id) ? "❤️" : "🤍"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default QuestionList;
