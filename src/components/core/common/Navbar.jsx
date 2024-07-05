import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../../assets/Logo/Logo-Full-Light.png";
import {NavbarLinks} from "../../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { apiConnector } from "../../../services/apiconnector";
import { categories } from "../../../services/api";
import { IoChevronDown } from "react-icons/io5";

const Navbar = () => {
    const sublink = [
        {
            title : "python",
            link : "catalog/python"
        },
        {
            title : "web Dev",
            link : "catalog/web-development"
        }
    ]
    
    const {token} = useSelector(state => state.auth);
    const {totalItems} = useSelector(state => state.cart);
    const {user} = useSelector(state => state.profile);
    const location = useLocation();

    // const [sublink , setsublink] = useState([]);

    // const fetchSublink = async() => {
    //     try{
    //         const result = await apiConnector("GET" , categories.CATEGORIES_API);
    //         console.log("printing sublink list");
    //         setsublink(result.data.data);
    //     }
    //     catch(error) {
    //         console.log("could not fetch sublink");
    //     }
    // }

    // useEffect( () => {
    //     fetchSublink()
    // } , []);


    const matchRoute = (route) => {
        return matchPath({path : route} ,  location.pathname);
    }

    return (
           
    <div className={` flex sm:relative bg-richblack-900 w-screen relative z-50 h-14 items-center justify-center border-b-[1px] border-b-richblack-700 translate-y-  transition-all duration-500`}>
     <div className="flex w-11/12 max-w-maxContent items-center justify-between" >
        <Link to= "/"> 
           <img src= {logo} width={160} height={42} loading="lazy" alt="logoimg"/>
        </Link>

        <nav>
            <ul className="flex gap-x-6 text-richblack-25">
                {
                    NavbarLinks.map( (link , index) => (
                        <li key={index}>
                        {
                           link.title === "Catalog" ? (
                           <div className="flex gap-2 items-center group relative">
                            <p>{link.title}</p>
                            <IoChevronDown />

                            <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">

                            <div className= 'absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5'></div>

                             {
                                sublink.length ? (
                                sublink.map((sublink , index) => (
                                     <Link to={`${sublink.link}`} key={index}>
                                        <p className="justify-center items-center translate-x-[10%] pt-2 pb-2 text-lg">{sublink.title}</p>
                                     </Link>
                                ))
                            ) : ( <div></div> )
                             }

                            </div>
                           </div>
                        ) : (
                             <Link to={link?.path}>
                                <p className= {`${matchRoute(link?.path) ? "text-yellow-25" : 
                                 "text-richblack-25"}`}>
                                {link.title}
                                </p>
                               
                             </Link>
                           )
                        }
                        </li>
                        
                    ))
                }
            </ul>
           

        </nav>

        {/* login signup button */}
        <div className="flex gap-x-4 items-center">
            {
                user && user?.accountType !== "Instructor" && (
                    <Link to= "/dashboard/cart">
                        <AiOutlineShoppingCart />
                        {
                            totalItems > 0 && (
                                <span> {totalItems} </span>
                            )
                        }
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to= "/login">
                    <button className= 'border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                        Login
                    </button>
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to= "/signup">
                    <button className= 'border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                        Sign up
                    </button>
                    </Link>
                )
            }
        </div>
     </div>
    </div>
    )
}

export default Navbar;