import Btn from "./Btn";

function HeroBlog({
  P_BtnText,
  H_Text,
  M_Text,
  isSBtnShow = false,
  S_BtnText = "",
  onpress,
}) {
  const formattedText =
    M_Text.charAt(0).toUpperCase() + M_Text.slice(1).toLowerCase();

  return (
    <div className="w-[100%] h-auto md:h-[500px] bg-[url(/herobg.svg)] bg-cover bg-center flex flex-col items-center justify-center gap-4 py-6 md:py-8 md:gap-5 px-4">
      <span className="w-[90%] md:w-[70%] lg:w-[60%] text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-semibold text-center leading-[2.5rem] sm:leading-[3rem] md:leading-[4rem] lg:leading-[4.5rem] break-words capitalize">
        {H_Text}
      </span>

      <p className="w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]  mx-auto text-center font-inter text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 capitalize">
        {formattedText}
      </p>

      {isSBtnShow ? <Btn btnName={S_BtnText} onpress={onpress} /> : null}
    </div>
  );
}

export default HeroBlog;
