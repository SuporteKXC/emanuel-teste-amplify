import  { ImgHTMLAttributes, InputHTMLAttributes, ReactNode, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Camera, User } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Loading } from '../shared/Forms/Input/styles';

import useAvatarImage from '@/queries/Users/useUserAvatar';



type UserAvatarProps =  ImgHTMLAttributes<HTMLImageElement> & {
    children?: ReactNode
    className?: string
    imageKey?: string
}

const UserAvatar = ({className, imageKey, children, ...props }: UserAvatarProps) => {

    const { data, isLoading } = useAvatarImage(imageKey)

    return (
        <div className='w-max flex flex-col items-center gap-2'>
            <Avatar className={cn('w-36 h-36', className)}>
                <AvatarImage className='object-cover' src={data} {...props}/>
                <AvatarFallback>
                    { isLoading && <Loading/> }
                    { !isLoading &&   <User size={150} /> }
                </AvatarFallback>
            </Avatar>
            {children}
        </div>
    
    )
}

type UserAvatarInputProps = InputHTMLAttributes<HTMLInputElement> & {
    isLoading?: boolean
    label?: string
}


UserAvatar.Input = ({ isLoading = false, label, ...props}: UserAvatarInputProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null)

    const inputTrigger = () => {
        if(inputRef.current) {
            inputRef.current.click()
        }
    }

    return (  
       <div className='input-wrapper'>
            <Button onClick={inputTrigger} type='button' size='sm' className='flex gap-2 items-center justify-center' disabled={isLoading}>
               { isLoading && <Loading /> }
               {
                !isLoading && (
                    <>
                        <Camera size={18} />
                        {label}
                    </>
                )
               }
              
            </Button>
            <input ref={inputRef} type="file" hidden {...props} />
       </div>
    )

}


export default UserAvatar;