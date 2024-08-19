
interface IArrowButtonProps {
    direction: 'left' | 'right';
    onClick: () => void;
    disabled: boolean;
}

export const ArrowButton = ({ direction, onClick, disabled } : IArrowButtonProps) => (
    <button
      disabled={disabled}
      onClick={onClick}
      className="px-2 py-2 rounded-md border border-gray-300 flex items-center justify-center"
    >
      <svg
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={direction === 'left' ? 'rotate-180' : ''}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.28033 7.96967C9.57322 8.26256 9.57322 8.73744 9.28033 9.03033L1.78033 16.5303C1.48744 16.8232 1.01256 16.8232 0.71967 16.5303C0.426777 16.2374 0.426777 15.7626 0.71967 15.4697L7.68934 8.5L0.719671 1.53033C0.426777 1.23744 0.426777 0.762563 0.719671 0.46967C1.01256 0.176777 1.48744 0.176777 1.78033 0.46967L9.28033 7.96967Z"
          fill="#0F172A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.2803 7.96967C15.5732 8.26256 15.5732 8.73744 15.2803 9.03033L7.78033 16.5303C7.48744 16.8232 7.01256 16.8232 6.71967 16.5303C6.42678 16.2374 6.42678 15.7626 6.71967 15.4697L13.6893 8.5L6.71967 1.53033C6.42678 1.23744 6.42678 0.762563 6.71967 0.46967C7.01256 0.176777 7.48744 0.176777 7.78033 0.46967L15.2803 7.96967Z"
          fill="#0F172A"
        />
      </svg>
    </button>
  );