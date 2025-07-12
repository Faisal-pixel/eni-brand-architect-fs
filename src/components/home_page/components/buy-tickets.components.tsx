import { CalendarTopBarLogo, XCloseBuyYourTicketIcon } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react'

// type Props = {}

const BuyTicketsComponent = () => {
  return (
    <>
        <div className="bg-[rgba(105,65,198,1)] text-white py-3 px-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between ">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <Image
              src={CalendarTopBarLogo}
              alt="calendar-logo"
              className="hidden md:block w-[48px] h-[48px]"
            />

            <div className="flex flex-col">
              <span className="text-base font-semibold">
                Explore the future of branding, storytelling, and digital impact
                in an inspiring live experience.
              </span>
              <span className="text-[rgba(233,215,254,1)] leading-6">
                October 12-14, 2024 • Lekki Phase 1, Lagos, Nigeria
              </span>
            </div>

            <Image
              src={XCloseBuyYourTicketIcon}
              alt="Close Ticket Icon"
              className="inline-block md:hidden cursor-pointer self-start"
            />
          </div>
          <Button className="px-4 py-[10px] bg-white text-black cursor-pointer hover:bg-white">
            Buy your Ticket
          </Button>
        </div>
      </div>
    </>
  )
}

export default BuyTicketsComponent;