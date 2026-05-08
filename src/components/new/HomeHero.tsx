import Btn from "../Btn";

function HomeSecction({
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
    <div className="w-full bg-[url(/assets/Background.svg)] bg-cover bg-center py-38 px-4">
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto gap-10">
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
          <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.0rem] font-semibold leading-tight capitalize">
            <span className="text-[#74B8B9]"> {" " + " "} </span>
            <br />
            <b>Zahid Pharmacy</b>
          </h2>
          <p className="font-inter text-base sm:text-lg md:text-xl text-gray-700 capitalize max-w-xl">
            {formattedText}
          </p>
          {isSBtnShow && (
            <Btn
              btnName={S_BtnText}
              onPress={() => {
                window.location.href = "/user/contact";
              }}
            />
          )}
        </div>

        <div className="flex-1">
          <img
            src="/assets/medicine.svg"
            alt="Descriptive alt"
            className="w-full max-w-xl mx-auto lg:mx-0 "
          />
        </div>
      </div>
    </div>
  );
}

export default HomeSecction;
