import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";




const JobDescription = () => {
  const params = useParams();  //used to get the id
  const jobId = params.id;
  const {singleJob} = useSelector(store => store.job);
  const {user} = useSelector(store=>store.auth);
  const dispatch = useDispatch();
  // useGetSingleJob(jobId);  //custom hook to get single job
  const isInitiallyApplied = singleJob?.application?.some(application=>application.applicant === user?._id) || false;
  //.some -> used if any thing is true then it returns true
  const [isApplied,setIsApplied] = useState(isInitiallyApplied);


  const applyJobHandler = async() => {

    if (isApplied) return;
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
      console.log(res.data);
      
      if(res.data.success)
      {
        setIsApplied(true); //update the local state
        const updatedSingleJob = {...singleJob, application:[...singleJob.application,{applicant:user?._id}]}
        dispatch(setSingleJob(updatedSingleJob)); //help us to real time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      
    }
  }

  useEffect(() => {
    const fetchSingleJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {withCredentials:true});
        if(res.data.success){
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.application.some(application => application.applicant === user?._id)) //ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.log(error);
       }
    };

    fetchSingleJobs();
  },[jobId,dispatch,user?._id]);


  return (
    <div className="max-w-7xl mx-auto my-10 px-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-3">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="text-[#F83002]" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-[#7209b7]" variant="ghost">
              {singleJob?.salary}LPA
            </Badge>
          </div>
        </div>

        <Button
          onClick = {isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          } text-white`}
        >
          {isApplied ? "Already applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Job Description</h1>
      <div className="my-4">
          <h1 className="font-bold my-0.5">Role: <span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span></h1>
          <h1 className="font-bold my-0.5">Location: <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span></h1>
          <h1 className="font-bold my-0.5">Description: <span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span></h1>
          <h1 className="font-bold my-0.5">Experience: <span className="pl-4 font-normal text-gray-800">{singleJob?.experience} yrs</span></h1>
          <h1 className="font-bold my-0.5">Salary: <span className="pl-4 font-normal text-gray-800">{singleJob?.salary}LPA</span></h1>
          <h1 className="font-bold my-0.5">Total: <span className="pl-4 font-normal text-gray-800">{singleJob?.application?.length}</span></h1>
          <h1 className="font-bold my-0.5">Posted Date: <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split("T")[0]}</span></h1>
      </div>
    </div>
  );
};

export default JobDescription;
