"use client";

import { useEffect, useRef } from "react";

export default function TeamSwiper({ teamMembers = [] }) {
  const ref = useRef(null);
  const swiperInstanceRef = useRef(null);

  useEffect(() => {
    if (!ref.current || teamMembers.length === 0) return;

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
        slidesPerView: 4,
        spaceBetween: 25,
        loop: teamMembers.length > 1,
        speed: 400,
        autoplay: { delay: 1000, disableOnInteraction: false },
        observer: true,
        observeParents: true,
        breakpoints: {
          0: { slidesPerView: 1 },
          576: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          992: { slidesPerView: 4 },
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
  }, [teamMembers]);

  return (
    <div className="swiper teamSwiper overflow-hidden" ref={ref}>
      <div className="swiper-wrapper">
        {teamMembers.map((member, i) => (
          <div className="swiper-slide" key={member.id || i}>
            <div className="text-center">
              <img
                src={member.img || "/assets/images/hero/team-demo.png"}
                className="w-full h-[280px] object-cover rounded mb-3"
                alt={member.name || "Team Member"}
              />
              <div className="bg-gradient-to-t from-[#232324] to-[#1b1b1b] rounded-[1.5rem] p-2">
                <h6 className="mb-0 text-white font-semibold">{member.name}</h6>
                <small className="text-white">{member.designation || member.role}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
