
import { Question } from "../types/stackoverflow.types";
import { Link } from "react-router-dom";

interface QuestionListProps {
  questions: Question[];
}

const QuestionList = ({ questions } : QuestionListProps) => {
  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="text-xl text-ellipsis">
          <th className="px-4 py-2 text-left">Title</th>
          <th className="px-4 py-2">Answers</th>
          <th className="px-4 py-2">Author</th>
          <th className="px-4 py-2">Created</th>
        </tr>
      </thead>
      <tbody>
        {questions.map((question) => (
          <tr key={question.question_id} className="border-t text-lg">
            <td className="px-4 py-2">
              <Link
                to={`/questions/${question.question_id}`}
                className="text-blue-500"
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
                className="text-blue-500"
              >
                {question.owner.display_name}
              </a>
            </td>
            <td className="px-4 py-2 text-center">
              {new Date(question.creation_date * 1000).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default QuestionList;
