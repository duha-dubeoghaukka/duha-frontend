import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import { Grid, Box } from "@material-ui/core";

function MainCategoryCard({ item }) {
  const { title, route, description, background } = item;

  return (
    <Grid item xs={5} sm={5}>
      <Link to={route} className="relative">
        <Box className={`${background}`} p={"60px"}>
          <div className="absolute w-full h-full top-0 left-0 w-full h-full bg-[#757575] opacity-70 rounded-lg"></div>
          <div className="absolute w-full h-full top-0 left-0 flex flex-col justify-start mt-8 ml-4">
            <p className="text-[15px] w-full font-bold text-white1 md:text-[18px]">{title}</p>
            <p className="mt-1 w-full text-[10px] text-white1 md:text-[12px]">
              {description}
              <br></br>확인해보세요
            </p>
          </div>
        </Box>
      </Link>
    </Grid>
  );
}

export default MainCategoryCard;
