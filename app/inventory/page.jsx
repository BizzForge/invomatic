'use client'
import React from 'react'
import Console from '../tempates/console/console'
import ButtonWithIcon from '../components/buttons/button-with-icon/button-with-icon'
import { PlusIcon } from '@heroicons/react/24/outline';
import Card from '../components/card/card';
import { InboxArrowDownIcon} from '@heroicons/react/24/outline';
import Table from '../components/table/table';

export default function Inventory() {
  const jsonData = {
    titles: ['Product Code', 'Product Name', 'Category', 'Quantity', 'Price', 'Added Date', 'Expiry Date'],
    data: [
      {
        id: 1,
        productCode: 'ABC123',
        productName: 'Product 1',
        category: 'Electronics',
        quantity: 5,
        price: '$499.99',
        addedDate: '2023-10-05',
        expiryDate: '2024-10-05',
      },
      {
        id: 2,
        productCode: 'XYZ789',
        productName: 'Product 2',
        category: 'Clothing',
        quantity: 10,
        price: '$199.99',
        addedDate: '2023-09-15',
        expiryDate: '2024-09-15',
      },
      {
        id: 3,
        productCode: 'XYZ789',
        productName: 'Product 2',
        category: 'Clothing',
        quantity: 10,
        price: '$199.99',
        addedDate: '2023-09-15',
        expiryDate: '2024-09-15',
      },
      {
        id: 3,
        productCode: 'XYZ789',
        productName: 'Product 2',
        category: 'Clothing',
        quantity: 10,
        price: '$199.99',
        addedDate: '2023-09-15',
        expiryDate: '2024-09-15',
      },
      {
        id: 3,
        productCode: 'XYZ789',
        productName: 'Product 2',
        category: 'Clothing',
        quantity: 10,
        price: '$199.99',
        addedDate: '2023-09-15',
        expiryDate: '2024-09-15',
      },
      {
        id: 3,
        productCode: 'XYZ789',
        productName: 'Product 2',
        category: 'Clothing',
        quantity: 10,
        price: '$199.99',
        addedDate: '2023-09-15',
        expiryDate: '2024-09-15',
      },
      {
        id: 3,
        productCode: 'XYZ789',
        productName: 'Product 2',
        category: 'Clothing',
        quantity: 10,
        price: '$199.99',
        addedDate: '2023-09-15',
        expiryDate: '2024-09-15',
      },
      {
        id: 3,
        productCode: 'XYZ789',
        productName: 'Product 2',
        category: 'Clothing',
        quantity: 10,
        price: '$199.99',
        addedDate: '2023-09-15',
        expiryDate: '2024-09-15',
      },
      {
        id: 3,
        productCode: 'XYZ789',
        productName: 'Product 2',
        category: 'Clothing',
        quantity: 10,
        price: '$199.99',
        addedDate: '2023-09-15',
        expiryDate: '2024-09-15',
      },
      {
        id: 3,
        productCode: 'XYZ789',
        productName: 'Product 2',
        category: 'Clothing',
        quantity: 10,
        price: '$199.99',
        addedDate: '2023-09-15',
        expiryDate: '2024-09-15',
      },
      {
        id: 3,
        productCode: 'XYZ789',
        productName: 'Product 2',
        category: 'Clothing',
        quantity: 10,
        price: '$199.99',
        addedDate: '2023-09-15',
        expiryDate: '2024-09-15',
      },
      {
        id: 3,
        productCode: 'XYZ789',
        productName: 'Product 2',
        category: 'Clothing',
        quantity: 10,
        price: '$199.99',
        addedDate: '2023-09-15',
        expiryDate: '2024-09-15',
      },
      {
        id: 3,
        productCode: 'XYZ789',
        productName: 'Product 2',
        category: 'Clothing',
        quantity: 10,
        price: '$199.99',
        addedDate: '2023-09-15',
        expiryDate: '2024-09-15',
      },
      {
        id: 3,
        productCode: 'XYZ789',
        productName: 'Product 2',
        category: 'Clothing',
        quantity: 10,
        price: '$199.99',
        addedDate: '2023-09-15',
        expiryDate: '2024-09-15',
      },
      {
        id: 3,
        productCode: 'XYZ789',
        productName: 'Product 2',
        category: 'Clothing',
        quantity: 10,
        price: '$199.99',
        addedDate: '2023-09-15',
        expiryDate: '2024-09-15',
      },
    ],
  };
  const handleClick = () => {
    console.log("Button clicked!");
  }
  return (
    <Console>
      <div className="p-5">
        <ButtonWithIcon Icon={PlusIcon} href="/new-inventory" text={'New Inventory'} onClick={handleClick}/>
        <Card Icon={InboxArrowDownIcon} title='Inventory Management'>
          <Table jsonData={jsonData} />
        </Card>
      </div>
    </Console>
  )
}
