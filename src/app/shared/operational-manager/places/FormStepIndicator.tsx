"use client";

const FormStepIndicator = ({
  formStep,
  STEPS,
}: {
  formStep: number;
  STEPS: any;
}) => {
  const lineWidth = STEPS.length === 2 ? " w-1/3" : "w-[3%] md:w-[23%]";
  return (
    <article className="flex justify-between items-center">
      <section
        className={
          STEPS.length === 2
            ? "flex flex-col md:flex-row justify-center items-center gap-4 w-1/3 md:w-1/5 "
            : "flex flex-col md:flex-row justify-center items-center gap-4 w-[31.33%] md:w-[18%] "
        }
      >
        <p
          className={
            formStep >= 1
              ? "text-xl  w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-[#008579] to-[#00BA63] text-white font-medium flex justify-center items-center"
              : "text-xl  w-8 h-8 md:w-12 md:h-12 rounded-full border  text-black font-medium flex justify-center items-center"
          }
        >
          {1}
        </p>
        <div>
          <p className="font-medium text-sm md:text-lg">{STEPS[0].title}</p>
          <p className="text-xs md:text-base">{STEPS[0].subTitle}</p>
        </div>
      </section>

      {STEPS[1] && (
        <>
          <div
            className={
              formStep > 1
                ? " border-t border-black" + lineWidth
                : " border-t border-black" + lineWidth
            }
          />

          <section
            className={
              STEPS.length === 2
                ? "flex flex-col md:flex-row justify-center items-center gap-4 w-1/3 md:w-1/5 "
                : "flex flex-col md:flex-row justify-center items-center gap-4 w-[31.33%] md:w-[18%] "
            }
          >
            <p
              className={
                formStep >= 2
                  ? "text-xl  w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-[#008579] to-[#00BA63] text-white font-medium flex justify-center items-center"
                  : "text-xl  w-8 h-8 md:w-12 md:h-12 rounded-full border  text-black font-medium flex justify-center items-center"
              }
            >
              {2}
            </p>
            <div>
              <p className="font-medium text-sm md:text-lg">{STEPS[1].title}</p>
              <p className="text-xs">{STEPS[1].subTitle}</p>
            </div>
          </section>
        </>
      )}

      {STEPS[2] && (
        <>
          <div
            className={
              formStep > 2
                ? " border-t border-black" + lineWidth
                : " border-t border-black" + lineWidth
            }
          />

          <section
            className={
              STEPS.length === 2
                ? "flex flex-col md:flex-row justify-center items-center gap-4 w-1/3 md:w-1/5 "
                : "flex flex-col md:flex-row justify-center items-center gap-4 w-[31.33%] md:w-[18%] "
            }
          >
            <p
              className={
                formStep >= 3
                  ? "text-xl  w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-[#008579] to-[#00BA63] text-white font-medium flex justify-center items-center"
                  : "text-xl  w-8 h-8 md:w-12 md:h-12 rounded-full border  text-black font-medium flex justify-center items-center"
              }
            >
              {3}
            </p>
            <div>
              <p className="font-medium text-sm md:text-lg">{STEPS[2].title}</p>
              <p className="text-xs">{STEPS[2].subTitle}</p>
            </div>
          </section>
        </>
      )}
    </article>
  );
};

export default FormStepIndicator;
