import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminJobsTable = () => {
    const navigate = useNavigate();
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    // const { allAdminJobs } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs || []);

    useEffect(() => {

        if (!allAdminJobs) {
            setFilterJobs([]);
            return;
        }

        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText)  return true;
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });

        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);


    return (
        <div>
            <Table>
                <TableCaption>A List of your recent posted jobs.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <TableRow key={job._id}>

                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className='text-right cursor-pointer'>
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className='w-32 p-2 bg-white border shadow-md' align='end' side='bottom'>
                                            <div
                                                onClick={() => navigate(`/admin/jobs/${job._id}`)}
                                                className='flex items-center gap-2 w-full cursor-pointer hover:bg-gray-100 p-2 rounded-sm'
                                            >
                                                <Edit2 className='w-4 h-4' />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>

                        )
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable