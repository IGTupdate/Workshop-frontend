// "use client"
// import { sendOTP } from '@/app/services/operations/auth/customerAuth';
// import { useAppDispatch, useAppSelector } from '@/app/store/reduxHooks';
// import { setAuthLoading, setAuthStep } from '@/app/store/slices/authSlice';
// import React from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';

// type Inputs = {
//     otp: number;
// }

// const VerifyOTP: React.FC = () => {
//     const loading = useAppSelector((state) => state.auth.authLoading)
//     const dispatch = useAppDispatch()
//     const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

//     const onSubmit: SubmitHandler<Inputs> = async (data) => {
//         if (!data) return;
//         dispatch(setAuthLoading(true))
//         try {
//             const result = await sendOTP(data.otp);
//             if(result?.data.success) dispatch(setAuthStep(1));
//         } catch (error) {
//             console.error("Error sending OTP:", error);
//         }
//         dispatch(setAuthLoading(false))
//     };

//     return (
//         <div className="flex justify-center items-center h-screen">
//             {
//                 loading ? (
//                     <div>Loading</div>
//                 ) : (
//                     <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 flex-col">
//                         <input
//                             type="number"
//                             {...register("contactNumber", {
//                                 pattern: {
//                                     value: /^[0-9]{10}$/,
//                                     message: "Please enter a valid phone number in the format xxx-xxx-xxxx"
//                                 },
//                                 minLength: {
//                                     value: 10,
//                                     message: "Please enter exactly 10 digits"
//                                 },
//                                 maxLength: {
//                                     value: 10,
//                                     message: "Please enter exactly 10 digits"
//                                 }
//                             })}
//                             placeholder="Enter Your Contact Number"
//                             className="border-2 px-4 py-2 border-black"
//                         />
//                         {errors.contactNumber && <span>{errors.contactNumber.message}</span>}
//                         <button type="submit">Send OTP</button>
//                     </form>
//                 )
//             }
//         </div>
//     );
// }

// export default SendOTP;
