import React, { use, useEffect, useState } from 'react'
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { setSearchCompanyByText } from '@/redux/companySlice';
import { setSearchJobByText } from '@/redux/jobSlice';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';

const AdminJobs = () => {
    // useGetAllCompanies();
    useGetAllAdminJobs();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input]);


    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>

                    <Input
                        className="w-fit"
                        placeholder="Filter by name, role"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate("/admin/jobs/create")} className='bg-black text-white'>New Jobs</Button>
                </div>

                <AdminJobsTable />
            </div>
        </div>
    )
}

export default AdminJobs;