import React, { use, useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {

    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });

    const [loading, setLoading] = useState(false);

    const { singleCompany } = useSelector(store => store.company);


    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files[0];
        setInput({ ...input, file });
        // if (file) {
        //     setInput({ ...input, file: file });
        // } else {
        //     setInput({ ...input, file: null });
        // }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {

            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    // "Content-Type": "application/json",
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate(`/admin/companies`);
            }
        }

        catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "Something went wrong");
        } finally {
            setLoading(false);
        }


        /*
        // Here you would typically send the input data to your backend API
        // For example, using axios to post the data
    
        console.log("Submitting company setup with data:", input);
    
        // Reset the form after submission
        // setInput({
        //     name: "",
        //     description: "",
        //     website: "",
        //     location: "",
        //     file: null
        // });
        // Optionally, navigate to another page or show a success message
        */
    }


    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website:singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    },[singleCompany])
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto my-10'>

                <form onSubmit={submitHandler} className='bg-white shadow-md rounded-lg p-8'>

                    <div className='flex items-center gap-5 p-8'>

                        <Button onClick={() => navigate("/admin/companies")} variant='outline' className='flex items-center gap-2 text-gray-500 font-semibold hover:bg-gray-100'>
                            <ArrowLeft />
                            <span className='ml-2 text-black'>Back</span>
                        </Button>

                        <h1 className='font-bold text-xl'>Company Setup</h1>
                    </div>

                    <div className='grid grid-cols-2 gap-5 p-8'>
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>
                    {loading ? (
                        <Button className="w-full my-4">
                            {" "}
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="w-full my-4 text-white bg-black cursor-pointer"
                        >
                            Update
                        </Button>
                    )}
                </form>
            </div>
        </div>
    )
}

export default CompanySetup