import { ReactNode } from 'react';

type HeaderProps =  {
    children: ReactNode;
}

function Header({ children }: HeaderProps)  {
   return ( <div className="header">
        <h2 className="text-2xl font-semibold mb-4">{children}</h2>
    </div>)
}

export default Header;