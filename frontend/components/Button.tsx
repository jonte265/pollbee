type PrimaryBtnType = {
  btnText: string;
  onClick?: () => void;
};

export default function Button({ btnText, onClick }: PrimaryBtnType) {
  return (
    <button
      onClick={onClick}
      className={`bg-primary text-background font-bold rounded-4xl px-4 py-2 hover:bg-primary-700 transition-all ease-in-out`}
    >
      {btnText}
    </button>
  );
}
