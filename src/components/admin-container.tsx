import React from 'react'

type Props = {
    children: React.ReactNode;
}

const AdminContainer = ({children}: Props) => {
  return (
    <div className='w-full px-[100px] mt-16'> 
    {/* Not adding any padding, children will handle that */}
      {children}
    </div>
  )
}

export default AdminContainer