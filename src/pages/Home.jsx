import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/Button';
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import Footer from '../components/core/common/Footer'
import ExploreMore from '../components/core/HomePage/ExlporeMore';

const Home = () => {
  return (
    <div className='w-screen'>
        {/* section 1 */}

        <div className='mx-auto relative flex flex-col w-11/12 items-center justify-between text-white'>

            <Link to={"/signup"} >

                <div className= "group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                     group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>

            <div className= "text-center text-4xl font-semibold mt-7">
                Empower Your Future with
                <HighlightText text = {"Coding Skills"}/>
            </div>

            <div className='mt-4 w-[80%] text-center text-lg font-bold text-richblack-300 '>
                with your online coding courses, you can learn your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes and personalized feedback from instructor.
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active = {true} linkto={"/signup"}>
                   Learn More
                </CTAButton>

                <CTAButton active = {false} linkto={"/login"}>
                    Book a Demo
                </CTAButton>
            </div>

            <div className = 'shadow-blue-200 mx-3 px-auto my-12 mx-auto w-11/12'>
                <video
                muted
                loop
                autoPlay
                className='w-full'
                >
                <source src={Banner} type='video/mp4'/>
                </video>
            </div>

            {/* Code Section 1 */}
            <div className='w-11/12'>
                <CodeBlocks 
                    position = {"lg :flex-row"}
                    heading = {
                        <div className='text-4xl font-semibold'>
                            Unlock your
                            <HighlightText text={"coding potential "}/>
                            with our online courses
                        </div>
                    }
                    subheading = {
                       " Our couses are design and taught by industry experts who have years of exprience in coding and are passionate about sharing their knowladge with you" 
                    }
                    ctabtn1 = {
                        {
                            btnText : "try it yourself",
                            linkto : "/signup",
                            active : true
                        }
                    }
                    ctabtn2 = {
                        {
                            btnText : "Learn more",
                            linkto : "/login",
                            active : false
                        }
                    }

                    codeblock = {`<!DOCTYPE html>\n<html>\n <head><title>Example</title>\n<link rel = "styleSheet" href = "style.css">\n</head>\n<body>\n<h1><a href = "/">Header</a>\n</h1>\n<nav><a href = "one/">One</a><a href = "two/">Two</a>\n<a href = "three/">Three</a>\n</nav>`}
                    codeColor = {"text-yellow-25"}

                />
            </div>

            {/* code section 2 */}
            <div className='w-11/12'>
                <CodeBlocks 
                    position = {"lg: flex-row-reverse"}
                    heading = {
                        <div className='text-4xl font-semibold'>
                             Start 
                            <HighlightText text={" coding in seconds "}/>
                        </div>
                    }
                    subheading = {
                       "Go ahead give it a try. our hands-on learning environment means you'll be writing real code from your very first session " 
                    }
                    ctabtn1 = {
                        {
                            btnText : "continue Lesson ",
                            linkto : "/signup",
                            active : true
                        }
                    }
                    ctabtn2 = {
                        {
                            btnText : "Learn more",
                            linkto : "/login",
                            active : false
                        }
                    }
                    codeblock = {`<!DOCTYPE html>\n<html>\n <head><title>Example</title>\n<link rel = "styleSheet" href = "style.css">\n</head>\n<body>\n<h1><a href = "/">Header</a>\n</h1>\n<nav><a href = "one/">One</a><a href = "two/">Two</a>\n<a href = "three/">Three</a>\n</nav>`}
                    codeColor = {"text-yellow-25"}
                />
            </div>

            <ExploreMore/>

        </div>


        {/* section 2 */}

        <div className="bg-pure-greys-5 text-richblack-700">
            <div className='homepage_bg h-[310px]'>
                 
                 <div className = "w-11/12 max-w-maxContent flex flex-col items-center justify-center gap-5 mx-auto  ">
                       <div className='h-[150px]'></div>
                       <div className= "flex flex-row gap-7 text-white ">
                             <CTAButton active={true} linkto={"/signup"}>
                                <div className='flex items-center gap-3'>
                                    Explore full Catalog
                                    <FaArrowRight/>
                                </div>
                                
                             </CTAButton>
                             <CTAButton active={false} linkto={"/signup"}>
                                <div>
                                    Learn more
                                </div>
                                
                             </CTAButton>
                       </div>

                 </div>

            </div>

            <div className= 'mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-center gap-7'>
                  
                <div className='flex flex-row gap-5 mb-10 mt-[95px]'>
                    <div className= "text-4xl font-semibold w-[45%] ">
                        Get the skills you need for a 
                        <HighlightText text={"Job that is in demand"}/>
                    </div>
                    <div className= "flex flex-col gap-10 w-[40%] items-start">
                      <div>
                          The modern StudyNotion is the dictates its own terms. Today, to be a competative 
                          specialist requires more than professional skills.
                      </div>
                          <CTAButton active={true} linkto={"/signup"}> 
                            <div>
                               Learn more
                            </div>

                          </CTAButton>
                     </div>
              </div>

              <TimelineSection/>

            <LearningLanguageSection/>

                  
            </div>
        </div>


        {/* section 3 */}

        <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 
             first-letter bg-richblack-900 text-white '>
             
             <InstructorSection/>

             {/* review slider */}

        </div>
 
        {/* Footer */}

        <div className='mt-16'>
           <Footer/>
        </div>
        
        

    </div>
  )
}

export default Home