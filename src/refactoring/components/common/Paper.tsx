import { ReactNode } from 'react';

type PaperProps =  {
    children: ReactNode;
}

function Paper({ children }: PaperProps)  {
   return ( 
        <div className="bg-white p-3 rounded shadow">{children}</div>)
}

export default Paper;