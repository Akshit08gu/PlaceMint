import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";


// const randomJobs=[1,2,3,4,5,6,7,8];
const LatestJobs = () => {

  const {allJobs} = useSelector(store=>store.job);
  // const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto my-20 px-16">
      <h1 className="text-4xl font-bold ">
        <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
      </h1>
      {/* //multiple job cards display over here */}
      <div className="grid grid-cols-3 gap-4 my-5">
      {
        // randomJobs.slice(0,6).map((item,index) => <LatestJobCards/>)
        allJobs.length <= 0 ? <span> No Job avialable</span> : allJobs?.slice(0,6).map((job) => <LatestJobCards  key={job._id} job={job}/>)
      }
      </div>
    </div>
  );
};

export default LatestJobs;
