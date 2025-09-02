'use client'
import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ReviewCard from './ReviewCard';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const reviewData = [
    {
        id: 1,
        name: "Abhishek Pandey",
        heading: "Great Service!",
        review: "Gharwa Development Pvt. Ltd. is a great company to work with. They are very professional and they have a great team of engineers and architects.",
        rating: 5,
        avatar: "/images/c1.png"
    },
    {
        id: 2,
        name: "Shariq Rehan",
        heading: "Good Experience",
        review: "Gharwa Development Pvt. Ltd. is a great company to work with. They are very professional and they have a great team of engineers and architects.",
        rating: 4,
        avatar: "/images/c2.png"
    },
    {
        id: 3,
        name: "Pranjal Srivastava",
        heading: "Highly Recommend",
        review: "Great company to work with. They are very professional and they have a great team of engineers and architects.",
        rating: 5,
        avatar: "/images/c3.png"
    },
    {
        id: 4,
        name: "Sahil Ansari",
        heading: "Satisfactory",
        review: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        rating: 4,
        avatar: "/images/c1.png"
    },
    {
        id: 5,
        name: "Nitish Kumar",
        heading: "Exceptional Quality",
        review: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        rating: 5,
        avatar: "/images/c3.png"
    }
]

const ClientReview = () => {
  return (
    <div className='pt-16 pb-16'>
        <h1 className='text-xl sm:text-2xl text-center font-extrabold'>What people say about us</h1>
        <div className='w-[90%] md:w-[70%] mx-auto mt-16 '>
            <Carousel
  showDots={false}
  responsive={responsive}
//   ssr={true}
  infinite={true}
  autoPlay={true}
  autoPlaySpeed={4000}
>
    {reviewData.map((review) => (
        <ReviewCard
        key={review.id}
        name={review.name}
        heading={review.heading}
        review={review.review}
        rating={review.rating}
        avatar={review.avatar}
        />

    ))}
</Carousel>
        </div>
    </div>
  )
}

export default ClientReview