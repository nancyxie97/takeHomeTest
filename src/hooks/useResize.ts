import { useEffect, useState } from 'react'
import { throttle } from "lodash"

const useResize = (): { width: number, height: number } => {

    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = throttle(() => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }, 200);

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, []);
    return size
}

export default useResize