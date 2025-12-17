import React from "react";
import { Link } from "react-router";

const categories = [
   {
      name: "T-Shirts",
      slug: "t-shirts",
      img: "https://i.pinimg.com/736x/f9/05/51/f90551cccf38faf68455cc54a49dd24d.jpg"
   },
   {
      name: "Jackets",
      slug: "jackets",
      img: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=60&w=600"
   },
   {
      name: "Shirts",
      slug: "shirts",
      img: "https://i.pinimg.com/736x/60/21/f0/6021f0ea35722e7eea699fe765efe243.jpg"
   },
   {
      name: "Jeans",
      slug: "jeans",
      img: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&q=60&w=600"
   },
   {
      name: "Bags",
      slug: "bags",
      img: "https://plus.unsplash.com/premium_photo-1678739395192-bfdd13322d34?auto=format&fit=crop&q=60&w=600"
   },
   {
      name: "Shoes",
      slug: "shoes",
      img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=60&w=600"
   },
   {
      name: "Watches",
      slug: "watches",
      img: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?auto=format&fit=crop&q=60&w=600"
   },
   {
      name: "Caps",
      slug: "caps",
      img: "https://plus.unsplash.com/premium_photo-1677405099651-53669fdee9df?auto=format&fit=crop&q=60&w=600"
   },
   {
      name: "All Categories",
      slug: "all",
      img: "https://cdn.pixabay.com/photo/2021/10/11/23/49/app-6702045_640.png"
   }
];


const Category = () => {
   return (
      <div className="max-w-9xl mx-auto px-6 mt-5">
         <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 md:gap-8 gap-8">
            {categories.map((category, index) => (
               <Link to={`/category/${category.slug}`} key={index}>
                  <div className="group flex flex-col items-center cursor-pointer">
                     <div className="relative w-20 h-20 mb-3">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-purple-200/50"></div>
                        <div className="absolute inset-0.5 bg-white rounded-2xl overflow-hidden transform transition-all duration-300 group-hover:scale-105">
                           <img
                              src={category.img}
                              alt={category.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                           />
                        </div>
                     </div>
                     <span className="text-sm font-semibold text-gray-800 text-center transition-colors duration-300 group-hover:text-purple-600">
                        {category.name}
                     </span>
                  </div>
               </Link>
            ))}
         </div>
      </div>
   );
};

export default Category;
