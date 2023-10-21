import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

export default function PosProduct() {
    const [products, setProducts] = useState([
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
    ]);

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        const handleTitleChange = (e) => {
            setTitle(e.detail.title);
        };

        window.addEventListener('getTitle', handleTitleChange);

        return () => {
            window.removeEventListener('getTitle', handleTitleChange);
        };
    }, []);

    useEffect(() => {
        const filtered = products.filter(product => product.category === title);
        setFilteredProducts(filtered);
    }, [title, products]);

    const handleCartProduct = (product) => {
        const updateProduct = [...selectedProducts, product];
        setSelectedProducts(updateProduct);

        const cartUpdateEvent = new CustomEvent('addToCart', {
            detail: {product: updateProduct},
        });
        
        window.dispatchEvent(cartUpdateEvent);
    }

    const qtyIncrement = (index) => {
        const updatedProducts = [...products];
        updatedProducts[index].quantity += 1;
        setProducts(updatedProducts);
    }
    
    const qtyDecrement = (index) => {
        const updatedProducts = [...products];
        if (updatedProducts[index].quantity > 1) {
            updatedProducts[index].quantity -= 1;
            setProducts(updatedProducts);
        }
    }

    return (
        <div className="flex pt-8 flex-wrap -mx-2">
          {filteredProducts.length === 0 ? (
                <p className="text-acc-color text-center w-full">Choose a category.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {filteredProducts.map((product, index) => (
                        <div key={index} className="cursor-pointer" onClick={() => handleCartProduct(product)}>
                            <div className={`font-light bg-white flex flex-col justify-between p-6 h-[140px] rounded-lg shadow`}>
                                <div>
                                    <h4 className="text-[18px] text-acc-color-2 font-bold pb-1">{product.productTitle}</h4>
                                    <p className="text-[12px] text-acc-color-2 font-light">Ksh. {product.price}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-[12px] text-acc-color-2 flex items-center">
                                        <span className="mr-2">{product.subtitle}</span>
                                    </p>
                                    <div className="flex text-[12px] items-center">
                                        <a onClick={() => qtyIncrement(index)} className="bg-acc-btn p-1 rounded-sm">
                                            <PlusIcon className="h-5 w-5 text-acc-color text-[8px]" />
                                        </a>
                                        <p className="text-[14px] px-3">{product.quantity}</p>
                                        <a onClick={() => qtyDecrement(index)} className="bg-acc-btn p-1 rounded-sm">
                                            <MinusIcon className="h-5 w-5 text-acc-color text-[8px]" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}