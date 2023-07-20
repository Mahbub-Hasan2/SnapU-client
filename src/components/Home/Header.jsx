import React from 'react';
import Slider from 'react-slick';
import { BsArrowRight } from 'react-icons/bs';
import img1 from "../../Assets/Images/home/Header/slide1.jpeg";
import { Link } from 'react-router-dom';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            onClick={onClick}
        />
    );
}

const Header = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow className="p-5 z-50  top-0" />,
        prevArrow: <SamplePrevArrow className="p-5 z-50  top-0" />
    };
    const sliderdata = [
        {
            id: 1,
            img: img1,
            title: "Turn Photo",
            title2: "into Masterwork",
            desc: "Sed eu volutpat arcu, a tincidunt quam. Maecenas nulla quam, feugiat sit amet ipsum a, dapibus porta velit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. "
        },
        {
            id: 2,
            img: img1,
            title: "Slide 1",
            title2: "into Masterwork",
            desc: "Sed eu volutpat arcu, a tincidunt quam. Maecenas nulla quam, feugiat sit amet ipsum a, dapibus porta velit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. "
        },
        {
            id: 3,
            img: img1,
            title: "Slide 1",
            title2: "into Masterwork",
            desc: "Sed eu volutpat arcu, a tincidunt quam. Maecenas nulla quam, feugiat sit amet ipsum a, dapibus porta velit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. "
        },
        {
            id: 5,
            img: img1,
            title: "Slide 1",
            title2: "into Masterwork",
            desc: "Sed eu volutpat arcu, a tincidunt quam. Maecenas nulla quam, feugiat sit amet ipsum a, dapibus porta velit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. "
        }
    ]

    return (
        <div className='overflow-hidden'>
            <Slider {...settings}>
                {
                    sliderdata.map((item) => (
                        <div key={item.id}>
                            <div style={{ backgroundImage: `url(${item.img})` }} className="py-20 md:h-[100vh] h-auto bg-cover flex items-center ">
                                <div className="container mx-auto md:px-10 px-2 md:text-start text-center">
                                    <h3 className="md:text-7xl text-2xl font-lexend font-extrabold text-light">{item.title}</h3>
                                    <h3 className="md:text-7xl text-2xl font-bold py-5">
                                        <span className="font-rosarivo italic font-medium">{item.title2.split(' ')[0]}</span>
                                        <span className="font-inter"> {item.title2.split(' ').slice(1)}</span>
                                    </h3>
                                    <p className='max-w-xl font-medium font-inter'>{item.desc}</p>
                                    <div className="flex md:justify-start justify-center gap-5 md:mt-20 mt-5">
                                        <button className="md:px-20 px-7 md:py-5 py-3 md:mb-0 mb-2 bg-primary rounded-full text-light md:text-lg text-xs font-semibold font-inter flex items-center gap-2">Read more <BsArrowRight /> </button>
                                        <Link to="/auth/login">
                                            <button className="md:px-20 px-7 md:py-5 py-3 md:mb-0 mb-2 bg-dark rounded-full text-light md:text-lg text-xs font-semibold font-inter flex items-center gap-2">Sign up now <BsArrowRight /> </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))
                }
            </Slider>
        </div>
    );
};

export default Header;