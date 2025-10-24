import React from "react";

const categories = [
   { name: "T-Shirts", img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600" },

   { name: "Jackets", img: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amFja2V0fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600" },

   { name: "Shirt", img: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fFNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600" },

   { name: "Jeans", img: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEplYW5zfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600" },

   { name: "Bag", img: "https://plus.unsplash.com/premium_photo-1678739395192-bfdd13322d34?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmFnfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600" },

   { name: "Shoes", img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U2hvZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600" },

   { name: "Watches", img: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2F0Y2hlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600" },

   { name: "Caps", img: "https://plus.unsplash.com/premium_photo-1677405099651-53669fdee9df?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Q2FwfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600" },

   { name: "All Categories", img: "https://cdn.pixabay.com/photo/2021/10/11/23/49/app-6702045_640.png" },
];

const Category = () => {
   return (
      <div className="max-w-9xl mx-auto px-6 mt-5">
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-8">
            {categories.map((category, index) => (
               <div
                  key={index}
                  className="group flex flex-col items-center cursor-pointer"
               >
                  <div className="relative w-20 h-20 mb-3">
                     <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-purple-200/50"></div>
                     <div className="absolute inset-0.5 bg-white rounded-2xl overflow-hidden transform transition-all duration-300 group-hover:scale-105">
                        <img
                           src={category.img}
                           alt={category.name}
                           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                     </div>
                     <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-800 text-center transition-colors duration-300 group-hover:text-purple-600">
                     {category.name}
                  </span>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Category;
