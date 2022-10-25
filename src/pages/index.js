import axios from "axios";
import { StaticImage } from "gatsby-plugin-image";
import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import StudyTimeItem from "../components/StudyTimeItem";

const IndexPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studyTimes, setStudyTimes] = useState([]);
  const [usersNotUploadStudyTime, setUsersNotUploadStudyTime] = useState([]);
  const [studyItem, setStudyItem] = useState("videoTimeSum");
  const [lectureID, setLectureID] = useState("20220512A");

  useEffect(() => {
    const getData = async () => {
      try {
        const studyTimeData = await axios({
          url: `https://api.studytime-backend.hyper-x.kr/studytime/sort?studyItem=${studyItem}&lectureID=${lectureID}`,
          method: "GET",
        });
        setStudyTimes(studyTimeData.data);
        setLoading(false);
      } catch (e) {
        setError(e);
      }
    };
    getData();
  }, [lectureID, studyItem]);
  useEffect(() => {
    var today = new Date();
    var year = today.getFullYear();
    var month = ("0" + (today.getMonth() + 1)).slice(-2);
    var day = ("0" + today.getDate()).slice(-2);
    var dateString = year + "-" + month + "-" + day;

    const getData = async () => {
      try {
        const notUploadUserData = await axios({
          url: `https://api.studytime-backend.hyper-x.kr/user/not-submit?lectureID=${lectureID}&date=${dateString}`,
          method: "GET",
        });

        setUsersNotUploadStudyTime(notUploadUserData.data);
        setLoading(false);
      } catch (e) {
        setError(e);
      }
    };
    getData();
  }, [lectureID, studyItem]);

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <Layout pageTitle="Home Page">
      <div className="flex w-full component-preview p-4 items-center justify-end gap-2">
        <select
          onChange={(e) => {
            setLectureID(e.target.value);
          }}
          className="select select-info w-full max-w-xs"
        >
          <option value={"20220512A"}>2022-05-12 A반</option>
          <option value={"20220712I"}>2022-07-12 I반</option>
        </select>
      </div>
      <div className="flex justify-end">업로드 현황</div>
      <div className="flex justify-end">
        <progress
          className="progress progress-info w-56"
          value={19 - usersNotUploadStudyTime.length}
          max="19"
        ></progress>
      </div>

      <div>업로드 안한 사람</div>
      <div className="flex w-full component-preview p-4 items-center justify-start gap-2">
        {usersNotUploadStudyTime.map((userNotUploadStudyTime, index) => {
          return (
            <div className="truncate" key={index}>
              {userNotUploadStudyTime.studentName}
            </div>
          );
        })}
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th className="w-1/6 border-r pl-6">등수</th>
            <th className="w-1/6 border-r">이름</th>
            <th className="w-1/6 border-r">
              <div className="w-full flex justify-between">
                <div className="flex items-center">영상시간</div>
                <div>
                  <button
                    onClick={() => {
                      setStudyItem("videoTimeSum");
                    }}
                    className="w-6 btn btn-outline btn-ghost btn-xs m-auto"
                  >
                    ↓
                  </button>
                </div>
              </div>
            </th>
            <th className="w-1/6 border-r">
              <div className="w-full flex justify-between">
                <div className="flex items-center">유튜브 시청 수</div>
                <div>
                  <button
                    onClick={() => {
                      setStudyItem("youtubeWatchCountSum");
                    }}
                    className="w-6 btn btn-outline btn-ghost btn-xs m-auto"
                  >
                    ↓
                  </button>
                </div>
              </div>
            </th>
            <th className="w-1/6 border-r">
              <div className="w-full flex justify-between">
                <div className="flex items-center">백준 공부 시간</div>
                <div>
                  <button
                    onClick={() => {
                      setStudyItem("baekjoonTimeSum");
                    }}
                    className="w-6 btn btn-outline btn-ghost btn-xs m-auto"
                  >
                    ↓
                  </button>
                </div>
              </div>
            </th>
            <th className="w-1/6">
              <div className="w-full flex justify-between">
                <div className="flex items-center">블로그 글 업로드 수</div>
                <div>
                  <button
                    onClick={() => {
                      setStudyItem("blogUploadCountSum");
                    }}
                    className="w-6 btn btn-outline btn-ghost btn-xs m-auto"
                  >
                    ↓
                  </button>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {studyTimes.map((studyTime, index) => {
            return (
              <StudyTimeItem studyTime={studyTime} key={index} index={index} />
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
};

export default IndexPage;
