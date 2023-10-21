'use client'

export default function PosCategory() {
    const colors = ["#E8847E", "#0C956F", "#0B5C90", "#C1C712", "#F6B704"];
    const categories = [
        {
            title: "Wines",
            quantity: "69",
        },
        {
            title: "Beers",
            quantity: "45",
        },
        {
            title: "Whisky",
            quantity: "12",
        },
        {
            title: "Brandy",
            quantity: "9",
        },
        {
            title: "Gin and Genever",
            quantity: "64",
        }
    ]
    return (
      <div className="flex pb-8 border-b-[0.5px] border-acc-color flex-wrap -mx-2">
        {categories.map((category, index) => (
          <a key={index} className="w-full cursor-pointer sm:w-1/2 md:w-1/2 lg:w-1/4 px-2 mb-4">
            <div style={{ background: colors[index % colors.length] }} className={`text-white font-light flex flex-col justify-between p-6 h-[133px] rounded-lg shadow`}>
              <h4 className="text-[18px] font-bold">{category.title}</h4>
              <p className="text-[12px]">{category.quantity} items</p>
            </div>
          </a>
        ))}
      </div>
    );
  }