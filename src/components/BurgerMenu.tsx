import { useState } from "react";
import { removeQuestion } from "../store/reducers/QuestionsSlice";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const favoriteQuestions = useAppSelector(
    (state) => state.questionsReducer.questions
  );

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="relative z-50">
        <button
          className="fixed top-4 right-4 z-50 p-2 bg-blue-500 rounded-md focus:outline-none"
          onClick={toggleMenu}
        >
          <div
            className={`w-6 h-0.5 bg-white mb-1 transform transition-transform ${
              isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-white transform transition-opacity ${
              isOpen ? "opacity-0" : ""
            }`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-white mt-1 transform transition-transform ${
              isOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></div>
        </button>
      </div>

      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 min-w-80 max-w-96">
          <h2 className="text-2xl font-semibold mb-4">Favorites</h2>
          <ul className="space-y-4">
            {favoriteQuestions.length > 0 ? (
              favoriteQuestions.map(({ id, title }) => (
                <li
                  key={id}
                  className="flex justify-between items-center gap-10"
                >
                  <Link
                    to={`/questions/${id}`}
                    className="text-blue-500 hover:underline truncate"
                  >
                    {title}
                  </Link>
                  <button
                    onClick={() => dispatch(removeQuestion(id))}
                    className="text-red-500 text-2xl"
                  >
                    🗑️
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No favorite questions yet.</p>
            )}
          </ul>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

export default BurgerMenu;
