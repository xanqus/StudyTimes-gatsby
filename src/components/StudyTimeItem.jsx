import React from "react";

const StudyTimeItem = ({ index, studyTime }) => {
  return (
    <tr>
      <td className="border-r">{index + 1}</td>
      <td className="border-r">{studyTime.studentName}</td>
      <td className="border-r">{studyTime.videoTimeSum}</td>
      <td className="border-r">{studyTime.youtubeWatchCountSum}</td>
      <td className="border-r">{studyTime.baekjoonTimeSum}</td>
      <td>{studyTime.blogUploadCountSum}</td>
    </tr>
  );
};

export default StudyTimeItem;
