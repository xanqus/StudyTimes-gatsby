import axios from "axios";
import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import StudyTimeItem from "../components/StudyTimeItem";

const IndexPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studyTimes, setStudyTimes] = useState([]);
  const [studyItem, setStudyItem] = useState("videoTimeSum");
  const [lectureID, setLectureID] = useState("20220512A");
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: `https://studytime-backend.hyper-x.kr/studytime/sort?studyItem=${studyItem}&lectureID=${lectureID}`,
          method: "GET",
        });
        setStudyTimes(data.data);
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
      <table className="table w-full">
        <thead>
          <tr>
            <th className="w-1/6 border-r">등수</th>
            <th className="w-1/6 border-r">이름</th>
            <th className="w-1/6 border-r">
              <div className="w-full flex justify-between">
                <div className="">영상시간</div>
                <div className="">
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
                <div className="">유튜브 시청 수</div>
                <div className="">
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
                <div className="">백준 공부 시간</div>
                <div className="">
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
                <div className="">블로그 글 업로드 수</div>
                <div className="">
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
