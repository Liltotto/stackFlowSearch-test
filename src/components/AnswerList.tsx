import { Answer } from "../types/stackoverflow.types";
import DOMPurify from "dompurify";

import styles from "../styles/StackOverflow.module.scss";

interface AnswerListProps {
  answers: Answer[];
}

const AnswerList = ({ answers }: AnswerListProps) => {
  const sanitizeHTML = (answer: Answer) => {
    return DOMPurify.sanitize(answer.body);
  };

  return (
    <div>
      {answers.map((answer, index) => (
        <div
          key={answer.answer_id}
          className={`${index ? "border-t" : ""} border-gray-200 pt-4 mt-4`}
        >
          <div className="flex items-center space-x-4 text-gray-600 mb-4">
            <a
              href={answer.owner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-blue-500"
            >
              {answer.owner.profile_image && (
                <img
                  src={answer.owner.profile_image}
                  alt={answer.owner.display_name}
                  className="w-10 h-10 rounded-full"
                />
              )}

              {answer.owner.display_name}
            </a>
            <span>
              {new Date(answer.creation_date * 1000).toLocaleDateString()}
            </span>
          </div>
          <div
            className={`prose flex flex-col gap-4 max-w-none ${styles.preAndCode} `}
            dangerouslySetInnerHTML={{ __html: sanitizeHTML(answer) }}
          />
          <div className="flex items-center justify-between text-gray-600 mt-4">
            <span>
              <b>Score:</b> {answer.score}
            </span>
            {answer.is_accepted && (
              <span className="text-green-500 font-semibold">
                Accepted Answer
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnswerList;
