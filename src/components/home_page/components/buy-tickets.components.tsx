import { CalendarTopBarLogo, XCloseBuyYourTicketIcon } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

// type Props = {}

const BuyTicketsComponent = () => {
  const buyYourTicketUrl = "https://forms.gle/8bGKXFwRTf29TNhB7"; // Replace with the actual URL
  const [shouldShowTicketComponent, setShouldShowTicketComponent] = useState(true);

  const handleClose = () => {
    // Logic to close the ticket component
    setShouldShowTicketComponent(false);
  };
  return (
    <>
        <div className={`bg-[rgba(105,65,198,1)] text-white py-3 px-5 ${shouldShowTicketComponent ? 'block' : 'hidden'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between ">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <Image
              src={CalendarTopBarLogo}
              alt="calendar-logo"
              className="hidden md:block w-[48px] h-[48px]"
            />

            <div className="flex flex-col">
              {/* <span className="text-base font-semibold">
                Explore the future of branding, storytelling, and digital impact
                in an inspiring live experience.
              </span> */}
              <span className="text-base font-semibold">
                The Eniivy Experience (Sip & Share Edition)
              </span>
              <span className="text-[rgba(233,215,254,1)] leading-6">
                See you in November...
              </span>
            </div>

            <Image
              src={XCloseBuyYourTicketIcon}
              alt="Close Ticket Icon"
              className="inline-block ml-auto md:hidden cursor-pointer self-start"
              onClick={handleClose}
            />
          </div>
          <Link href={buyYourTicketUrl} className='w-full md:w-auto' target='_blank' rel='noopener noreferrer'>
            <Button className="px-4 py-[10px] w-full bg-white text-black cursor-pointer hover:bg-white">
              Buy your Ticket
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default BuyTicketsComponent;