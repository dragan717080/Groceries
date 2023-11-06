import { FC } from 'react';

interface HeaderMenuToolbarProps {
  isOpen: boolean;
}

const HeaderMenuToolbar: FC<HeaderMenuToolbarProps> = ({ isOpen }) => {
  return (
    <div
      className={`absolute rounded-lg bg-gray-200 py-4 px-7 left-[-8.125rem] transition-transform duration-500
      ${isOpen ? 'top-12' : 'translate-down-gradually'}`
    }
    >
      <ul className='gradient-title-alt'>
        {['Locations', 'Careers', 'News'].map((item, index) => (
          <li key={index} className='gradient-title-alt'>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HeaderMenuToolbar;
