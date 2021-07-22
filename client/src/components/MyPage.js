import { useState, useEffect } from "react";
import { debounce } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import PageLogo from "./common/PageLogo";
import ActivityRecord from "./ActivityRecord";
import BackButton from "./common/BackButton";
import MypageImage from "../image/MypageImage.png";
import MyRecordList from "./MyRecordList";

const useStyles = makeStyles((theme) => ({
  mypageRoot: {
    width: "100%",
    height: "100%",
    background: `url(${MypageImage}) center center / cover no-repeat`,
    backgroundAttachment: "fixed",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  mypagePaper: {
    width: "500px",
    height: "725px",
    border: "3px solid",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    "@media (max-width:610px)": {
      width: "440px",
    },
    "@media (max-width:500px)": {
      width: "350px",
    },
  },
  mypageContent: (isMypage) => ({
    height: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: `${isMypage ? "space-around" : "flex-start"}`,
    alignItems: "center",
    overflowY: `${!isMypage && "scroll"}`,
  }),
}));

const MyPage = ({ userObj, handleMypage }) => {
  const [isMypage, setIsMypage] = useState(true);
  const classes = useStyles(isMypage);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleMyQuestion = () => setIsMypage(!isMypage);

  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowWidth(window.innerWidth);
    }, 100);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <div className={classes.mypageRoot}>
      <Paper elevation={3} className={classes.mypagePaper}>
        <div style={{ width: "100%" }}>
          <BackButton
            type="mypage"
            action={isMypage ? handleMypage : handleMyQuestion}
          />
        </div>
        <div className={classes.mypageContent}>
          {isMypage ? (
            <>
              <div style={{ fontSize: "1.6em" }}>
                <p>학과 : IT대학 - 컴퓨터학부</p>
                <p>이메일 : {userObj.email}</p>
              </div>
              <ActivityRecord handleMyQuestion={handleMyQuestion} />
            </>
          ) : (
            <MyRecordList userObj={userObj} />
          )}
        </div>
      </Paper>
      <PageLogo logoName="MYPAGE" windowWidth={windowWidth} />
    </div>
  );
};

export default MyPage;
