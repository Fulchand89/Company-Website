"use client";

import { useEffect, useRef } from "react";

export default function TestimonialSwiper({ testimonials = [] }) {
  const ref = useRef(null);
  const swiperInstanceRef = useRef(null);

  useEffect(() => {
    if (!ref.current || testimonials.length === 0) return;

    let active = true;
    let timer = setTimeout(async () => {
      if (!active || !ref.current) return;
      const [{ default: Swiper }, { Autoplay }] = await Promise.all([
        import("swiper"),
        import("swiper/modules"),
      ]);
      if (!active || !ref.current) return;

      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
      }

      swiperInstanceRef.current = new Swiper(ref.current, {
        modules: [Autoplay],
        slidesPerView: 3,
        spaceBetween: 30,
        loop: testimonials.length > 1,
        centeredSlides: testimonials.length > 2,
        speed: 1000,
        autoplay: { delay: 3000, disableOnInteraction: false },
        observer: true,
        observeParents: true,
        breakpoints: {
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        },
      });
    }, 50);

    return () => {
      active = false;
      clearTimeout(timer);
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
        swiperInstanceRef.current = null;
      }
    };
  }, [testimonials]);

  return (
    <div className="swiper myTestimonialSwiper py-1 overflow-hidden" ref={ref}>
      <div className="swiper-wrapper">
        {testimonials.map((item, i) => (
          <div className="swiper-slide pt-14 h-auto" key={item.id || i}>
            <div className="relative w-full max-w-[393px] h-full flex flex-col rounded-[16px] bg-white px-[25px] pb-[22px] pt-[72px] shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
              {/* Floating avatar */}
              <div 
                className="absolute overflow-hidden border-2 border-white bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] flex items-center justify-center aspect-square shrink-0 p-[3px]"
                style={{ 
                  top: "-45px", 
                  left: "30px", 
                  width: "75px", 
                  height: "75px", 
                  minWidth: "75px", 
                  minHeight: "75px", 
                  maxWidth: "75px", 
                  maxHeight: "75px",
                  borderRadius: "50%",
                  WebkitBorderRadius: "50%",
                  boxSizing: "border-box",
                  transform: "translate3d(0, 0, 0)",
                  WebkitTransform: "translate3d(0, 0, 0)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  willChange: "transform"
                }}
              >
                <img
                  src={item.img || "/assets/images/hero/client-img1.png"}
                  alt={item.name || "Client"}
                  className="w-full h-full object-cover object-center aspect-square block shrink-0"
                  style={{
                    borderRadius: "50%",
                    WebkitBorderRadius: "50%",
                    boxSizing: "border-box",
                    transform: "translate3d(0, 0, 0)",
                    WebkitTransform: "translate3d(0, 0, 0)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden"
                  }}
                />
              </div>
              {/* Stars */}
              <div className="absolute right-[20px] top-[20px] text-[25px] leading-none tracking-[1px] text-[#ffb800]">
                {"★".repeat(item.rating || 5)}
              </div>
              <p className="text-[16px] leading-[24px] text-[#757575] mb-[30px]">
                {item.text || "No review text provided."}
              </p>
              <div className="mt-auto">
                <h5 className="mb-1 text-[20px] font-bold leading-6 text-[#bd1232]">{item.name}</h5>
                <p className="mb-0 text-[14px] leading-5">
                  <span className="text-[#757575]">Project : </span>
                  <span className="font-semibold text-[#f05263]">{item.project}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
