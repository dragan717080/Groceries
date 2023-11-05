import { FC } from 'react';
import { StringObject } from '@/app/interfaces/types';
import { footerItems, socialsSvgPaths } from '@/app/constants';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const Footer: FC = () => {
  const session = useSession();

  return (
    <footer className='bg-gray-600 py-5 px-4 md:px-10 xl:px-[15rem] 2xl:px-[18rem]'>
      <div className="w-full text-white">
        <div className="grid sm:grid-cols-1 md:grid-cols-3 mb-5">
          <div className="md:w-full lg:w-full w-full sm:w-1/2 xl:w-fit px-8 py-6">
            <ul className="space-y-4">
              {footerItems.mainColumn.map((item, index) => (
                <div className="nav-link hover:text-red-400 pointer" key={index} >{item}</div>
              ))}
            </ul>
          </div>
          <div className="md:w-full lg:w-full w-full sm:w-1/2 xl:w-fit px-8 py-6">
            <ul className="space-y-4">
              {footerItems.secondColumn.map((item, index) => (
                <div className="nav-link hover:text-red-400 pointer" key={index} >{item}</div>
              ))}
            </ul>
          </div>
          <div className="md:w-full lg:w-full sm:px-10 py-6 sm:py-12 w-full sm:w-1/2 xl:w-[22rem] space-y-4 border-[#DDDDDD] px-8">
            <h5 className="text-sm font-medium focus:outline-none focus:shadow-outline px-0">Newsletter</h5>
            <p className="text-sm focus:outline-none focus:shadow-outline px-0">
              Stay in the loop
            </p>
            <div className="flex items-center space-x-2">
              <input type="text" className="w-full px-2 py-4 sm:py-3 rounded-lg sm:rounded-md text-sm focus:outline-none border border-[#AAAAAA] placeholder-[#888] text-[#333]" placeholder="Enter your email" />
              <button className="bg-blue-gradient px-4 py-4 sm:py-3 rounded-md text-white hover:shadow-md transition duration-300">
                <span aria-hidden="true" role="img" className="material-design-icon arrow-right-icon"><svg fill="currentColor" width="20" height="20" viewBox="0 0 24 24" className="material-design-icon__svg"><path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path></svg></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* For small screens */}
      <div className='md:hidden px-3'>
        <div className='col-h space-y-4'>
          <div className="row-h space-x-4">
            {Object.keys(socialsSvgPaths).map((socialIcon: keyof typeof socialsSvgPaths, index: number) => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className='h-6 w-6 fill-red-400 hover:fill-sky-500 transition transform duration-500 pointer hover:-mt-1'
                viewBox="0 0 24 24"
                key={index}
              >
                <path d={socialsSvgPaths[socialIcon]} />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <div className='hidden md:block'>
        <div className='px-7'>
          <div className='col-h space-y-4'>
            <div className="row-h space-x-4">
              {Object.keys(socialsSvgPaths).map((socialIcon: keyof typeof socialsSvgPaths, index: number) => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className='h-6 w-6 fill-red-400 hover:fill-sky-500 transition transform duration-500 pointer hover:-mt-1'
                  viewBox="0 0 24 24"
                  key={index}
                >
                  <path d={socialsSvgPaths[socialIcon]} />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
