'use client'
import React from 'react';
import Header from '../component/Header';
import Form from '../component/Form';


const ResumeBuilder = () => {
  

 
  

  //  ['--checkbox-tick-svg']: "url('data:image/svg+xml,%3csvg viewBox=\'0 0 16 16\' fill=\'rgb(255,255,255)\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3cpath d=\'M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z\'/%3e%3c/svg%3e')",
  return (
    
    <div
    className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
    style={{
       
        fontFamily: 'Public Sans, Noto Sans, sans-serif'
      }}
    >
      {/* Layout Container */}
      <div className="layout-container flex h-full grow flex-col">

        {/* Header */}
      <Header />

        {/* Form and Template Section */}
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          
          {/* Form Section */}
         <Form/>

          {/* Template & Preview Section */}
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">

            {/* Tabs */}
            <div className="pb-3">
              <div className="flex border-b border-[#dbdfe6] px-4 gap-8">
                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-[#111418] text-[#111418] pb-[13px] pt-4" href="#">
                  <p className="text-[#111418] text-sm font-bold">Template 1</p>
                </a>
                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#60708a] pb-[13px] pt-4" href="#">
                  <p className="text-[#60708a] text-sm font-bold">Template 2</p>
                </a>
                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#60708a] pb-[13px] pt-4" href="#">
                  <p className="text-[#60708a] text-sm font-bold">Template 3</p>
                </a>
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center gap-4 bg-white px-4 min-h-14 justify-between">
              <p className="text-[#111418] text-base font-normal truncate">Light Theme</p>
              <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full bg-[#f0f2f5] p-0.5 has-[:checked]:justify-end has-[:checked]:bg-[#3680f6]">
                <div
                  className="h-full w-[27px] rounded-full bg-white"
                  style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 0px 3px 8px, rgba(0, 0, 0, 0.06) 0px 3px 1px' }}
                ></div>
                <input type="checkbox" className="invisible absolute" />
              </label>
            </div>

            {/* Resume Preview */}
            <div className="p-4">
              <div className="flex flex-col xl:flex-row gap-6">
                <div
                  className="w-full xl:w-1/2 bg-cover bg-center aspect-video rounded-lg"
                  style={{
                    backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC4PNIAMHg3YQ6iaJmqo2mzM66TgFbP8w7Ee2D2Pyjh9_NGm6MpDKdd1Fgz3DbbYQfP8kOBYSyMk_-T2T_Cmii862pdwPhAT7E1RmvzwfUYEVdD7YN6CcvA4GfSMo6PvddfSs01a0CN84eeqU2aUdkkaxXRq0IANXFCajjXzdb6p_yLValk7N4I7z_5qVYIFuCfFzmkWzgl21LbCRx3mq3SlinerdAqbXB8KJrZupxJBa0QmegzDIQA3mtLYwjfmMf7wzECO7i_3QS6')"
                  }}
                ></div>
                <div className="flex-1 flex flex-col justify-center gap-2">
                  <p className="text-lg font-bold text-[#111418]">Resume Preview</p>
                  <p className="text-base text-[#60708a]">This is a live preview of your resume. Update the fields on the left to see changes.</p>
                </div>
              </div>
            </div>

          </div> 

        </div> 

      </div> 
    </div>
  );
};

export default ResumeBuilder;