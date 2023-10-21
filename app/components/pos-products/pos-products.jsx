import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function PosProduct() {
    const [products, setProducts] = useState([
        {
            title: "Grey Goose",
            subtitle: 750,
            price: 3240,
            quantity: 1 
        },
        {
            title: "Grey Goose",
            subtitle: 750,
            price: 3240,
            quantity: 1
        },
    ]);

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
        {products.map((product, index) => (
          <div key={index} className="w-full cursor-pointer sm:w-1/2 md:w-1/2 lg:w-1/4 px-2 mb-4">
            <div className={`font-light bg-white flex flex-col justify-between p-6 h-[140px] rounded-lg shadow`}>
                <div>
                    <h4 className="text-[18px] text-acc-color-2 font-bold pb-1">{product.title}</h4>
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
    );
}