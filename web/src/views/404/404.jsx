import React from "react";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../utils/colors";
import logoLarge from "../../assets/logo-large.svg";
import Image from "../../components/Image";
import FancyButton from "../../components/FancyButton";
import "./statics/css/404.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        className="notFound_root"
        wrap="nowrap"
      >
        <Grid item className="notFound_logo">
          <Link to="/login">
            <Image
              src={logoLarge}
              alt="Sikshyalaya"
              addStyles="notFound_image"
            />
          </Link>
        </Grid>
        <Grid item className="notfound_panelContainer">
          <Grid
            container
            className="notfound_404Container"
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={3}
          >
            <Grid item className="notFound_404Message">
              <p className="notFound_404giant404">404</p>
              <p className="notFound_pageNotFound">Page Not found</p>

              <p className="notFound_hmm">
                Hmm... Seems like you're lost in a perpetual black hole. Please
                find your way to the nearest library.
              </p>
            </Grid>
            <Grid item classname="notfound_goHome">
              <Grid
                container
                direction="row"
                alignItems="flex-start"
                justifyContent="center"
                spacing={2}
              >
                <Grid item classname="notfound_textContainer">
                  <p classname="notfound_returnText>">Return to Dashboard</p>
                </Grid>
                <Grid item classname="notFound_returnHome">
                  <Link to="/landing">
                    <FancyButton
                      color={colorscheme.purple3}
                      className="notfound_fancyButton"
                    />
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default NotFound;
