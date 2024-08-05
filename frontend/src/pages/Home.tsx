import Navbar from "../components/NavBar";
import SlideShowBanner from "../components/SlideShowBanner";
import Footer from "../components/Footer";
import SlideShowProducts from "../components/SlideShowProducts";

const imagesSlideShow = [
  "https://kccshop.vn/media/banner/13_Jul10cbd5f5fb5c340b7aaf9b6618429bd7.png",
  "https://hoanglongcomputer.vn/media/news/102-geforce-rtx-20211210-1.jpg",
  "https://vn.store.asus.com/media/wysiwyg/roglaptop/laptop-gaming-asus-2023-header-desktop.png",
];

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <SlideShowBanner ListImage={imagesSlideShow} />
      <h2 className="my-10 text-3xl text-center">Sản phẩm VGA</h2>
      <SlideShowProducts product_type={"VGA"} />
      <h2 className="my-10 text-3xl text-center">Sản phẩm CPU</h2>
      <SlideShowProducts product_type={"CPU"} />
      <h2 className="my-10 text-3xl text-center">Sản phẩm Màn hình</h2>
      <SlideShowProducts product_type={"MONITOR"} />
      <h2 className="my-10 text-3xl text-center">Sản phẩm Nguồn máy tính</h2>
      <SlideShowProducts product_type={"PSU"} />
      <h2 className="my-10 text-3xl text-center">Sản phẩm RAM</h2>
      <SlideShowProducts product_type={"RAM"} />
      <h2 className="my-10 text-3xl text-center">Sản phẩm Lưu trữ</h2>
      <SlideShowProducts product_type={"STORAGE"} />
      <Footer />
    </div>
  );
}
