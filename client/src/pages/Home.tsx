import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  ArrowUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Menu,
  MessageCircle,
  Phone,
  Play,
  Star,
  Users,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [, setHoveredService] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [portfolioStartIndex, setPortfolioStartIndex] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [isBookingPopupOpen, setIsBookingPopupOpen] = useState(false);
  const [bookingSource, setBookingSource] = useState("Book A Consultation");
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    description: "",
  });
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const heroSlides = [
    {
      src: "https://whataweddingstory.com/wp-content/uploads/slider/cache/0b185dd34a6be0aee393d59a84dbea97/1.SSG08862-scaled.jpg",
      alt: "Wedding hero slide one",
    },
    {
      src: "https://whataweddingstory.com/wp-content/uploads/slider/cache/ff91f0e2ba5dbd9ea45045635da8823a/5.SAN_6752-scaled.jpg",
      alt: "Wedding hero slide two",
    },
    {
      src: "https://whataweddingstory.com/wp-content/uploads/slider/cache/035879a703e29858c3153dc36334714c/11.DSC02689-scaled.jpg",
      alt: "Wedding hero slide three",
    },
    {
      src: "https://whataweddingstory.com/wp-content/uploads/slider/cache/b6bc30811a0c08900702b866ff00c12e/DSC03820-4-scaled.jpg",
      alt: "Wedding hero slide four",
    },
  ];

  const headerNavItems = [

    { label: "Photography", href: "/portfolio", external: false },
    {
      label: "Contact Us",
      href: "#contact-us",
      external: true,
    },
  ];

  const careersMenuItem = {
    label: "Careers",
    href: "",
  };

  const services = [
    {
      id: 1,
      title: "Wedding Photography",
      description: "Capture your special moments with our premium wedding photography services. We tell your love story through stunning visuals.",
      image: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: 2,
      title: "Corporate Events",
      description: "Professional coverage of your corporate events, conferences, and team gatherings with cinematic quality.",
      image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: 3,
      title: "Concert & Live Events",
      description: "High-energy photography capturing the essence and excitement of live performances and events.",
      image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: 4,
      title: "Portrait Sessions",
      description: "Professional portrait photography that captures your personality and essence in stunning detail.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
  ];

  const eventCoverageOptions = [
    "Engagement",
    "Haldi",
    "Mehendi",
    "Bride Ceremony",
    "Groom Ceremony",
    "Sangeet",
    "Wedding",
    "Reception",
    "Couple Photoshoot",
    "Couple Photoshoot & Videoshoot",
    "Birthday",
    "Baby Shower",
  ];

  const budgetOptions = [
    "Less than 2,00,000",
    "2,00,000 - 3,00,000",
    "3,00,000 - 4,00,000",
    "4,00,000 - 5,00,000",
    "5,00,000 - 6,00,000",
    "6,00,000 - 7,00,000",
    "7,00,000 - 8,00,000",
    "More than 8,00,000",
    "Others",
  ];

  const priorityOptions = [
    "I want to remember all the little details from my wedding day",
    "I want fashion-magazine style portraits",
    "I want to have my wedding featured on blogs or magazines",
    "I want to remember exactly how I felt on my wedding day",
    "I want all moments documented, both big and small",
    "I want to capture all the people celebrating with us",
    "I prefer candid photos more than posed pictures",
    "We have an interesting story, let's discuss over a call",
  ];

  const portfolioGalleryImages = [
    {
      src: "https://images.squarespace-cdn.com/content/v1/5e8b4cadba0dc03f32e67565/215ebe25-9ec2-4e44-bc86-9bb07dd8e23f/IMG_0995.JPG?format=500w",
      fullSrc:
        "https://images.squarespace-cdn.com/content/v1/5e8b4cadba0dc03f32e67565/215ebe25-9ec2-4e44-bc86-9bb07dd8e23f/IMG_0995.JPG",
      alt: "A woman dressed in traditional Indian bridal attire with elaborate gold jewelry.",
    },
    {
      src: "https://images.squarespace-cdn.com/content/v1/5e8b4cadba0dc03f32e67565/f6954c78-bfd5-43ea-9f9f-33e647e9cd5b/IMG_1317.JPG?format=500w",
      fullSrc:
        "https://images.squarespace-cdn.com/content/v1/5e8b4cadba0dc03f32e67565/f6954c78-bfd5-43ea-9f9f-33e647e9cd5b/IMG_1317.JPG",
      alt: "A smiling woman in traditional Indian wedding attire during a ceremony.",
    },
    {
      src: "https://images.squarespace-cdn.com/content/v1/5e8b4cadba0dc03f32e67565/24852b00-b99e-405b-8bd2-61f0a69dbfea/IMG_0994.JPG?format=500w",
      fullSrc:
        "https://images.squarespace-cdn.com/content/v1/5e8b4cadba0dc03f32e67565/24852b00-b99e-405b-8bd2-61f0a69dbfea/IMG_0994.JPG",
      alt: "A woman in red bridal attire with gold jewelry and flowers in her hair.",
    },
    {
      src: "https://images.squarespace-cdn.com/content/v1/5e8b4cadba0dc03f32e67565/35228812-cd1c-4581-b5d9-462b7c47e61f/IMG_1316+%281%29.JPG?format=500w",
      fullSrc:
        "https://images.squarespace-cdn.com/content/v1/5e8b4cadba0dc03f32e67565/35228812-cd1c-4581-b5d9-462b7c47e61f/IMG_1316+%281%29.JPG",
      alt: "A woman in traditional Indian bridal attire wearing red and gold.",
    },
    {
      src: "https://images.squarespace-cdn.com/content/v1/5e8b4cadba0dc03f32e67565/615e8b99-7f93-435e-990a-6775322d526b/IMG_1315.JPG?format=500w",
      fullSrc:
        "https://images.squarespace-cdn.com/content/v1/5e8b4cadba0dc03f32e67565/615e8b99-7f93-435e-990a-6775322d526b/IMG_1315.JPG",
      alt: "A portrait of a woman in ornate traditional attire against a red backdrop.",
    },
  ];

  const weddingGalleryImages = [
    {
      src: "https://vsnapu.com/Files/LandingPages/10/brideimagelandsacpae-min_galleryimage.jpeg",
      alt: "Romantic moment as the bride puts the varmala on the groom at the floral wedding stage.",
    },
    {
      src: "https://vsnapu.com/Files/LandingPages/10/Copy of Bride adjusts her earrings, radiating confidence and excitement._galleryimage.jpg",
      alt: "Varmala ceremony captured with the bride and groom smiling at each other",
    },
    {
      src: "https://vsnapu.com/Files/LandingPages/10/Copy of Bride and groom exchange vows_galleryimage.jpg",
      alt: "Bride and groom preparing for the sacred garland exchange in the varmala ceremony.",
    },
    {
      src: "https://vsnapu.com/Files/LandingPages/10/Copy of Bride and groom in wedding attire kissing_galleryimage.jpg",
      alt: "Bride and groom seal their vows with a kiss surrounded by stunning floral arrangements.",
    },
    {
      src: "https://vsnapu.com/Files/LandingPages/10/Copy of Bride and groom joyfully crack open celebratory crackers together_galleryimage.jpg",
      alt: "Bride and groom enjoy the mesmerizing view of skyshoots at their destination wedding stage.",
    },
    {
      src: "https://vsnapu.com/Files/LandingPages/10/Copy of Bride and groom laugh together in a field of wildflowers_galleryimage.jpg",
      alt: "The bride and groom enjoy the mesmerizing fire skyshoots display during their destination wedding celebration.",
    },
    {
      src: "https://vsnapu.com/Files/LandingPages/10/Copy of Bride and groom with their arms around each other in front of a purple mountain range_galleryimage.jpg",
      alt: "Bride and groom walk back to their wedding venue under the moonlit sky at their destination wedding.",
    },
    {
      src: "https://vsnapu.com/Files/LandingPages/10/Copy of Bride sits gracefully, eagerly awaiting groom_s arrival at their wedding_galleryimage.jpg",
      alt: "The bride beams with joy, sitting in her wedding doli by the serene seaside.",
    },
    {
      src: "https://vsnapu.com/Files/LandingPages/10/Copy of Bride_s radiant smile captures wedding excitement and happiness_galleryimage.jpg",
      alt: "Dramatic shot of a groom with the sun casting a majestic glow behind him.",
    },
    {
      src: "https://vsnapu.com/Files/LandingPages/10/Copy of Couple standing near the ocean in wedding attire_galleryimage.jpg",
      alt: "Silhouetted groom standing against the bright sun.",
    },
    {
      src: "https://vsnapu.com/Files/LandingPages/10/Copy of Couple walks hand in hand through garden_galleryimage.jpg",
      alt: "Wedding couple seated on a grand floral stage, radiating love.",
    },
    {
      src: "https://vsnapu.com/Files/LandingPages/10/Copy of Glowing bride in her wedding gown, anticipation filling the air_galleryimage.jpg",
      alt: "The groom’s eyes are fixed on his beautiful bride in the grand wedding mandap.",
    },
    {
      src: "https://vsnapu.com/Files/LandingPages/10/Copy of Groomsmen share laughter while getting ready_galleryimage.jpg",
      alt: "Bride and groom embrace the haldi traditions, sitting in a tub and touching heads.",
    },
    {
      src: "https://vsnapu.com/Files/LandingPages/10/Copy of Laughter fills the air as bride and bridesmaids prepare for the big day_galleryimage.jpg",
      alt: "The perfect wedding shot: A couple stands on a stage adorned with gorgeous flowers.",
    },
    {
      src: "https://vsnapu.com/Files/LandingPages/10/Copy of Playful portrait of bride and groom holding hands_galleryimage.jpg",
      alt: "Bride and groom arrive in style at their breathtaking destination wedding.",
    },
    {
      src: "https://vsnapu.com/Files/LandingPages/10/Copy of Wedding couple dancing in front of disco ball background_galleryimage.jpg",
      alt: "A breathtaking wedding entrance as the bride walks in with her brothers.",
    },
    {
      src: "https://vsnapu.com/Files/LandingPages/10/galleryimage.jpg",
      alt: "Sun-kissed love: The couple shares an intimate gaze in the sunlight.",
    },
    {
      src: "https://vsnapu.com/Files/LandingPages/10/weddingmaynew_galleryimage.jpg",
      alt: "The bride and her sisters share a special walk on the balcony before the wedding.",
    },
    {
      src: "https://vsnapu.com/Files/LandingPages/10/weddingmay_galleryimage.jpg",
      alt: "The bride gracefully puts the varmala on the groom amidst a floral wedding setup.",
    },
  ];

  const timelineStats = [
    { label: "Weddings", value: "600+" },
    { label: "Happy Couples", value: "590+" },
    { label: "Photos Delivered", value: "5,16,610+" },
    { label: "Films Delivered", value: "550+" },
    { label: "Experience", value: "6+" },
  ];

  const whatWeDoItems = [
    {
      title: "WEDDING PHOTOGRAPHY",
      description:
        "At Merrygohearts, we capture more than just how your wedding looked, we capture how it felt. From quiet rituals to joyful chaos, our candid wedding photographers in Hyderabad tell your story with heart and honesty.",
      cta: "VIEW GALLERIES",
      href: "/portfolio",
      image:
        "https://static.wixstatic.com/media/926c18_6ef646828a2d47e487dec7886de6c05a~mv2.jpg/v1/fill/w_1087,h_734,al_c,q_90,enc_avif,quality_auto/926c18_6ef646828a2d47e487dec7886de6c05a~mv2.jpg",
      alt: "Wedding photography showcase",
    },
    {
      title: "WEDDING FILMS",
      description:
        "We craft cinematic wedding films in Hyderabad that feel deeply personal and unforgettable. Our lens captures not just moments, but meaning, turning real memories into visual keepsakes.",
      cta: "WATCH FILMS",
      href: "/portfolio",
      image:
        "https://static.wixstatic.com/media/926c18_e57715deae944161a3c55e650aa63fcef000.jpg/v1/fill/w_1080,h_674,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/926c18_e57715deae944161a3c55e650aa63fcef000.jpg",
      alt: "Wedding films showcase",
    },
  ];

  const featuredLogos = [
    {
      src: "https://static.wixstatic.com/media/926c18_960aa30ed76047458155f8e890407ffd~mv2.png/v1/crop/x_0,y_159,w_500,h_182/fill/w_330,h_120,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/new_toi-removebg-preview.png",
      alt: "Times of India feature logo",
    },
    {
      src: "https://static.wixstatic.com/media/4ca152_4be5ab9d76b94ecfa405aa75c78c5320~mv2.png/v1/crop/x_522,y_77,w_1052,h_838/fill/w_216,h_172,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/new%20wedmegood.png",
      alt: "WedMeGood feature logo",
    },
    {
      src: "https://static.wixstatic.com/media/4ca152_b0909272ce954714b346b33e81c3f919~mv2.png/v1/fill/w_332,h_114,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/new_wedding_wire-removebg-preview.png",
      alt: "WeddingWire feature logo",
    },
    {
      src: "https://static.wixstatic.com/media/4ca152_cd6fb107570c4a7fbad7205c8ca6e780~mv2.png/v1/crop/x_625,y_66,w_869,h_860/fill/w_206,h_206,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/new%20wedding%20sutra.png",
      alt: "WeddingSutra feature logo",
    },
    {
      src: "https://static.wixstatic.com/media/926c18_c4b8dcff605549ea87b2179a3131795f~mv2.png/v1/fill/w_408,h_100,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/weddingbazaar-logo-1-qh4dpegp8gaha4cnl69dh3iavs5q2lsvi5yziza3gc-removebg-preview.png",
      alt: "WeddingBazaar feature logo",
    },
  ];

  const clientTestimonials = [
    {
      name: "Natasha & Kunal",
      quote:
        "I’m so glad to have found Merrygohearts. Communication was seamless, they understood us deeply, reached every venue on time, and captured every moment beautifully. Their natural style of editing made all the difference.",
      image:
        "https://static.wixstatic.com/media/926c18_4a3bdb07250a4aafbc20f3439185b39f~mv2.jpg/v1/crop/x_312,y_0,w_1551,h_2000/fill/w_788,h_1016,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Natasha%20%26%20Kunal-370-min_edited_edited_jp.jpg",
      alt: "Natasha and Kunal wedding portrait",
    },
    {
      name: "Aarav & Meera",
      quote:
        "From pre-wedding to reception, the team made us feel comfortable and confident. Every frame felt real, emotional, and timeless. Delivery was right on schedule too.",
      image:
        "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Couple portrait testimonial",
    },
    {
      name: "Riya & Dev",
      quote:
        "The storytelling style is what we loved the most. They captured family moments, candid laughter, and ceremony emotions exactly how we remember them.",
      image:
        "https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Wedding ceremony testimonial",
    },
  ];

  const faqItems = [
    {
      question:
        "How far in advance should I book a wedding photographer in Hyderabad, especially during peak season?",
      answer:
        "During peak season, booking 6-12 months in advance is best. Popular wedding photographers often get booked early, and advance planning gives enough time to discuss style, coverage, and timelines.",
    },
    {
      question: "What is the average cost of hiring a wedding photographer in Hyderabad?",
      answer:
        "Pricing depends on experience, event duration, deliverables, and add-ons like films or albums. The best approach is to share your exact requirements and request personalized quotes.",
    },
    {
      question: "How do I choose the right wedding photographer in Hyderabad?",
      answer:
        "Start by identifying your preferred style, then review portfolios, testimonials, and communication quality. Choose a team that aligns with your vision, budget, and comfort level.",
    },
    {
      question: "What is the cost of candid photography in Hyderabad?",
      answer:
        "Candid photography pricing varies by coverage days, team size, and post-production scope. Share your events list and timelines to receive an accurate candid package estimate.",
    },
    {
      question:
        "Should I check sample work and customer reviews before finalizing a wedding photographer?",
      answer:
        "Yes. Portfolio quality and real client feedback are essential. They help you evaluate consistency, professionalism, communication, and whether the team can deliver your preferred style.",
    },
    {
      question: "What kind of photography style do top wedding photographers offer?",
      answer:
        "Most teams offer a mix of candid, traditional, documentary, fine-art, and contemporary styles. Reviewing full wedding stories is the best way to find the style that fits you.",
    },
    {
      question: "What should be included in a wedding photography package in Hyderabad?",
      answer:
        "A complete package usually includes event-day coverage, candid and traditional photos, edits, digital delivery, and optional add-ons like pre-wedding shoots, albums, and cinematography.",
    },
    {
      question: "What should I consider before hiring a wedding photographer in Hyderabad?",
      answer:
        "Check portfolio quality, experience, style fit, pricing clarity, personality compatibility, and flexibility with your dates and events. A clear discussion upfront prevents surprises later.",
    },
  ];

  useEffect(() => {
    const onScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  const PORTFOLIO_SLIDES_TO_SHOW = 4;
  const maxPortfolioStartIndex = Math.max(
    0,
    portfolioGalleryImages.length - PORTFOLIO_SLIDES_TO_SHOW
  );
  const visiblePortfolioImages = portfolioGalleryImages.slice(
    portfolioStartIndex,
    portfolioStartIndex + PORTFOLIO_SLIDES_TO_SHOW
  );

  const handlePortfolioPrev = () => {
    setPortfolioStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handlePortfolioNext = () => {
    setPortfolioStartIndex((prev) => Math.min(maxPortfolioStartIndex, prev + 1));
  };

  const resetBookingForm = () => {
    setBookingForm({
      name: "",
      phone: "",
      description: "",
    });
  };

  const openBookingPopup = (source: string) => {
    setBookingSource(source);
    setIsBookingPopupOpen(true);
  };

  const handleBookingPopupChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const field = e.target.name as "name" | "phone" | "description";
    const value = e.target.value;
    setBookingForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <header className="fixed top-0 inset-x-0 z-[70] border-b border-white/10 bg-black/35 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 grid grid-cols-[1fr_auto] xl:grid-cols-[auto_1fr_auto] items-center gap-6">
          <Link href="/">
            <a className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
              <img
                src="./logo_processed.jpg"
                alt="./logo.jpeg"
                className="h-12 w-auto"
              />
              <span className="hidden sm:block font-semibold text-white text-lg tracking-wide">
                Nvs Click
              </span>
            </a>
          </Link>

          <nav className="hidden xl:flex items-center justify-center gap-7">
            {headerNavItems.slice(0, 3).map((item) =>
              item.label === "Contact Us" ? (
                <button
                  key={item.href ?? item.label}
                  type="button"
                  onClick={() => openBookingPopup("Contact Us - Header")}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  {item.label}
                </button>
              ) : item.external ? (
                <a
                  key={item.href ?? item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <Link key={item.href} href={item.href}>
                  <a className="text-white/90 hover:text-white transition-colors">{item.label}</a>
                </Link>
              )
            )}

            <div className="relative group">
       
              <div className="pointer-events-none group-hover:pointer-events-auto absolute left-0 top-full pt-2 opacity-0 group-hover:opacity-100 transition">
                <div className="min-w-40 rounded-md border border-white/10 bg-black/90 p-2 shadow-xl">
                  <a
                    href={careersMenuItem.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded px-3 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-white"
                  >
                    {careersMenuItem.label}
                  </a>
                </div>
              </div>
            </div>

            {headerNavItems.slice(3).map((item) =>
              item.label === "Contact Us" ? (
                <button
                  key={item.href ?? item.label}
                  type="button"
                  onClick={() => openBookingPopup("Contact Us - Header")}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  {item.label}
                </button>
              ) : (
                <a
                  key={item.href ?? item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              )
            )}
          </nav>

          <div className="hidden xl:flex items-center gap-3 justify-self-end">
            <a
              href="https://www.instagram.com/new_vidyasagar_click7440/"
              target="_blank"
              rel="noreferrer"
              className="h-9 w-9 rounded-full border border-white/25 text-white flex items-center justify-center hover:bg-white/10"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.facebook.com/share/17fke6JmTP/?mibextid=wwXIfr"
              target="_blank"
              rel="noreferrer"
              className="h-9 w-9 rounded-full border border-white/25 text-white flex items-center justify-center hover:bg-white/10"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://www.youtube.com/@newVidyaSagarclick"
              target="_blank"
              rel="noreferrer"
              className="h-9 w-9 rounded-full border border-white/25 text-white flex items-center justify-center hover:bg-white/10"
              aria-label="Youtube"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="xl:hidden justify-self-end inline-flex items-center justify-center h-10 w-10 rounded-md border border-white/20 bg-black/20 text-white"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMobileMenuOpen ? (
          <div className="xl:hidden border-t border-white/10 bg-black/70">
            <div className="px-4 py-4 space-y-3">
              {headerNavItems.slice(0, 3).map((item) =>
                item.label === "Contact Us" ? (
                  <button
                    key={`mobile-${item.href ?? item.label}`}
                    type="button"
                    className="block text-white/90 hover:text-white"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openBookingPopup("Contact Us - Mobile Menu");
                    }}
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    key={`mobile-${item.href ?? item.label}`}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    className="block text-white/90 hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              )}

              <a
                href={careersMenuItem.href}
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-white/90 hover:text-white"
              >
                {careersMenuItem.label}
              </a>

              {headerNavItems.slice(3).map((item) =>
                item.label === "Contact Us" ? (
                  <button
                    key={`mobile-tail-${item.href ?? item.label}`}
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openBookingPopup("Contact Us - Mobile Menu");
                    }}
                    className="block text-white/90 hover:text-white"
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    key={`mobile-tail-${item.href ?? item.label}`}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-white/90 hover:text-white"
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>
          </div>
        ) : null}
      </header>

      <div className="fixed left-0 top-[40%] z-50 hidden md:flex flex-col gap-3">
        <a
          href="https://www.instagram.com/new_vidyasagar_click7440/"
          target="_blank"
          rel="noreferrer"
          className="h-11 w-11 rounded-r-lg bg-pink-600 flex items-center justify-center text-white hover:translate-x-1 transition"
          aria-label="Instagram"
        >
          <Instagram className="h-5 w-5" />
        </a>
        <a
          href="https://www.facebook.com/share/17fke6JmTP/?mibextid=wwXIfr"
          target="_blank"
          rel="noreferrer"
          className="h-11 w-11 rounded-r-lg bg-blue-600 flex items-center justify-center text-white hover:translate-x-1 transition"
          aria-label="Facebook"
        >
          <Facebook className="h-5 w-5" />
        </a>
        <a
          href="https://www.youtube.com/@newVidyaSagarclick"
          target="_blank"
          rel="noreferrer"
          className="h-11 w-11 rounded-r-lg bg-red-600 flex items-center justify-center text-white hover:translate-x-1 transition"
          aria-label="Youtube"
        >
          <Youtube className="h-5 w-5" />
        </a>
      </div>

      <a
        href="https://wa.me/+916269941008"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 left-5 z-50 h-14 w-14 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center hover:bg-[#1ebd5a] transition"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      <a
        href="tel:+916269941008"
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#c78665] py-3 text-center text-white font-semibold"
      >
        <span className="inline-flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Call Us To Get A Quote
        </span>
      </a>

      <Button
        type="button"
        size="icon"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-24 right-5 z-40 h-11 w-11 rounded-full bg-[#c78665] hover:bg-[#b07354] text-white transition-all ${showScrollToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
      >
        <ArrowUp className="h-5 w-5" />
      </Button>

      <section className="relative min-h-[90vh] pt-20 flex items-center justify-center overflow-hidden">
        {heroSlides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${heroSlideIndex === index ? "opacity-100" : "opacity-0"}`}
          />
        ))}

        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/35 to-black/70" />

        <motion.div
          className="relative z-10 max-w-4xl px-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold text-white mb-4">Nvs Click</h1>
          <p className="text-xl sm:text-2xl text-amber-300 mb-8">
           Best Photographer in Hyderabad, Bhopal , Indore India. Capturing timeless moments with a blend of candid and staged artistry.
          </p>
        
          <Button
            type="button"
            onClick={() => openBookingPopup("Book A Consultation - Hero")}
            className="bg-[#c78665] hover:bg-[#b07354] text-white px-8 py-6 text-base rounded-none"
          >
            Book A Consultation
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() =>
              setHeroSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
            }
            className="h-9 w-9 border-white/50 bg-black/30 text-white hover:bg-white/10"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={`hero-dot-${index}`}
                type="button"
                onClick={() => setHeroSlideIndex(index)}
                className={`h-2.5 w-2.5 rounded-full transition ${heroSlideIndex === index ? "bg-white" : "bg-white/40"}`}
                aria-label={`Go to hero slide ${index + 1}`}
              />
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setHeroSlideIndex((prev) => (prev + 1) % heroSlides.length)}
            className="h-9 w-9 border-white/50 bg-black/30 text-white hover:bg-white/10"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <section className="bg-white text-black py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <h2 className="text-4xl sm:text-5xl font-semibold mb-3">Nvs Click</h2>
            <p className="text-xl text-slate-600 mb-4">Photos & Films</p>
            <h3 className="text-2xl sm:text-3xl font-medium text-[#dd9933] mb-6 leading-snug">
              Transforming The Landscape of Indian Wedding Photography.
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
          >
            <p className="text-slate-700 leading-relaxed mb-4">
              Nvs Click specializes in capturing weddings and creating impactful visuals that seamlessly blend the staged with the candid and the posed with the real.
            </p>
            <p className="text-slate-700 leading-relaxed mb-6">
              We are an accomplished and passionate group of photographers specializing in international destination wedding photography, pre-wedding photography, and wedding cinematography. Our goal is to create timeless memories of your special day with impeccable service and exceptional quality.
            </p>
            <Button
              type="button"
              onClick={() => openBookingPopup("Book A Consultation - Intro")}
              className="bg-[#c78665] hover:bg-[#b07354] text-white rounded-none px-8 py-6"
            >
              Book A Consultation
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Photography services background"
          />
          <div className="absolute inset-0 bg-black/75"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-purple-900/30"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive photography and event coverage tailored to your needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, idx) => {
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
                >
                  <Card
                    className="bg-white/5 border-white/10 hover:border-pink-500/50 transition-all duration-300 cursor-pointer overflow-hidden group"
                    onMouseEnter={() => setHoveredService(service.id)}
                    onMouseLeave={() => setHoveredService(null)}
                  >
                    <CardContent className="p-8">
                      <div className="relative mb-6 overflow-hidden rounded-xl">
                        <img
                          className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          src={service.image}
                          alt={service.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent"></div>
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-white">{service.title}</h3>
                      <p className="text-gray-400 mb-6">{service.description}</p>
                      <div className="flex items-center gap-2 text-pink-400 group-hover:gap-3 transition-all">
                        <span className="font-semibold">Learn More</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      

      {/* Portfolio Preview Section */}
      <section className="relative py-20 bg-black">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Forever Memories</h2>
            <p className="text-xl text-gray-400">
              Browse through our exquisite wedding photos that become timeless keepsakes.
            </p>
          </motion.div>

          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="mb-4 flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handlePortfolioPrev}
                disabled={portfolioStartIndex === 0}
                className="border-white/20 bg-white/5 text-white hover:bg-white/10 disabled:opacity-40"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <p className="text-sm text-gray-300">
                {portfolioStartIndex + 1}-
                {Math.min(
                  portfolioStartIndex + PORTFOLIO_SLIDES_TO_SHOW,
                  portfolioGalleryImages.length
                )} of {portfolioGalleryImages.length}
              </p>

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handlePortfolioNext}
                disabled={portfolioStartIndex === maxPortfolioStartIndex}
                className="border-white/20 bg-white/5 text-white hover:bg-white/10 disabled:opacity-40"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <motion.div
              key={portfolioStartIndex}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {visiblePortfolioImages.map((item) => (
                <figure
                  key={`${item.src}-${item.alt}`}
                  className="relative h-[460px] overflow-hidden rounded-sm group"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedGalleryImage({
                        src: item.fullSrc,
                        alt: item.alt,
                      })
                    }
                    className="block h-full w-full cursor-pointer"
                  >
                    <img
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      src={item.src}
                      alt={item.alt}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent"></div>
                  </button>
                </figure>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <Link href="/portfolio">
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-lg flex items-center gap-2 mx-auto">
                View Full Portfolio
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white text-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-4xl sm:text-5xl font-semibold leading-tight mb-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            Elevating Your Experience through Professional Wedding Cinematography
          </motion.h2>
          <motion.p
            className="text-lg text-slate-700 leading-relaxed mb-8"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
          >
            At Nvs Click, we go beyond traditional wedding videography by crafting cinematic masterpieces that preserve your emotions and memories in a deeply meaningful way. Our team harmoniously blends light, composition, and movement to create films that authentically reflect the beauty, joy, and love of your celebration.
          </motion.p>
          <a  target="_blank" rel="noreferrer">
            <Button className="bg-[#c78665] hover:bg-[#b07354] text-white rounded-none px-8 py-6">
              <Play className="h-5 w-5 mr-2" />
              Explore Wedding Cinematography
            </Button>
          </a>
        </div>
      </section>

      <section className="py-16 bg-[#eef5f7] text-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h3
            className="text-4xl sm:text-5xl font-semibold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Check Out Our Instagram Feed
          </motion.h3>
          <motion.p
            className="text-slate-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
          >
            Follow our latest wedding stories and behind-the-scenes moments.
          </motion.p>
          <a href="https://www.instagram.com/new_vidyasagar_click7440/" target="_blank" rel="noreferrer">
            <Button className="bg-black text-white hover:bg-black/90 px-8 py-6 rounded-none">
              View Instagram
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </a>
        </div>
      </section>

      {/* Wedding Gallery Section */}
      <section className=" bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex justify-center my-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <Button
              type="button"
              onClick={() => openBookingPopup("Book Slot - Wedding Gallery Top")}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              Book a Shoot
            </Button>
          </motion.div>

          <motion.div
            className="text-center my-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <h3 className="text-4xl sm:text-5xl font-bold">Our Gallery</h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {weddingGalleryImages.map((image, index) => (
              <motion.button
                key={`${image.src}-${index}`}
                type="button"
                onClick={() =>
                  setSelectedGalleryImage({
                    src: image.src,
                    alt: image.alt,
                  })
                }
                className="group relative w-full overflow-hidden rounded-lg aspect-[3/4] cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, delay: (index % 8) * 0.04, ease: "easeOut" }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </motion.button>
            ))}
          </div>

          <motion.div
            className="flex justify-center my-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <Button
              type="button"
              onClick={() => openBookingPopup("Book Slot - Wedding Gallery Bottom")}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              Book a Shoot
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.pexels.com/photos/1738986/pexels-photo-1738986.jpeg?auto=compress&cs=tinysrgb&w=2000"
            alt="Photography team at work background"
          />
          <div className="absolute inset-0 bg-black/65"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-purple-900/25 to-black/75"></div>
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-12 left-1/4 h-56 w-56 rounded-full bg-pink-500/15 blur-3xl"></div>
          <div className="absolute -bottom-12 right-1/4 h-56 w-56 rounded-full bg-purple-500/15 blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              Why Choose Nvs Click For Your Special Day Wedding Photography & Cinematography?
            </h2>
            <p className="text-xl text-gray-300">What sets us apart is our passion for storytelling.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Star, title: "Premium Quality", desc: "Professional-grade equipment and expert photographers" },
              { icon: Zap, title: "Fast Delivery", desc: "Quick turnaround on edited photos and videos" },
              { icon: Users, title: "Dedicated Team", desc: "Experienced professionals committed to your vision" },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                >
                  <Card
                    className="bg-white/5 border-white/10 backdrop-blur-md hover:border-pink-500/50 hover:bg-white/10 transition-all duration-300"
                  >
                    <CardContent className="p-8 text-center">
                      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-pink-500/20">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-semibold text-white mb-3">{item.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="mt-10 rounded-2xl border border-white/20 bg-black/30 backdrop-blur-sm p-6 sm:p-8 space-y-4 text-gray-200"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p className="leading-relaxed">
              What sets us apart from other wedding photographers in Hyderabad is our passion for storytelling. We believe every couple has a unique love story, and our job is to preserve it with authenticity, emotion, and artistic clarity.
            </p>
            <p className="leading-relaxed">
              From candid shots to elegant portraits, we focus on meaningful details, genuine expressions, and moments that become timeless memories. Our team brings creativity, calm execution, and professionalism to every celebration.
            </p>
            <p className="leading-relaxed">
              We also provide flexible photography and film packages tailored to your requirements and budget, with clear communication from consultation to final delivery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.pexels.com/photos/1963075/pexels-photo-1963075.jpeg?auto=compress&cs=tinysrgb&w=2000"
            alt="Bright wedding couple background"
          />
          <div className="absolute inset-0 bg-black/55"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-900/20 via-black/45 to-purple-900/30"></div>
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/15 px-6 py-14 sm:px-12 text-center backdrop-blur-sm"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <div className="absolute -top-16 left-0 h-40 w-40 rounded-full bg-pink-500/20 blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-16 right-0 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-bold mb-5">Ready to Capture Your Moments?</h2>
              <p className="text-lg sm:text-xl text-gray-200 mb-9 max-w-2xl mx-auto">
                Let's create something extraordinary together. Contact us today to discuss your event.
              </p>
              <div className="flex justify-center">
                <Button
                  type="button"
                  onClick={() => openBookingPopup("Get Started CTA")}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-10 py-6 text-lg rounded-full"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Signature Hero Block */}
      <section className="relative min-h-[68vh] overflow-hidden">
        <img
          src="https://static.wixstatic.com/media/926c18_2a0b2ca5ff2448b7868664a9870731cc~mv2.jpg/v1/fill/w_1905,h_1012,al_c,q_90,enc_avif,quality_auto/926c18_2a0b2ca5ff2448b7868664a9870731cc~mv2.jpg"
          alt="Wedding Photographers in Hyderabad"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/35 to-black/70" />
        <motion.div
          className="relative z-10 min-h-[68vh] flex flex-col items-center justify-center px-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-xl sm:text-3xl tracking-wide text-white/95 mb-4">
            The Art Of Remembering
          </p>
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-semibold tracking-wide text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.45)]">
            BEAUTIFULLY
          </h2>
        </motion.div>
      </section>

      {/* Intro Story Block */}
      <section className="py-20 bg-white text-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-4xl sm:text-5xl font-semibold leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Freeze Your Forever with the Best Wedding Photographers in Hyderabad
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
          >
            Your wedding is more than just a day it’s a mosaic of fleeting moments, quiet happiness, and emotions in motion. At Merrygohearts, we offer the best wedding photography in Hyderabad with a calm, storytelling approach. Whether it’s pre-wedding photography in Hyderabad or your big day, we capture the real, the raw, and the beautifully unplanned.
          </motion.p>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
          >
            <Link href="/about">
              <Button className="bg-black text-white hover:bg-black/90 px-8 py-5 rounded-full">
                ABOUT
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Timeline Stats */}
      <section className="py-16 bg-zinc-50 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h3
            className="text-center text-4xl sm:text-5xl font-semibold mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            TIMELINE
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {timelineStats.map((item, idx) => (
              <motion.div
                key={item.label}
                className="rounded-2xl border border-black/10 bg-white px-4 py-6 text-center shadow-sm"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.06, ease: "easeOut" }}
              >
                <p className="text-sm tracking-wide text-slate-600 uppercase mb-2">
                  {item.label}
                </p>
                <p className="text-3xl sm:text-4xl font-semibold italic">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-center text-5xl sm:text-6xl font-semibold mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            WHAT WE DO
          </motion.h2>

          <div className="space-y-10">
            {whatWeDoItems.map((item, idx) => (
              <motion.div
                key={item.title}
                className="grid md:grid-cols-2 gap-6 items-stretch"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: "easeOut" }}
              >
                <Card className="border-black/10 bg-white order-2 md:order-1">
                  <CardContent className="p-8 sm:p-10 text-center md:text-left">
                    <h3 className="text-2xl sm:text-3xl font-semibold tracking-wide mb-4">
                      {item.title}
                    </h3>
                    <p className="text-slate-700 leading-relaxed mb-6 text-base sm:text-lg">
                      {item.description}
                    </p>
                    <Link href={item.href}>
                      <Button className="bg-black text-white hover:bg-black/90 rounded-full px-7 py-5">
                        {item.cta}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <div className="order-1 md:order-2 rounded-2xl overflow-hidden min-h-[320px]">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Logos */}
      <section className="py-14 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h3
            className="text-center text-3xl sm:text-4xl font-semibold text-black mb-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            FEATURED
          </motion.h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
            {featuredLogos.map((logo, idx) => (
              <motion.div
                key={logo.src}
                className="flex items-center justify-center rounded-lg bg-white p-4 border border-black/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.05, ease: "easeOut" }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 w-full object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-center text-4xl sm:text-5xl font-semibold mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            OUR CLIENTS SAY
          </motion.h2>

          <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-6xl mx-auto px-12">
            <CarouselContent>
              {clientTestimonials.map((item) => (
                <CarouselItem key={item.name} className="basis-full">
                  <div className="grid md:grid-cols-2 gap-8 items-center rounded-2xl border border-black/10 bg-zinc-50 p-6 sm:p-8">
                    <div className="rounded-xl overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="h-[360px] w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-lg leading-relaxed text-slate-700 mb-6">“{item.quote}”</p>
                      <p className="text-xl font-semibold">{item.name}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 border-black/20 bg-white text-black hover:bg-zinc-100" />
            <CarouselNext className="right-2 border-black/20 bg-white text-black hover:bg-zinc-100" />
          </Carousel>

          <motion.p
            className="text-center text-xl text-slate-700 mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            We've been touched by the kind words shared by our clients!
          </motion.p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-zinc-50 text-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-center text-4xl sm:text-5xl font-semibold mb-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            className="text-center text-lg text-slate-600 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            If you have any other questions, contact us at nvsclickphotography7440@gmail.com.
          </motion.p>

          <Accordion type="single" collapsible className="w-full rounded-2xl border border-black/10 bg-white px-6">
            {faqItems.map((item, idx) => (
              <AccordionItem key={item.question} value={`faq-${idx}`} className="border-black/10">
                <AccordionTrigger className="text-base sm:text-lg text-black hover:no-underline py-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-700 text-base leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Get A Quote Section */}
      <section className="py-20 bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10">
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <h2 className="text-4xl sm:text-5xl font-semibold mb-3">GET A QUOTE</h2>
            <p className="text-lg text-slate-700 mb-6">
              Fill out the contact form below, and we’ll be in reply soon.
            </p>

            <p className="text-center text-lg font-semibold mb-3">For Faster response, Call Us on</p>
            <p className="text-center mb-8">
              <a
                href="tel:+916269941008"
                className="inline-block bg-[#c78665] hover:bg-[#b07354] text-white text-xl font-semibold px-6 py-3 rounded-sm"
              >
               6269941008
              </a>
            </p>

            <form
              className="space-y-5"
              action="https://formsubmit.co/nvsclickphotography7440@gmail.com"
              method="POST"
            >
              <input type="hidden" name="_subject" value="New Booking Enquiry - Get A Quote" />
              <input type="hidden" name="source" value="Get A Quote Section" />
              <input type="hidden" name="_captcha" value="false" />
              <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder="Your Name" name="name" required />
                <Input placeholder="Phone Number" type="tel" name="phone" required />
              </div>

              <Textarea
                name="description"
                placeholder="Description"
                className="min-h-32"
                required
              />

              <Button
                type="submit"
                className="bg-[#c78665] hover:bg-[#b07354] text-white px-8 py-6 rounded-none"
              >
                Lets Connect
              </Button>
            </form>
          </motion.div>

          <motion.div
            className="lg:col-span-4 space-y-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.06, ease: "easeOut" }}
          >
            {[
              "https://whataweddingstory.com/wp-content/uploads/2024/01/105-scaled-600x600.jpg",
              "https://whataweddingstory.com/wp-content/uploads/2023/08/70SSG05866-scaled-600x600.jpg",
              "https://whataweddingstory.com/wp-content/uploads/2023/08/15SAN_5683-scaled-600x600.jpg",
            ].map((src) => (
              <div key={src} className="overflow-hidden rounded-md border border-black/10 bg-zinc-50">
                <img src={src} alt="Wedding gallery preview" className="h-[260px] w-full object-cover" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <Dialog
        open={isBookingPopupOpen}
        onOpenChange={(open) => {
          setIsBookingPopupOpen(open);
          if (!open) {
            resetBookingForm();
          }
        }}
      >
        <DialogContent className="sm:max-w-lg bg-white text-black border-black/10">
          <DialogTitle className="text-2xl font-semibold">Book A Consultation</DialogTitle>
          <p className="text-sm text-slate-600">
            Share your details and your enquiry will be sent by email.
          </p>

          <form
            className="mt-4 space-y-4"
            action="https://formsubmit.co/nvsclickphotography7440@gmail.com"
            method="POST"
          >
            <input type="hidden" name="_subject" value={`New Booking Enquiry - ${bookingSource}`} />
            <input type="hidden" name="source" value={bookingSource} />
            <input type="hidden" name="_captcha" value="false" />
            <Input
              name="name"
              value={bookingForm.name}
              onChange={handleBookingPopupChange}
              placeholder="Your Name"
              required
            />
            <Input
              name="phone"
              type="tel"
              value={bookingForm.phone}
              onChange={handleBookingPopupChange}
              placeholder="Phone Number"
              required
            />
            <Textarea
              name="description"
              value={bookingForm.description}
              onChange={handleBookingPopupChange}
              placeholder="Description"
              className="min-h-32"
              required
            />
            <Button
              type="submit"
              className="w-full bg-[#c78665] hover:bg-[#b07354] text-white"
            >
              Send Enquiry
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(selectedGalleryImage)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedGalleryImage(null);
          }
        }}
      >
        <DialogContent
          className="max-w-[calc(100%-1rem)] sm:max-w-5xl bg-black/95 border-white/20 p-2"
          showCloseButton
        >
          <DialogTitle className="sr-only">
            {selectedGalleryImage?.alt ?? "Portfolio image preview"}
          </DialogTitle>
          {selectedGalleryImage ? (
            <img
              src={selectedGalleryImage.src}
              alt={selectedGalleryImage.alt}
              className="max-h-[85vh] w-full rounded-md object-contain"
            />
          ) : null}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-zinc-950 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
            <div>
              <h3 className="font-bold text-lg mb-4">Nvs Click</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                We capture your wedding’s genuine emotion and timeless beauty as creative storytellers, crafting cinematic heirlooms treasured for generations.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/new_vidyasagar_click7440/"
                  target="_blank"
                  rel="noreferrer"
                  className="h-8 w-8 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/10"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://www.facebook.com/share/17fke6JmTP/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noreferrer"
                  className="h-8 w-8 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/10"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="https://www.youtube.com/@newVidyaSagarclick"
                  target="_blank"
                  rel="noreferrer"
                  className="h-8 w-8 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/10"
                  aria-label="Youtube"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/"><a className="hover:text-pink-400">Home</a></Link></li>
                <li><Link href="/portfolio"><a className="hover:text-pink-400">Photography</a></Link></li>
                <li>
                  <button
                    type="button"
                    onClick={() => openBookingPopup("Contact Us - Footer")}
                    className="hover:text-pink-400"
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Office Locations</h4>
              <a
                href="https://maps.app.goo.gl/Z2WtshgiDtT7ff9L7"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 text-sm leading-relaxed hover:text-pink-400"
              >
                1st Floor, Gopal Nagar society, HITEC City, Hyderabad, Telangana - 500081
              </a>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="tel:+916269941008" className="hover:text-pink-400">Ronak Jain - 6269941008</a></li>
                <li><a href="tel:+917440863852" className="hover:text-pink-400">Soubhagya Jain - 7440863852</a></li>
                <li><a href="tel:+919806701954" className="hover:text-pink-400">Aman Jain - 9806701954</a></li>
              </ul>
            </div>

            <div className="md:col-span-2 lg:col-span-1">
              <h4 className="font-semibold mb-4">Get Started</h4>
              <Button
                type="button"
                onClick={() => openBookingPopup("Get a Quote - Footer")}
                className="bg-[#c78665] hover:bg-[#b07354] text-white rounded-none px-6 py-5 w-full"
              >
                Get a Quote
              </Button>
            </div>
          </div>
  <img alt="./logo.jpeg" src="./logo_processed.jpg"/>
          <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
            <p>Made With Love by © 2025 NVS CLick</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
