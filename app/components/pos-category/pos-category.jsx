'use client'
import {useEffect, useState} from 'react';

export default function PosCategory() {
    const [title, setTitle] = useState('');
    const colors = ["#E8847E", "#0C956F", "#0B5C90", "#C1C712", "#F6B704"];
    const categories = [
        {
            "category": "Whiskey",
            "productTitle": "Jameson",
            "price": 3800,
            "quantity": 1,
            "subtitle": "750ml"
        },
        {
            "category": "Vodka",
            "productTitle": "Grey Goose",
            "price": 3500,
            "quantity": 1,
            "subtitle": "700ml"
        },
        {
            "category": "Rum",
            "productTitle": "Captain Morgan Spiced Rum",
            "price": 2900,
            "quantity": 1,
            "subtitle": "750ml"
        },
        {
            "category": "Gin",
            "productTitle": "Hendrick's Gin",
            "price": 4200,
            "quantity": 1,
            "subtitle": "700ml"
        },
        {
            "category": "Tequila",
            "productTitle": "Jose Cuervo Gold",
            "price": 3100,
            "quantity": 1,
            "subtitle": "750ml"
        },
        {
            "category": "Wine",
            "productTitle": "Chardonnay",
            "price": 2500,
            "quantity": 1,
            "subtitle": "750ml"
        },
        {
            "category": "Beer",
            "productTitle": "Heineken",
            "price": 2400,
            "quantity": 1,
            "subtitle": "500ml"
        },
        {
            "category": "Whiskey",
            "productTitle": "Glenfiddich 12 Year",
            "price": 4800,
            "quantity": 1,
            "subtitle": "750ml"
        },
        {
            "category": "Vodka",
            "productTitle": "Ketel One",
            "price": 3200,
            "quantity": 1,
            "subtitle": "700ml"
        },
        {
            "category": "Rum",
            "productTitle": "Malibu Coconut Rum",
            "price": 2700,
            "quantity": 1,
            "subtitle": "750ml"
        },
        {
            "category": "Gin",
            "productTitle": "Tanqueray",
            "price": 3900,
            "quantity": 1,
            "subtitle": "700ml"
        },
        {
            "category": "Tequila",
            "productTitle": "Don Julio Blanco",
            "price": 4600,
            "quantity": 1,
            "subtitle": "750ml"
        },
        {
            "category": "Wine",
            "productTitle": "Merlot",
            "price": 2600,
            "quantity": 1,
            "subtitle": "750ml"
        },
        {
            "category": "Beer",
            "productTitle": "Stella Artois",
            "price": 2500,
            "quantity": 1,
            "subtitle": "500ml"
        },
        {
            "category": "Whiskey",
            "productTitle": "Laphroaig 10 Year",
            "price": 5200,
            "quantity": 1,
            "subtitle": "750ml"
        },
        {
            "category": "Whiskey",
            "productTitle": "Johnnie Walker Black Label",
            "price": 4500,
            "quantity": 1,
            "subtitle": "750ml"
        },
        {
            "category": "Whiskey",
            "productTitle": "Bushmills Original",
            "price": 3600,
            "quantity": 1,
            "subtitle": "700ml"
        },
        {
            "category": "Whiskey",
            "productTitle": "Wild Turkey 101",
            "price": 4200,
            "quantity": 1,
            "subtitle": "750ml"
        },
        {
            "category": "Whiskey",
            "productTitle": "Evan Williams Single Barrel",
            "price": 5500,
            "quantity": 1,
            "subtitle": "700ml"
        },
        {
            "category": "Whiskey",
            "productTitle": "Knob Creek Bourbon",
            "price": 4900,
            "quantity": 1,
            "subtitle": "750ml"
        },
        {
            "category": "Whiskey",
            "productTitle": "Jack Daniel's Single Barrel",
            "price": 5800,
            "quantity": 1,
            "subtitle": "750ml"
        },
        {
            "category": "Vodka",
            "productTitle": "Belvedere",
            "price": 3800,
            "quantity": 1,
            "subtitle": "700ml"
        },
        {
            "category": "Vodka",
            "productTitle": "Absolut",
            "price": 3200,
            "quantity": 1,
            "subtitle": "750ml"
        },
        {
            "category": "Vodka",
            "productTitle": "Smirnoff",
            "price": 2800,
            "quantity": 1,
            "subtitle": "700ml"
        },
        {
            "category": "Vodka",
            "productTitle": "Tito's Handmade Vodka",
            "price": 3600,
            "quantity": 1,
            "subtitle": "750ml"
        },
        {
            "category": "Vodka",
            "productTitle": "Ciroc",
            "price": 4200,
            "quantity": 1,
            "subtitle": "700ml"
        },
        {
            "category": "Vodka",
            "productTitle": "Ketel One Citroen",
            "price": 3400,
            "quantity": 1,
            "subtitle": "750ml"
        }
    ]

    useEffect(() => {
        const eventListener = (e) => {
          if (e.type === 'getTitle') {
            setTitle(e.detail.title);
          }
        };
    
        window.addEventListener('getTitle', eventListener);
    
        return () => {
          window.removeEventListener('getTitle', eventListener);
        };
    }, []);
    
    const handleCategoryClick = (category) => {
        const customEvent = new CustomEvent('getTitle', {
            detail: { title: category }
        });
        window.dispatchEvent(customEvent);
    };

    const uniqueCategories = Array.from(new Set(categories.map(item => item.category))).map(category => ({ category }));

    const uniqueCategoriesWithCount = uniqueCategories.map(uniqueCategory => {
        const itemCount = categories.filter(item => item.category === uniqueCategory.category).length;
        return { ...uniqueCategory, itemCount };
    });

    return (

        <div className="flex pb-8 border-b-[0.5px] border-acc-color flex-wrap -mx-2 mt-28 md:mt-0">
            {uniqueCategoriesWithCount.map((category, index) => (
            <button key={index} onClick={() => handleCategoryClick(category.category)} className="cursor-pointer w-1/2 md:w-1/4 xl:w-1/6 px-2 mb-4 transform active:scale-75 transition-transform">
                <div style={{ background: colors[index % colors.length] }} className={`text-white font-light flex flex-col justify-between p-6 xl:h-[120px] h-[100px] rounded-lg shadow`}>
                <h4 className="lg:text-[14px] text-left xl:text-[18px] font-bold">{category.category}</h4>
                <p className="text-[12px] text-left">{category.itemCount} items</p>
                </div>
            </button>
            ))}
        </div>
    );
  }