type PrimaryBtnType = {
  btnText: string;
};

function PrimaryBtn({ btnText }: PrimaryBtnType) {
  return (
    <button
      className={`bg-primary text-background font-bold rounded-4xl px-4 py-2 hover:bg-primary-700 transition-all ease-in-out`}
    >
      {btnText}
    </button>
  );
}

export default PrimaryBtn;
