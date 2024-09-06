import React from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'

export default function Footer() {
    return (
        <footer>
            <div className='flex flex-col items-center justify-center py-10 bg-white'>
                <Avatar className='h-12 w-12 sm:h-10 sm:w-10 md:h-12 md:w-12'>
                    <AvatarImage src="./logo.png" alt="@shadcn" />
                </Avatar>
                <p>Powered by <a href='https://www.facebook.com/profile.php?id=61562632562122' className='text-primary font-bold'>SabaiOps</a></p>
            </div>
        </footer>
    )
}
