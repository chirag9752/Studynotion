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
    <div>
        {/* section 1 */}

        <div className='mx-auto relative flex flex-col w-11/12 items-center justify-between text-white'>

            <Link to={"/signup"} >

                <div className= "group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                     group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight />
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

            <div className = 'shadow-blue-200 mx-3 my-12 '>
                <video
                muted
                loop
                autoPlay>
                <source src={Banner} type='video/mp4'/>
                </video>
            </div>

            {/* Code Section 1 */}
            <div>
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
            <div>
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








// <!DOCTYPE html>
// <html lang="eng">
// <head>
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" 
//                            integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A==" 
//                            crossorigin="anonymous" referrerpolicy="no-referrer" />
//     <title>Chirag Agrawal</title>
//     <link rel="website icon" type="jpg" href="img/resuu1.jpg">

//     <link rel="stylesheet" href="estilo.css">

// </head>
// <body>
//     <!-- MENU -->
//     <div class="contenedor-header">
//         <header>
//             <!-- <div class="logo">
//                 <img src="/img/logo.jpeg" alt="">
//             </div> -->
//             <nav id="nav">
//                 <ul>
//                     <li><a href="#inicio" onclick="seleccionar()">INFO</a></li>
//                     <li><a href="#skills" onclick="seleccionar()">SKILLS</a></li>
//                     <li><a href="#curriculum" onclick="seleccionar()">CURRICULUM</a></li>
//                     <li><a href="#portfolio" onclick="seleccionar()">PORTFOLIO</a></li>
//                     <li><a href="#contacto" onclick="seleccionar()">CONTACT</a></li>
//                 </ul>
//             </nav>
//             <div class="nav-responsive" onclick="mostrarOcultarMenu()">
//                 <i class="fa-solid fa-bars"></i>
//             </div>
//         </header>
//     </div>

//     <!-- SECCION INICIO -->
//     <section id="inicio" class="inicio">
//         <div class="contenido-banner">
//             <div class="contenedor-img">
//                 <img src="./img/chirag full photo.jpg" alt="">
//             </div>
//             <h1>Chirag &nbsp;Agrawal</h1>
//             <h2>Software Engineer</h2>
//             <div class="redes">
//                 <a href="https://twitter.com/ChiragAgra1795" target="_blank"><i class="fa-brands fa-twitter"></i></a>
//                 <a href="https://www.instagram.com/chirag_9752_/" target="_blank"><i class="fa-brands fa-instagram"></i></a>
//                 <a href="https://www.linkedin.com/in/chirag-agrawal-41b071222/" target="_blank"><i class="fa-brands fa-linkedin-in"></i></a>
//                 <a href="https://github.com/chirag9752" target="_blank"><i class="fa-brands fa-github"></i> </a>
//             </div>
//         </div>
//     </section>

//     <!-- SECCION SOBRE MI -->
//     <section id="sobremi" class="sobremi">
//         <div class="contenido-seccion">
//             <h2>Info</h2>
//             <br>
//             <p> 🚀 Passionate MERN Stack Developer | Crafting Seamless Web Experiences .</p>
//             <br>
//             <p>Hello ! ッ<br><span>I am Chirag Agrawal</span></p>
//             <br>
//             <p>
//                 👋 A dedicated MERN Stack Developer with a knack for building cutting-edge web applications. With a strong command over MongoDB, Express.js, React, and Node.js, I bring your ideas to life by seamlessly integrating front-end finesse with powerful back-end functionalities.
//                 <br><br>
//                  🎨 I'm all about turning designs into pixel-perfect, responsive UIs using React. My expertise extends to the back-end realm where I create robust APIs and ensure efficient data management with Node.js and Express.js. MongoDB is my playground for crafting optimized data schemas and ensuring data security.
//                 <br><br>
//                  🌐 I'm a firm believer in teamwork, collaborating seamlessly with designers and fellow developers. Beyond coding, I'm an agile enthusiast, an avid learner, and a tech communicator who breaks down complex concepts for everyone to understand.☺️ 
//             </p>
//             <br><br>
//             <div class="fila">
//                 <!-- datos personales -->
//                 <div class="col">
//                     <h3>Personal Details</h3>
//                     <ul>
                        
//                         <li>
//                             <strong><i class="fa-solid fa-phone"></i>&nbsp;&nbsp;Phone -- &nbsp; </strong>
//                             +91 7224852220
//                         </li>
//                         <li>
//                             <strong><i class="fa fa-envelope"></i>&nbsp;&nbsp;Email -- &nbsp; </strong>
//                             er.chiragagrawal61230@gmail.com
//                         </li>
//                         <li>
//                             <strong><i class="fa-brands fa-github"></i></i>&nbsp;&nbsp;GitHub -- &nbsp; </strong>
//                             chirag9752
//                         </li>
//                         <li>
//                             <strong><i class="fas fa-location"></i></i>&nbsp;&nbsp;Location -- &nbsp; </strong>
//                             Indore , Madhya Pradesh , INDIA (452012)
//                         </li>
                       
//                         <li>
//                             <strong><i class="fa fa-desktop" aria-hidden="true"></i></i>&nbsp;&nbsp;Career in -- &nbsp; </strong>
//                             <span> &nbsp; Computer &nbsp; Science &nbsp; </span>
//                         </li>
//                     </ul>
//                 </div>

//                 <!-- intereses -->
//                 <div class="col">
//                     <h3>Hobbies</h3>
//                     <div class="contenedor-intereses">
//                         <div class="interes">
//                             <i class="fa-solid fa-gamepad"></i>
//                             <span>GAME</span>
//                         </div>
//                         <div class="interes">
//                             <i class="fa-solid fa-headphones"></i>
//                             <span>MUSIC</span>
//                         </div>
//                         <div class="interes">
//                             <i class="fa-solid fa-plane"></i>
//                             <span>TRAVEL</span>
//                         </div>
//                         <div class="interes">
//                             <i class="fa-brand 	fas fa-swimmer"></i>
//                             <span>SWIM</span>
//                         </div>
//                         <div class="interes">
//                             <i class="fa-solid fa-person-hiking"></i>
//                             <span>HIKING</span>
//                         </div>
//                         <div class="interes">
//                             <i class="fa-solid 	fas fa-code"></i>
//                             <span>CODE</span>
//                         </div>
//                         <div class="interes">
//                             <i class="fa-solid fa-car"></i>
//                             <span>DRIVE</span>
//                         </div>
//                         <div class="interes">
//                             <i class="fa-solid fa-camera"></i>
//                             <span>PHOTO</span>
//                         </div>
                        
//                     </div>
//                 </div>
//             </div>
//            <!-- edit karna hai -->
//             <a href="./chirag resume.pdf" target="_blank" style="text-decoration: none;"> <button>
//                 Download CV &nbsp;<i class="fa-solid fa-download"></i>
//                 <span class="overlay"></span>
//             </button></a>
//         </div>
//     </section>

//     <!-- SECCION SKILLS -->
//     <section class="skills" id="skills">
//         <div class="contenido-seccion">
//             <h2>Skills</h2>
//             <div class="fila">
//                 <!-- Technical Skill -->
//                 <div class="col">
//                     <h3>Technical Skills</h3>
                    
//                     <div class="skill">
//                         <span>HTML & CSS</span>
//                         <div class="barra-skill">
//                             <div class="progreso">
//                                 <span>95%</span>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="skill">
//                         <span>JavaScript</span>
//                         <div class="barra-skill">
//                             <div class="progreso">
//                                 <span>90%</span>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="skill">
//                         <span>React JS</span>
//                         <div class="barra-skill">
//                             <div class="progreso">
//                                 <span>90%</span>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="skill">
//                         <span>SQL</span>
//                         <div class="barra-skill">
//                             <div class="progreso">
//                                 <span>80%</span>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="skill">
//                         <span>Data Structure</span>
//                         <div class="barra-skill">
//                             <div class="progreso">
//                                 <span>80%</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <!-- Professional Skills -->
//                 <div class="col">
//                     <h3>Professional Skills</h3>
                    
//                     <div class="skill">
//                         <span>Communication</span>
//                         <div class="barra-skill">
//                             <div class="progreso">
//                                 <span>98%</span>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="skill">
//                         <span>Dedication</span>
//                         <div class="barra-skill">
//                             <div class="progreso">
//                                 <span>100%</span>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="skill">
//                         <span>Teamwork Skills</span>
//                         <div class="barra-skill">
//                             <div class="progreso">
//                                 <span>90%</span>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="skill">
//                         <span>Creativity</span>
//                         <div class="barra-skill">
//                             <div class="progreso">
//                                 <span>80%</span>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="skill">
//                         <span>Time Management</span>
//                         <div class="barra-skill">
//                             <div class="progreso">
//                                 <span>95%</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </section>

//     <!-- SECCION CURRICULUM -->
//     <section id="curriculum" class="curriculum">
//         <div class="contenido-seccion">
//             <h2>Curriculum</h2>
//             <div class="fila">
//                 <div class="col izquierda">
//                     <h3>Education</h3>
//                     <div class="item izq">
//                         <h4>Bachelors</h4>
//                         <span class="casa"> Indore Institute of Science and Technology (Indore) </span>
//                         <span class="fecha">2019-2023</span>
//                         <p>I had done Bachelors of Technology (B.Tech) in Computer Science with 8.67 CGPA .</p>
//                         <div class="conectori">
//                             <div class="circuloi"></div>
//                         </div>
//                     </div>

//                     <div class="item izq">
//                         <h4>12<sup>th</sup></h4>
//                         <span class="casa">Sri Chaitanya Junior Kalasala (Hyderabad) </span>
//                         <span class="fecha">2017-2019</span>
//                         <p>I had done 12<sup>th</sup>  from MATHEMATICS with 86.05% .</p>
//                         <div class="conectori">
//                             <div class="circuloi"></div>
//                         </div>
//                     </div>

//                     <div class="item izq">
//                         <h4>10<sup>th</sup></h4>
//                         <span class="casa">School of Excellence (Chhindwara) </span>
//                         <span class="fecha">2016-2017</span>
//                         <p>I had done 10<sup>th</sup>  with 83% .</p>
//                         <div class="conectori">
//                             <div class="circuloi"></div>
//                         </div>
//                     </div>

//                 </div>

//                   <div class="col derecha">
//                     <h3>&nbsp; Experience and Certificate</h3>

//                     <div class="item der">
//                         <h4>INTERNSHIP</h4>
//                         <span class="casa">Walkover Web solutions</span>
//                         <p>I had done intership as a software Developer</p>
//                         <div class="conectord">
//                             <div class="circulod"></div>
//                         </div>
//                     </div>

//                     <div class="item der">
//                         <h4> Programming in C and C++  </h4>
//                         <span class="casa">Programming world (INDORE)</span>
//                         <br>
//                         <div class="conectord">
//                             <div class="circulod"></div>
//                         </div>
//                     </div>

//                     <div class="item der">
//                         <h4>MERN STACK</h4>
//                         <span class="casa">Programming world (Indore)</span>
//                         <div class="conectord">
//                             <div class="circulod"></div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </section>

//     <!-- SECCION PORTFOLIO -->
//     <section id="portfolio" class="portfolio">
//         <div class="contenido-seccion">
//             <h2>Portfolio</h2>
//             <div class="galeria">
//                 <div class="proyecto">
//                     <img src="img/react.jpg" alt="">
//                     <div class="overlay">
//                         <h3>React JS</h3>
//                         <p>{ Good in making UI COMPONENTS. }</p>
//                     </div>
//                 </div>

//                 <div class="proyecto">
//                     <img src="./img/cl.jpg" alt="">
//                     <div class="overlay">
//                         <h3>Cloud Computing</h3>
//                         <p> Expert in Cloud Computing</p>
//                     </div>
//                 </div>

//                 <div class="proyecto">
//                     <img src="img/lead2.jpg" alt="">
//                     <div class="overlay">
//                         <h3>Teamwork</h3>
//                         <p>(Capability to lead the team.)</p>
//                     </div>
//                 </div>
//                 <div class="proyecto">
//                     <img src="img/cricket.jpg" alt="">
//                     <div class="overlay">
//                         <h3>CRICKET</h3>
//                         <p>I love to play cricket .</p>
//                     </div>
//                 </div>
             
//                 <div class="proyecto">
//                     <img src="img/mm.jpg" alt="">
//                     <div class="overlay">
//                         <h3>Music</h3>
//                         <p>"Music is life"</p>
//                     </div>
//                 </div>
//                 <div class="proyecto">
//                     <img src="img/travel.jpg" alt="">
//                     <div class="overlay">
//                         <h3>Travel</h3>
//                         <p><< Live To Travel >> </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </section>

//     <!-- SECCION CONTACTO -->
//     <section id="contacto" class="contacto">
//         <div class="contenido-seccion">
//             <h2>Contact &nbsp;Me</h2>
//             <div class="fila">
//                 <!-- Formulario -->
//                 <div class="col">

//                     <form action="mailto:er.chiragagrawal61230@gmail.com" method="post" enctype="text/plain">

//                     <input id="name" type="text" placeholder="Enter your name" required>
//                     <input id="email" type="email" placeholder="Enter your e-mail" required>
//                     <input id="phone" placeholder="Enter your phone number" required>
//                     <input id="purpose_subject" type="text" placeholder="Enter your subject / purpose" required>
//                     <textarea name="message" id="message" cols="3" rows="5"  placeholder="Text your message..." required></textarea>
//                     <button type="submit" val="submit">
//                         <i class="fa-solid fa-paper-plane"></i>
//                         SEND<span class="overlay"></span>
//                     </button>

//                     </form>


//                     <script>
//                         const form = document.querySelector('form');
//                         form.addEventListener('submit', function (event) {
//                             const name = encodeURIComponent(document.getElementById('name').value);
//                             const email = encodeURIComponent(document.getElementById('email').value);
//                             const phone = encodeURIComponent(document.getElementById('phone').value);
//                             const purpose_subject = encodeURIComponent(document.getElementById('purpose_subject').value);
//                             const message = encodeURIComponent(document.getElementById('message').value);
//                             const mailtoLink = `mailto:er.chiragagrawal61230@gmail.com?subject=Contact%20Form&body=Name:%20${name}%0AEmail:%20${email}%0APhone:%20${phone}%0APurpose_Subject:%20${purpose_subject}%0AMessage:%20${message}`;
                
//                             // Open user's email client with pre-filled email content
//                             window.location.href = mailtoLink;
                
//                             // Prevent the default form submission
//                             event.preventDefault();
//                         });
//                     </script>




//                 </div>
//                 <!-- Mapa -->
//                 <div class="col">
//                     <img src="img/qr-code.jpg" alt="">
                   
//                 </div>
//             </div>
//         </div>
//     </section>

//     <hr class="hr">

//     <!-- footer -->
//     <footer>
//         <a href="#inicio" class="arriba">
//             <i class="fa-solid fa-angles-up"></i>
//         </a>
//         <div class="redes">
//             <a href="https://twitter.com/ChiragAgra1795" target="_blank"><i class="fa-brands fa-twitter"></i></a>
//             <a href="https://www.instagram.com/chirag_9752_/" target="_blank"><i class="fa-brands fa-instagram"></i></a>
//             <a href="https://www.linkedin.com/in/chirag-agrawal-41b071222/" target="_blank"><i class="fa-brands fa-linkedin-in"></i></a>
//             <a href="https://github.com/chirag9752" btrg target="_blank"><i class="fa-brands fa-github"></i> </a>
//         </div>
//     </footer>

//     <script src="script.js"></script>
// </body>
// </html>







