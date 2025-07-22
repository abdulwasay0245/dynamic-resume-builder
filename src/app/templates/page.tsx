import React from "react";

const TemplateSelector = () => {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Public Sans", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f5] px-10 py-3">
          <div className="flex items-center gap-4 text-[#111418]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">
              ResumeCraft
            </h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f0f2f5] text-[#111418] gap-2 text-sm font-bold px-2.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
            </button>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB_S8Zbf1X3NSemL9sKd6yM5mjGTIw-NzRkuElsw8Mw6PCQDqc-wx9qVyQvnc-L7dNH_FR2NbXvfMeEMhKt3foaF43JVOFh7BkcJamxzBj9AJSqIIjozEL5IqFZVbX3ffTFfniuFG5vaHUaopMfcW8wk9fXUxmsxB6CzVv1Rk4mYzGPBwG2v2TncptmrvSzUAJidKu9QwOEh1d9ogmqoXs9JcKevepwZXHzeqOCEyalKQbksvJN9r1vwZzd4VwLfF0yoslcemPJ1_aC')",
              }}
            ></div>
          </div>
        </header>

        {/* Template Section */}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 flex-1">
            <h2 className="text-[#111418] text-[28px] font-bold text-center pb-3 pt-5">
              Choose a template
            </h2>
            <p className="text-[#111418] text-base font-normal text-center pb-3 px-4">
              Select a template that best represents your professional experience and aspirations.
              Each template is designed to highlight your skills and achievements effectively.
            </p>

            {/* Grid of Templates */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              {[
                "https://lh3.googleusercontent.com/aida-public/AB6AXuC-vbym9xcpT5MiNGAsIkeK_cXyxtu6zdzy9U5nwiksLuUEtPmmcVCUN0bd6gAx49ICUEzJ2LHuI6rHZ9qFv-i3I5FSkhR63TCKRWJCrqyIOYnfNUOaw5PZpGd8cFh98qwwffXRI5M0Z4OCmKCp5a-y7NwziV6PiSdi0JmBYfHWUSWYnJ5fImgKi8KdfaelCmzxbhPvkpoL7AuYFOXk2Kad1IpeI7z-01UeyqN88-GY_fMqCJ6LbmdBSmBFRqYICYMF21DmO0STzf8A",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuACsC2ymto75YWdnfYrhGUmvpR6fx7QMgdEzio4HtWoozN5ES8nxQH-NG198uoaGY_WiH_jGszg1DuHs9xS1ppEWk1dEz605gt-YfL9T6nEQ8vpGHpiIwgFGuvGyyVEJ6Xcf3uqNoGqhMCNyPO-q5ligmEd65pk0aRU75ENY_fILKL6Swsm61k008L7YK74BahHeXryfNY7qHE4HpLZ4Iuq5m4I8oMBI-4RA013m_OPyc8AXzz0WhHlIq8QF4_9tl0b6ZQg4sRRw5JC",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBoU5uzhuSsJAbEklq0nBKQg1qf85W0IsV6KIaSf3Og5JSMPEWjaQpeqpztE8QCarwzxbOqZ1-HwEJmexoAIMTlURXG4klrAgL0Lnr84xRzjMCaccHnfmhUvBYRw0jwg1H4greg-GZ-rhDRXHoz3BndEQG7z8bGWaK8NLbgWr-MnrPAG320zU64PKuygMKULCG8fKiU68siu-rKLvn_Sb4rjnNPVvnsgnONwERvmujTw3IueMUlfBQimO4oBGgq_fdW_LjZadT6ei1H",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAEqzs2MEY_1rRSaODlHOoTkYD_TTJgGMnJVZe4n89-fwger1N0BBi5IdRS9W0D6mUwUQA31AxC64i4IVhTdlwPm8fSHKIcWqkBe3lI-LAWAoYIMb33XLDeL1d8P82nI5a2f5XkX7sOP5uosogXYRIb5QystftBUEqeEYuXImpqA0jUlqdcTBcGA_c7GEkUBzkES9lUoJbqWelM4mQwr-s0RXZrYnb0x451qtpETzIk6YZCUxVw7QwNur1vxyVW4SmjeZAiJOUOaU22",
              ].map((url, index) => (
                <div key={index} className="flex flex-col gap-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-lg"
                    style={{ backgroundImage: `url('${url}')` }}
                  ></div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center">
              <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 max-w-[480px] justify-center">
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-bold grow">
                  Preview
                </button>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#3680f6] text-white text-sm font-bold grow">
                  Select
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
