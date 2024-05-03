'use client';
import { useEffect } from 'react';
import { useAppDispatch } from '@/app/store/reduxHooks';
import { setEmployeeSmallDevice } from '@/app/store/slices/deviceSlice';

const useDeviceType = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const updateDeviceType = () => {
      dispatch(setEmployeeSmallDevice(window.innerWidth < 1024 ? true : false));
    };

    // Update device type on mount and window resize
    updateDeviceType();
    window.addEventListener('resize', updateDeviceType);

    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', updateDeviceType);
    };
  }, []);
};

export default useDeviceType;
