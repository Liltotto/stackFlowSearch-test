import { Question } from "../types/stackoverflow.types";
import DOMPurify from "dompurify";

import styles from "../styles/StackOverflow.module.scss";

export default function QuestionInfo({ question }: { question: Question }) {
  const sanitizeHTML = (question: Question) => {
    return DOMPurify.sanitize(question.body);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">{question.title}</h1>
      <div className="flex items-center space-x-4 text-gray-600 mb-6">
      <a
          href={question.owner.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-blue-500"
        >
        <img
          src={question.owner.profile_image}
          alt={question.owner.display_name}
          className="w-10 h-10 rounded-full"
        />
        
          {question.owner.display_name}
        </a>
        <span>
          {new Date(question.creation_date * 1000).toLocaleDateString()}
        </span>
      </div>
      <div
        className={`prose flex flex-col gap-4 max-w-none mb-6 ${styles.preAndCode}`}
        dangerouslySetInnerHTML={{ __html: sanitizeHTML(question) }}
      />
      <div className="flex space-x-2 mb-8">
        {question.tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-200 text-gray-700 text-sm font-medium px-2.5 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  );
}
