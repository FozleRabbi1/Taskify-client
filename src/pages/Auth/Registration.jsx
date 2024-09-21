import { useForm } from 'react-hook-form';
import { useState } from 'react';
import authApi from '../../redux/fetures/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { Select } from 'antd';

const VITE_image_upload_key = import.meta.env.VITE_image_upload_key
const Register = () => {
    const navigate = useNavigate()

    const roleOptions = ["user", "client"].map((item) => ({
        value: item,
        label: item,
    }));

    const [role , setRole] = useState("")

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [registerUser] = authApi.useRegisterUserMutation()
    const [customLoading, setCustomLoading] = useState(false)
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${VITE_image_upload_key}`;  

    const onSubmit = async (data) => {
        setCustomLoading(true);
        try {
            const formData = new FormData();
            formData.append("image", data.image[0]);
            const response = await fetch(image_hosting_url, {
                method: "POST",
                body: formData,
            });
            const imageData = await response.json();
            if (imageData.success) {
                const photoUrl = imageData.data.display_url;
                const { user, ...rest } = data;
                const newData = {
                    ...rest,
                    ...user,
                    role,
                    image: photoUrl,
                };
                const res = await registerUser(newData);                
                if (res) {
                    reset(); 
                    navigate("/login");
                }
            } else {
                console.error("Image upload failed");
            }
        } catch (error) {
            console.error("Error occurred:", error);
        } finally {
            setCustomLoading(false); 
        }
    };


    return (
        <div className='py-20'>
            <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-5 text-center">Register</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            className={`mt-1 block w-full px-3 py-2 border ${errors.user?.name?.firstName ? 'border-red-500' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                            {...register('user.name.firstName', {
                                required: 'First name is required',
                            })}
                        />
                        {errors.user?.name?.firstName && (
                            <p className="text-red-500 text-sm mt-1">{errors.user.name.firstName.message}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            className={`mt-1 block w-full px-3 py-2 border ${errors.user?.name?.lastName ? 'border-red-500' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                            {...register('user.name.lastName', {
                                required: 'Last name is required',
                            })}
                        />
                        {errors.user?.name?.lastName && (
                            <p className="text-red-500 text-sm mt-1">{errors.user.name.lastName.message}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className={`mt-1 block w-full px-3 py-2 border ${errors.user?.email ? 'border-red-500' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                            {...register('user.email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Invalid email address',
                                },
                            })}
                        />
                        {errors.user?.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.user.email.message}</p>
                        )}
                    </div>

                    <Select
                        placeholder="Select Role"
                        style={{ width: '100%' , height : "40px" }}
                        options={roleOptions}
                        onChange={(value) => setRole( value)}
                    />

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Set JPG / PNG / JPEG Photo </label>
                        <input type="file"  {...register("image", { required: true })} className="my-2 border-none rounded-md w-8/12 md:w-8/12 lg:w-6/12 max-w-xs text-black mx-2" />
                        {errors.exampleRequired && <span>This field is required</span>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className={`mt-1 block w-full px-3 py-2 border ${errors.user?.password ? 'border-red-500' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                            {...register('user.password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters long',
                                },
                                pattern: {
                                    message: 'Password must include upper, lower, number, and special character',
                                },
                            })}
                        />
                        {errors.user?.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.user.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {
                            customLoading ? <span className="loading loading-spinner loading-sm"></span> : "Register"
                        }


                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
