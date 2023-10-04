'use client'
import React from 'react'
import Console from '../tempates/console/console'
import ButtonWithIcon from '../components/buttons/button-with-icon/button-with-icon'
import { PlusIcon } from '@heroicons/react/24/outline';
import Card from '../components/card/card';
import { InboxArrowDownIcon} from '@heroicons/react/24/outline';
import Table from '../components/table/table';

export default function Inventory() {
  const handleClick = () => {
    console.log("Button clicked!");
  }
  return (
    <Console>
      <div className="p-5">
        <ButtonWithIcon Icon={PlusIcon} href="/new-inventory" text={'New Inventory'} onClick={handleClick}/>
        <Card Icon={InboxArrowDownIcon} title='Inventory Management'>
          <Table />
        </Card>
      </div>
    </Console>
  )
}
