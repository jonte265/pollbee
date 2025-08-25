type PrimaryBtnType = {
  btnText: string;
};

function PrimaryBtn({ btnText }: PrimaryBtnType) {
  return (
    <button className='bg-primary rounded px-4 py-2 hover:bg-primary-300 transition-all ease-in-out'>
      {btnText}
    </button>
  );
}

export default PrimaryBtn;
