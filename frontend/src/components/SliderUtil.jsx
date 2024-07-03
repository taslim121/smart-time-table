import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TableCard from "../pages/Tables/TableCard";

const SliderUtil = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
  };

  return (
    <Slider {...settings}>
      {data?.map((table) => (
        <TableCard key={table._id} table={table} />
      ))}
    </Slider>
  );
};

export default SliderUtil;