import React from "react";
import { StaticImage } from "gatsby-plugin-image";

const StudyTimeItem = ({ index, studyTime }) => {
  return (
    <tr className="h-16">
      <td className="border-r">
        {index < 3 ? (
          index < 2 ? (
            index < 1 ? (
              <StaticImage
                className="w-10"
                alt="ranking 1st"
                src="../images/medal-1st.png"
              />
            ) : (
              <StaticImage
                className="w-10"
                alt="ranking 2nd"
                src="../images/medal-2nd.png"
              />
            )
          ) : (
            <StaticImage
              className="w-10"
              alt="ranking 1st"
              src="../images/medal-3rd.png"
            />
          )
        ) : (
          <div className="pl-4">{index + 1}</div>
        )}
      </td>
      <td className="border-r">{studyTime.studentName}</td>
      <td className="border-r">{studyTime.videoTimeSum}</td>
      <td className="border-r">{studyTime.youtubeWatchCountSum}</td>
      <td className="border-r">{studyTime.baekjoonTimeSum}</td>
      <td>{studyTime.blogUploadCountSum}</td>
    </tr>
  );
};

export default StudyTimeItem;
